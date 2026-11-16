import registerValidation from "../validation/register.validation.js";

class RegisterController {
    constructor(registerService) {
        this.registerService = registerService;
    }
    register = async (req,res,next)=>{
        try{            
            const validation = await registerValidation.safeParse(req.body);
            if(!validation.success){
                const error = new Error("U01 Invalid request body");
                error.code = "U01";
                error.status = 400;
                throw error;
            }
            const result = await this.registerService.register(validation.data.username, validation.data.password, validation.data.email , validation.data.role);

            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: result
            });
        }catch(error){
            next(error);
        }
    }
}
export default RegisterController;