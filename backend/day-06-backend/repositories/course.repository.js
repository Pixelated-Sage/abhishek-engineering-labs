import pool from "../db/db.js";
import courses from "../db/localdb.js"

const getCourses = async () => {
    const result = await pool.query("SELECT * FROM courses;");
    // const result = courses
    return result;
}
const createCourse = async (Id, Name) => {
    const result = await pool.query('INSERT into courses(id,name) VALUES($1,$2);',[Id,Name])
    return result;
}



export default {getCourses,createCourse};