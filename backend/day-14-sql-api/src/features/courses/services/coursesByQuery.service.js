import fetchCoursesByQuery from "../repositories/fetchCoursesByQuery.repository.js";


const coursesByQuery = async (qr) => {
    const result = await fetchCoursesByQuery(qr);
    return result.rows;
}

export default coursesByQuery;