import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Olá Mundo!' }));

export default routes;
