import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/Users', UserController.store);
routes.post('/Session', SessionController.store);

routes.use(authMiddleware);

routes.put('/Users', UserController.update);

routes.post('/Files', upload.single('file'), FileController.store);
routes.post('/Appointments', AppointmentController.store);

routes.get('/Providers', ProviderController.index);
routes.get('/Appointments', AppointmentController.index);
routes.get('/Schedule', ScheduleController.index);
routes.get('/Notifications', NotificationController.index);

export default routes;
