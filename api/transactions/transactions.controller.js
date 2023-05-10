"use strict";

const knex = require("../../db/connection");

// exports.getOne = (ctx) => {
//   const { userId } = ctx.params;
//   const user = db.users.find((user) => user.id === userId);
//   ctx.assert(user, 404, "The requested user doesn't exist");
//   ctx.status = 200;
//   ctx.body = user;
// };

exports.getAll = async (ctx) => {
  const { walletId } = ctx.params;

  const wallet = await knex
    .select("*")
    .from({ w: "wallet" })
    .where("id", walletId)
    .first()
    .then((row) => row);

  ctx.assert(wallet, 404, "The requested wallet doesn't exist");

  const transactions = await knex
    .select({
      id: "t.id",
      walletId: "t.wallet_id",
      amount: "t.amount",
      balance: "t.balance",
      description: "t.description",
      createdDate: "t.created_date"
    })
    .from({ t: "transactions" })
    .where("wallet_id", walletId);

  ctx.status = 200;
  ctx.body = transactions;
};

exports.createOne = async (ctx) => {
  const { walletId } = ctx.params;
  const { amount, description } = ctx.request.body;

  ctx.assert(
    amount,
    400,
    "The wallet info is incorrect, please provide amount"
  );

  ctx.assert(
    description,
    400,
    "The wallet info is incorrect, please provide description"
  );

  const wallet = await knex
    .select({
      id: "w.id",
      name: "w.name",
      balance: "w.balance",
      createdDate: "w.created_date"
    })
    .from({ w: "wallet" })
    .where("id", walletId)
    .first()
    .then((row) => row);

  ctx.assert(
    wallet.balance > amount,
    422,
    "Insufficient Balance for transaction!"
  );

  const newTransaction = {
    wallet_id: walletId,
    amount,
    balance: wallet.balance - amount,
    description,
    created_date: new Date().toISOString()
  };

  await knex("wallet")
    .update({ balance: wallet.balance - amount })
    .where("id", walletId);

  const transaction = await knex("transactions")
    .insert(newTransaction)
    .returning("id")
    .then((d) => {
      return knex
        .select({
          id: "t.id",
          walletId: "t.wallet_id",
          amount: "t.amount",
          balance: "t.balance",
          description: "t.description",
          createdDate: "t.created_date"
        })
        .from({ t: "transactions" })
        .where("id", d[0]);
    });

  ctx.status = 201;
  ctx.body = transaction[0];
};
