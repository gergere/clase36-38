import express, { urlencoded } from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { Server as HttpServer } from 'http';
import config from './config/config.js';
import { authRouter } from './routers/auth.router.js';
import { webRouter } from './routers/web.router.js';

const app = express();
const httpServer = new HttpServer(app);

export const server = () => {

    app.use(express.json());
    app.use(urlencoded({ extended: true }));
    app.use(express.static('public'))

    app.set('views', process.cwd() + '/src/views');
    app.set('view engine', 'ejs');

    app.use(session({
        store: MongoStore.create({
            mongoUrl: config.mongoRemote.cnxStr,
            mongoOptions: config.mongoRemote.options
        }),
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 90000
        }
    }));

    app.use(authRouter);
    app.use(webRouter);


    return {
        listen: port => new Promise((resolve, reject) => {
            const connectedServer = httpServer.listen(port, () => {
                resolve(connectedServer)
            })
            connectedServer.on('error', error => {
                reject(error)
            })
        })
    }

}