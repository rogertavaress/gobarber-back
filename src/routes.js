import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/Users', UserController.store);

export default routes;
