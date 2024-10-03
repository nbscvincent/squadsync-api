import mysql from "mysql2"
import dotenv from "dotenv"

const pool = mysql.createPool(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "squadsync",
        port: 3306,
        multipleStatements: true  
    } 
).promise();

pool.getConnection().then((conn) => {
    const res = conn.query("SELECT 1");
    conn.release();
    return res;
    }
).then((results) => {
    console.log("Connected to MySQL DB");
    } 
).catch((error) => {
    console.log(`Connection Error ${error}`);
    }
);

export default pool;
