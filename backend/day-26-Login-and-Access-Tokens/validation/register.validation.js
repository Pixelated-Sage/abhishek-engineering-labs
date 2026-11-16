import {z} from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


const registerValidation = z.object({
   username: z.string({
           required_error:"username is missing completely",
           invalid_type_error:"username must be a string value"
       }).trim().min(5,"username cannot be empty or just space"),
    password: z.string({
           required_error:"password is missing completely"
       }).trim().min(8,"Name cannot be empty or smaller than 8 characters").regex(passwordRegex, "Password much contain at lease one uppercase letter, one lowercase letter, one number, and one special character"),
       email: z.string({
           required_error:"email is missing completely",
           invalid_type_error:"email must be a string value"
        }).trim().email("Invalid email format"),
        
});    
export default registerValidation;