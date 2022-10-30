import { createPool } from "mysql2/promise";

export const pool = createPool({
    /*host:process.env.DB_PROD_HOST,
    user:process.env.DB_PROD_USERNAME,
    password:process.env.DB_PROD_PASSWORD,
    database:process.env.DB_PROD_DATABASE,
    ssl: {
        rejectUnauthorized: false
    }*/
    /*host:'localhost',
    user:'root',
    password:'',
    database:'horabondi',*/
    host: process.env.DB_PROD_HOST,
    user: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_DATABASE
})

/*

DB_PROD_HOST=localhost
DB_PROD_USERNAME=root
DB_PROD_PASSWORD=
DB_PROD_PORT=3306
DB_PROD_DATABASE=horabondi
PORT=5000

*/