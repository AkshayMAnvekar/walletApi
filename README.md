# Documentation

This is based out of the koa-boilerplate - https://github.com/tonyghiani/create-koa-application

Server instructions.

Create a `.env` file using the sample `.env.example` file.
The App uses postgres database. Please provide a valid postgres connection to run with the following tables.

This utilizes 2 tables: wallet and transactions

Wallet Table Definition

```SQL
CREATE TABLE "public"."wallet" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" varchar NOT NULL,
    "balance" float8 NOT NULL,
    "created_date" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);
```

Transactions Table Definition

```SQL
CREATE TABLE "public"."transactions" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "wallet_id" uuid NOT NULL,
    "amount" float8 NOT NULL,
    "balance" float8 NOT NULL,
    "description" varchar NOT NULL,
    "created_date" timestamptz NOT NULL,
    CONSTRAINT "fk_wallet_id" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallet"("id"),
    PRIMARY KEY ("id")
);
```

The Default port is `3000` and default api version is `v1`

The API Endpoints are as per the openapi.yaml and default server URL:

`http://localhost:3000/api/<apiVerion>/`

commands to run the application

```console
git clone https://github.com/AkshayMAnvekar/walletApi.git

cd walletApi

# install the required dependencies
npm i

# To start in development mode
npm run dev

# To start the server
num run start
```
