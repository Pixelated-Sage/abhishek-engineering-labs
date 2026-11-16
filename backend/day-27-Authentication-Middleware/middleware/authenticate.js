import * as jose from 'jose';
import dotenv from 'dotenv';

dotenv.config();

export const validate = async (req, res, next) => {
    const authheader = req.headers['authorization'];
    if (!authheader) {
        const error = new Error("Authorization header missing");
        error.status = 401;
        error.code = "AUTH_HEADER_MISSING";
        return next(error);
    }

    const token = authheader.split(' ')[1];
    console.log(token)
    if (!token) {
        const error = new Error("Token missing");
        error.status = 401;
        error.code = "TOKEN_MISSING";
        return next(error);
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        const { payload } = await jose.jwtVerify(token, secret, {
            issuer: 'https://example.com',
            audience: 'https://example.com',
        });
        req.user = payload;

        return next();
    } catch (error) {
        error.status = 401; // <-- THIS WAS MISSING
        if (error instanceof jose.errors.JWTExpired) {
            error.message = "Token Expired";
        } else if (
            error instanceof jose.errors.JWSInvalid ||
            error instanceof jose.errors.JWTInvalid
        ) {
            error.message = "Malformed token";
        } else {
            error.message = "Invalid token";
        }
        return next(error);
    }
};

export const authorizeRole = (requiredRole) => (req, res, next) => {
    if (req.user?.role !== requiredRole) {
        const error = new Error("Forbidden: insufficient permissions");
        error.status = 403;
        error.code = "FORBIDDEN";
        return next(error);
    }
    return next();
};
