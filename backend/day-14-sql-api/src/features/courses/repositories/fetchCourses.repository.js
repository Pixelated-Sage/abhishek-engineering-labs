import pool from "#db";


const fetchCourses = async () => {
    const result = await pool.query("Select * from courses");
    if(await result.rowCount === 0){
        throw new Error("Err_db1 database is having no data");
    }
    return result;
}

export default fetchCourses;