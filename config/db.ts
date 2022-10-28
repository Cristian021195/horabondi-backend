import { createPool } from "mysql2/promise";

export const pool = createPool({
    /*host:'localhost',
    user:'root',
    password:'',
    port:3306,
    database:'horabondi'*/

    host:process.env.DB_PROD_HOST,
    user:process.env.DB_PROD_USERNAME,
    password:process.env.DB_PROD_PASSWORD,
    database:process.env.DB_PROD_DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
})