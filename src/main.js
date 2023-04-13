import { server } from './server.js';
import os from 'os';
import cluster from 'cluster';
import config from './config/config.js';
import { errorLog, infoLog } from './logger/index.js';

const cpus = os.cpus().length;
const clusterMode = config.mode === 'CLUSTER';

if (clusterMode && cluster.isPrimary) {
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', worker => {
        infoLog(`Worker ${worker.id} con el pid ${worker.process.pid} finalizó. ${new Date().toLocaleString()}`);
        cluster.fork();
    })
} else {
    const app = server();
    try {
        const connectedServer = await app.listen(config.PORT);
        infoLog(`Proceso ${process.pid} escuchando en el puerto ${connectedServer.address().port}`);
    } catch (error) {
        errorLog(`Error en servidor ${error}`);
    }
}