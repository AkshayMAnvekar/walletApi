"use strict";

const knex = require("../../db/connection");

exports.getOne = async (ctx) => {
  const { walletId } = ctx.params;

  const wallet = await knex
    .select({
      id: "w.id",
      name: "w.name",
      balance: "w.balance",
      createdDate: "w.created_date"
    })
    .from({ w: "wallet" })
    .where("id", walletId)
    .first();
  // .then((row) => row);

  ctx.assert(wallet, 404, "The requested wallet doesn't exist");

  ctx.status = 200;
  ctx.body = wallet;
};

// exports.getAll = async (ctx) => {
//   ctx.status = 200;
//   ctx.body = db.users;
// };

exports.createOne = async (ctx) => {
  const { name, balance } = ctx.request.body;
  ctx.assert(name, 400, "The wallet info is incorrect, please provide name");
  ctx.assert(
    balance,
    400,
    "The wallet info is incorrect, please provide balance"
  );
  ctx.assert(balance >= 0, 400, "The wallet opening balance negative!");
  // ctx.assert(name === `Savings Pot`, 400, "The wallet info is incorrect, Name !");

  // const id = generateId();

  const newWallet = {
    name,
    balance,
    created_date: new Date().toISOString()
  };

  const wallet = await knex({ w: "wallet" })
    .insert(newWallet)
    .returning("id")
    .then((row) => {
      return knex
        .select({
          id: "w.id",
          name: "w.name",
          balance: "w.balance",
          createdDate: "w.created_date"
        })
        .from({ w: "wallet" })
        .where("id", row[0])
        .first();
    });
  ctx.status = 201;
  ctx.body = wallet;
};
