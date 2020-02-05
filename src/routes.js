import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Olá Mundo!' }));

routes.get('/Users', async (req, res) => {
    const user = await User.create({
        name: 'Roger',
        email: 'rogerioctf@gmail.com',
        password_hash: 'asdasd',
    });

    return res.json(user);
});

export default routes;
