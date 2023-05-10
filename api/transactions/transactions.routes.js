"use strict";

const controller = require("./transactions.controller");

module.exports = (Router) => {
  const router = new Router({
    prefix: `/wallet`
  });

  router
    // .get("/:transactionId", controller.getOne)
    .get("/:walletId/transactions", controller.getAll)
    .post("/:walletId/transactions", controller.createOne);

  return router;
};
