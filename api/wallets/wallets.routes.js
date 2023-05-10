"use strict";

const controller = require("./wallets.controller");

module.exports = (Router) => {
  const router = new Router({
    prefix: `/wallet`
  });

  router
    .get("/:walletId", controller.getOne)
    // .get("/", controller.getAll)
    .post("/", controller.createOne);

  return router;
};
