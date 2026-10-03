import pageRepo from '../repositories/page.repository.js';


const pageService = async (page , limit) =>{
    const offset = (page -1) * limit;
    const result = await pageRepo(limit, offset);
    if(result.rowCount === 0){
        throw new Error("Err_NoPage No data found for the given page and limit");
    }
    return result.rows
}

export default pageService;