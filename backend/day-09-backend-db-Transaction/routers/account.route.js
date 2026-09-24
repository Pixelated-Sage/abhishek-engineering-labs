import {Router} from 'express';
import pool from '../db/db.js';
import TransferController from "../controllers/account.controller.js"
import TransferRepository from '../repositories/transfer.repository.js';
import TransferService from '../services/transfer.service.js';


const transferRepository = new TransferRepository(pool);
const transferService = new TransferService(pool,transferRepository);
const transferController = new TransferController(transferService)
const router = Router();

router.post("/transfer",transferController.transferAmount)

export default router;