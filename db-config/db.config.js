const mysql = require('mysql2/promise');
require('dotenv').config();

const queryBuilder = async (sql, params) => {
    const connection = await mysql.createConnection({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE
    });
    const [results, ] = await connection.execute(sql, params)
    return results
}

module.exports = {
    queryBuilder
}