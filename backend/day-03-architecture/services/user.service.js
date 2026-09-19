import data from "../db/db.js"

let dataIndex  = data.length

const getUser = () =>{
    return data
}


const postUser = (Name) =>{
    if (Name === "error") {
        throw new Error("Invalid name provided");
    }
    try{
        const newUser = {
        id: dataIndex++,
        name : Name
        };
        data.push(newUser);
        return({status:1,user:newUser});
    } catch(error) {
        throw new Error("Error while adding user: " + error.message);
    }

}
export default {getUser,postUser};