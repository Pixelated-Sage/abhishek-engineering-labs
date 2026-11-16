import viewProfileRepo from "../repository/viewprofile.repository.js";

const viewProfileService = async (sub) =>{
    const result = await viewProfileRepo(sub);
    return result;

}

export default viewProfileService;