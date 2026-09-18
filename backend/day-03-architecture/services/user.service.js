import data from "../db/db.js"

let dataIndex  = data.length

const getUser = () =>{
    return data
}


const postUser = (Name) =>{
    try{
        const newUser = {
        id: dataIndex++,
        name : Name
        };
        data.push(newUser);
        return({status:1,user:newUser});
    } catch(error) {
        throw new Error("Unexpected Error")
    }

}
export default {getUser,postUser};