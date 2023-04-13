import { Router } from 'express';
import { auth } from '../controllers/auth.controller.js';
import { goHome, getHome } from '../controllers/web.controller.js';

export const webRouter = new Router();

webRouter.get('/', auth, goHome);
webRouter.get('/home', auth, getHome);