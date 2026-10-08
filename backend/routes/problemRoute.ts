import express from 'express'
import { problemSetHandler } from '../controller/problemsHandler.js';
export const problemSetConstructor = express.Router();




problemSetConstructor.get('/:userId',problemSetHandler);




