import {Router} from 'express';
import RegisterController from '../controller/auth.controller.js';
import RegisterService from '../services/auth.service.js';
import RegisterRepository from '../repository/auth.repository.js';
import pool from '../db/db.js';


const registerRepository = new RegisterRepository(pool);
const registerService = new RegisterService(pool,registerRepository);
const registerController = new RegisterController(registerService);

const router = Router();

router.post('/register', registerController.register);

export default router;