import argon2 from 'argon2';
import FetchPassword from '../repository/login.repository.js';
import * as jose from 'jose';
import dotenv from 'dotenv';

dotenv.config();
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const LoginService = async(email,password , role) =>{
    const result = await FetchPassword(email);
    const isValid = await argon2.verify(result.password_hash, password);
    if(!isValid){
        const error = new Error("L01_inValid credentials");
        error.code = 'L01';
        error.status = 401;
        throw error;
    }
    console.log(result)
    const token = await new jose.SignJWT({email:result.email, role:result.role}).setProtectedHeader({alg:'HS256'})
    .setSubject(email)
    .setIssuedAt()
    .setIssuer('https://example.com')
    .setAudience('https://example.com')
    .setExpirationTime('15m')
    .sign(secret);
    return {token: token, email: result.email, username: result.username};
}

export default LoginService;