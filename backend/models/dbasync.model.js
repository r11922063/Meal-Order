import mysql from 'mysql2/promise.js';
import { db_config } from "../config/db.config.js";

console.log("Trying to connect to DB...");
const connection = await mysql.createConnection({
    host: db_config.HOST,
    user: db_config.USER,
    password: db_config.PASSWORD,
    database: db_config.DB
});
    
// Connecting to database
connection.connect(function (err) {
    if (err) {
        console.log("Error in the connection");
        console.log(err);
    }
    else {
        console.log(`Database Connected`);
    }
});

const query = async (sql, param) => {
    return await connection.query(sql, param);
}

export { query };