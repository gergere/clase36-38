import dotenv from 'dotenv';
import yargs from 'yargs';
dotenv.config();

const args = yargs(process.argv.slice(2))
    .alias({ p: 'port', m: 'mode' })
    .default({ port: 8080, mode: 'FORK' }).argv;


export default {
    mode: args.mode,
    PORT: args.port,
    mongoRemote: {
        cnxStr: process.env.MONGO_URL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: process.env.SQLITE_FILENAME
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            port: 3306,
            user: process.env.MARIADB_USER,
            password: process.env.MARIADB_PASS,
            database: process.env.MARIADB_DB
        }
    },
    fileSystem: {
        path: process.env.FILESYSTEM_PATH
    },
    adminEmail: 'germangere@gmail.com',
    nodemailer: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    },
    twilio: {
        sid: process.env.TWILIO_SID,
        token: process.env.TWILIO_TOKEN,
        from: process.env.TWILIO_FROM
    }
}
