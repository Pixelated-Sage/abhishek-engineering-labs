import argon2 from 'argon2';
import FetchPassword from '../repository/login.repository.js';
import * as jose from 'jose';
import dotenv from 'dotenv';

dotenv.config();
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const LoginService = async(email,password) =>{
    const result = await FetchPassword(email);
    const isValid = await argon2.verify(result.password_hash, password);
    if(!isValid){
        const error = new Error("L01_inValid credentials");
        error.code = 'L01';
        error.status = 401;
        throw error;
    }
    const token = await new jose.SignJWT({email}).setProtectedHeader({alg:'HS256'})
    .setSubject(email)
    .setIssuedAt()
    .setIssuer('https://example.com')
    .setAudience('https://example.com')
    .setExpirationTime('1m')
    .sign(secret);
    return {token: token, email: result.email, username: result.username};
}

export default LoginService;