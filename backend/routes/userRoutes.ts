import express from'express'
import { getUser } from '../controller/userController.js';
export const userRouter  = express.Router();

userRouter.post('/enter',getUser);


