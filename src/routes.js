import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/Users', UserController.store);
routes.put('/Users', authMiddleware, UserController.update);

routes.post('/Session', SessionController.store);

export default routes;
