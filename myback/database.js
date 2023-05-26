const {Pool} = require("pg");


const pool = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432
});
pool.query('DROP DATABASE IF EXISTS recordnoter_system');
pool.query("CREATE DATABASE recordnoter_system").then((response) => {
    console.log("Database created");
    console.log(response);
})
.catch((err) => {
    console.log("Ошибка при создании базы данных! ", err);
});


const createUsersQuery = `CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    username VARCHAR ( 50 ) UNIQUE NOT NULL,
    password VARCHAR ( 50 ) NOT NULL
)`;

pool.query(createUsersQuery).then((response) => {
    console.log("Users table created");
    console.log(response);
})
.catch((err) => {
    console.log("Ошибка при создании таблицы 1! ", err);
});


const createRecordsQuery = `CREATE TABLE IF NOT EXISTS records (
    user_id serial PRIMARY KEY,
    username VARCHAR NOT NULL,
    text VARCHAR NOT NULL,
    date TIMESTAMP NOT NULL
)`;

pool.query(createRecordsQuery).then((response) => {
    console.log("Records table created");
    console.log(response);
})
.catch((err) => {
    console.log("Ошибка при создании таблицы 2! ", err);
});

module.exports = pool;