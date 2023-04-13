import log4js from 'log4js';

log4js.configure({
  appenders: {
    consoleLogger: { type: 'console' },
    warningLogger: { type: 'file', filename: './logs/warn.log' },
    errorLogger: { type: 'file', filename: './logs/error.log' }
  },
  categories: {
    default: { appenders: ['consoleLogger'], level: 'trace' },
    console: { appenders: ['consoleLogger'], level: 'info' },
    warnFile: { appenders: ['warningLogger', 'consoleLogger'], level: 'warn' },
    errorFile: { appenders: ['errorLogger', 'consoleLogger'], level: 'error' }
  }
})

const info = log4js.getLogger('console');
const warn = log4js.getLogger('warnFile');
const error = log4js.getLogger('errorFile');

const infoLog = msj => info.info(msj);
const warnLog = msj => warn.warn(msj);
const errorLog = msj => error.error(msj);
const pathLog = (req, res, next) => {
  infoLog(`Petición con el método ${req.method} desde ${req.url}`);
  next();
}

export {
  infoLog,
  warnLog,
  errorLog,
  pathLog
}