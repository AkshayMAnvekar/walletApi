const knex = require("knex")(require("../config").databaseConfig);

module.exports = knex;
