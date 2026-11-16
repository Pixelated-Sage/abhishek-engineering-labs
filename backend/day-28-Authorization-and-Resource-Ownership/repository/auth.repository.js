class RegisterRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async register(id , username, password , email,role, pclient = null){
        const auth = pclient || this.pool;
        const result = await auth.query("insert into users(id,username,password_hash,email) values($1,$2,$3) returning username, email;",[username,password,email]);
        const result2 = await auth.query("insert into user_role() values($1,$2,$3) returning username, email;",[]);
        if(result.rows.length === 0){
            const error = new Error("U02 User registration failed");
            error.code = "U02";
            error.status = 400;
            throw error;
        }
        return result.rows;
    }
    async checkDuplicateEmail(email,pclient = null){
        const auth = pclient || this.pool;
        const result = await auth.query("Select * from users where email=$1",[email]);
        if(result.rows.length > 0){
            return true;
        }
        return false;
    }
}

export default RegisterRepository;