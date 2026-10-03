import pool from "#db"


const pageRepo = async (limit, offset) =>{
    const result = await pool.query("select id , name from courses order by id limit $1 offset $2",[limit,offset]);
    return result;
}

export default pageRepo;