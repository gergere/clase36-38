import twilio from 'twilio';
import config from '../config/config.js';
import { errorLog, infoLog } from '../logger/index.js';

const accountSid = config.twilio.sid;
const authToken = config.twilio.token;
const client = twilio(accountSid, authToken);

export const sendWapp = async (newUser) => {

    try {
        const message = await client.messages.create({
            body: `Nuevo usuario registrado
            Email: ${newUser.email}
            Nombre: ${newUser.name}
            Edad: ${newUser.age}
            Teléfono: ${newUser.phone}
            Dirección: ${newUser.address}
            `,
            from: `whatsapp:${config.twilio.from}`,
            to: 'whatsapp:+5492615793559'
        })
        infoLog(message)
    } catch (e) {
        errorLog(e);
    }
}