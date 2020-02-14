import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/Users', UserController.store);
routes.put('/Users', authMiddleware, UserController.update);

routes.post('/Session', SessionController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
