import data from "../db/db.js"

let dataIndex  = data.length+1

const getUser = () =>{
    return data
}


const postUser = (Name) =>{
    if (Name === "error") {
        throw new Error("Invalid name provided");
    }
    const newUser = {
        id: dataIndex++,
        name : Name
    };
    data.push(newUser);
    return({status:1,user:newUser});
}
export default {getUser,postUser};