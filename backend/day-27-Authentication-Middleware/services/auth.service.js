import  argon2 from "argon2";


class RegisterService{
    constructor(pool,registerRepository){
        this.registerRepository = registerRepository;
        this.pool = pool;
    }
    async register (username, password , email , role){
        const pclient = await this.pool.connect();
        try{
            await pclient.query("BEGIN");
            const checkEmail = await this.registerRepository.checkDuplicateEmail(email,pclient);
            
            if(checkEmail){
                const error = new Error("U01 Email already exist");
                error.code = "U01";
                error.status = 409;
                throw error;
            }
            const hashedPassword = await argon2.hash(password,{
                type: argon2.argon2id,
                memoryCost:2**16,
                timeCost:3,
                parallelism:4
            });
            const result = await this.registerRepository.register(username,hashedPassword , email,role, pclient);
            await pclient.query("COMMIT;")

            return result;
        }catch(error){
            await pclient.query("ROLLBACK;")
            
            throw error;
        }finally{
            await pclient.release();
        }
    }
}

export default RegisterService;