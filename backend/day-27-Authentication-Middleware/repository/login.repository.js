import pool from "../db/db.js";

const FetchPassword = async(email) =>{
    const result = await pool.query("Select * from auth where email = $1;",[email]);
    if(result.rowCount === 0){
        const error = new Error("Invalid email or password");
        error.status = 401;
        error.code = 'U01';
        throw error;
    }
    return result.rows[0];
}

export default FetchPassword;