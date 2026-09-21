import pool from "../db/db.js";



const getCourses = async () =>{
    const result = await pool.query("SELECT * FROM courses;");
    return result;
}


const postCourses = async (Id,Name) =>{
    if (Name === "error") {
        throw new Error("Invalid name provided");
    }

    const newUser = {
        id: Id,
        name : Name
    };
    const result = await pool.query('INSERT into courses(id,name) VALUES($1,$2);',[newUser.id,newUser.name])
    if (result.rowCount === 0) {
        throw new Error("User registration failed in service");
    }
    return({status:1,user:newUser});
}
export default {getCourses,postCourses};