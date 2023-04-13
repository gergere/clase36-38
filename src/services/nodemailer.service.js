import nodemailer from 'nodemailer';
import config from '../config/config.js';
import { errorLog, infoLog } from '../logger/index.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.nodemailer.user,
        pass: config.nodemailer.pass
    }
});

export const sendMail = async (newUser) => {

    const mailOptions = {
        from: 'Node server',
        to: config.adminEmail,
        subject: 'Nuevo registro',
        html: `<h1>Nuevo usuario registrado</h1>
        <p>Email: ${newUser.email}</p>
        <p>Nombre: ${newUser.name}</p>
        <p>Edad: ${newUser.age}</p>
        <p>Teléfono: ${newUser.phone}</p>
        <p>Dirección: ${newUser.address}</p>
        `
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        infoLog(info);
    } catch (error) {
        errorLog(error);
    }
}
