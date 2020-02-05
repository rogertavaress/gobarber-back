import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/Users', UserController.store);

routes.post('/Session', SessionController.store);

export default routes;
