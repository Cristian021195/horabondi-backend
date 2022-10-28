"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = require("mysql2/promise");
exports.pool = (0, promise_1.createPool)({
    /*host:'localhost',
    user:'root',
    password:'',
    port:3306,
    database:'horabondi'*/
    host: process.env.DB_PROD_HOST,
    user: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
});
