import pool from "./db/db.js"

const result = await pool.query("select * from accounts;");
console.log(result.rows);

await pool.end();