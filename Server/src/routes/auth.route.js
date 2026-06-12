import express from 'express'
import { UserModel } from '../models/auth.models.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';
import { UserRegister } from '../controllers/auth.controller.js';

const router = express.Router()


router.post('/register',UserRegister)




export default router