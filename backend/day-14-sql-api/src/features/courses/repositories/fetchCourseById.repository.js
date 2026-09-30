import pool from "#db";

const fetchCourseById = async (id) =>{
    const result = await pool.query("Select * from courses where id = $1", [id]);
    if(await result.rowCount === 0){
        throw new Error(`Err_dbId No course with id - ${id} `);
    }
    return result;
}

export default fetchCourseById;