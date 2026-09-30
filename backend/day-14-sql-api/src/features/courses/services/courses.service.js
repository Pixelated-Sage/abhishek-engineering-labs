import fetchCourses from "../repositories/fetchCourses.repository.js";


const courses = async () => {
    const result = await fetchCourses();
    return result.rows;
}

export default courses;