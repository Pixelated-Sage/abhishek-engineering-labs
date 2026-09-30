import fetchCourseById from "../repositories/fetchCourseById.repository.js";


const courseById = async (id) => {
    const result = await fetchCourseById(id);
    return result.rows[0];

}
export default courseById;