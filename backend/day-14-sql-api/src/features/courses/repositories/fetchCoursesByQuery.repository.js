import pool from "#db";


const fetchCoursesByQuery = async (qr) =>{
    const result = await pool.query(
        "select c.id, c.name from courses c join enrollments e on c.id = e.course_id group by c.id , c.name having count(e.student_id) > $1", [qr]
    )
    if(await result.rowCount === 0){
        throw new Error(`Err_dbQr No course with enrollments above ${qr}`);
    }
    return result;
}

export default fetchCoursesByQuery;