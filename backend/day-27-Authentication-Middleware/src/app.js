import express from "express";
import errorHandler from "../middleware/errorHandler.js";
import {validate , authorizeRole}  from "../middleware/authenticate.js";
import userRoutes from '../routes/user.route.js'
import authRoutes from "../routes/auth.route.js";
import adminRoutes from '../routes/admin.route.js';

import cors from 'cors';
import * as jose from 'jose';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use('/api/home',validate,userRoutes);

app.use('/api/admin', validate , authorizeRole("admin"), adminRoutes);


app.use("/tokenCheck", async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jose.jwtVerify(token, secret, {
            issuer: 'https://example.com',
            audience: 'https://example.com',
        });
        return res.status(200).json({ message: 'Token is valid', payload });
    } catch (error) {
        if (error instanceof jose.errors.JWTExpired) {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
});

app.use(errorHandler);


export default app;