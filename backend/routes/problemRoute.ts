import express from 'express'
import { problemSetHandler,problemStatusHandler } from '../controller/problemsHandler.js';
export const problemSetConstructor = express.Router();




problemSetConstructor.get('/:userId',problemSetHandler);
problemSetConstructor.patch('/changeState',problemStatusHandler);




