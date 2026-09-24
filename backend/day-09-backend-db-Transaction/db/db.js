import { Pool } from "pg";


const pool = new Pool({
    user:'abhishek',
    host:'localhost',
    database:'engineering_lab',
    port:5432,
});

export default pool;