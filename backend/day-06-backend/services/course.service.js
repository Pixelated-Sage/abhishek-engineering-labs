import repository from "../repositories/course.repository.js";



const getCourses = async () =>{
    const result = await repository.getCourses()
    return result.rows;
}


const postCourses = async (Id,Name) =>{
    if (Name === "error") {
        throw new Error("Invalid name provided");
    }

    const newUser = {
        id: Id,
        name : Name
    };
    const result = await repository.createCourse(Id,Name)
    if (result.rowCount === 0) {
        throw new Error("Course Creation failed in service");
    }
    return({status:1,user:newUser});
}
export default {getCourses,postCourses};