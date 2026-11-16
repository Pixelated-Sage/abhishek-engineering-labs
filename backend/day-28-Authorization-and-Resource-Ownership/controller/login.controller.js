import LoginService from '../services/login.service.js'
import {z} from 'zod';


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const loginSchema = z.object({
    email: z.string({
        required_error: "email is missing completely",
        invalid_type_error: "email must be a string value"
    }).trim().email("Invalid email format"),
    password: z.string({
        required_error: "password is missing completely"
    }).trim().min(8, "Name cannot be empty or smaller than 8 characters").regex(passwordRegex, "Password much contain at lease one uppercase letter, one lowercase letter, one number, and one special character"),
    role: z
  .enum(["user", "admin"], {
    invalid_type_error: "Role must be a string",
    message: "Role must be either 'user' or 'admin'",
  })
  .optional()
  .default("user"),

});

const LoginController = async (req, res, next) => {
    try {
        const validation = await loginSchema.safeParse(req.body);
        console.log(validation);
        if(!validation.success){
            const error = new Error("L02 Invalid request body");
            error.code = "L02";
            error.status = 400;
            throw error;
        }
        const { email, password , role } = validation.data;
        const result = await LoginService(email, password , role);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
export default LoginController;