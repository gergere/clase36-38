import mongoose from 'mongoose'
import config from '../config/config.js'
import { errorLog } from '../logger/index.js';

await mongoose.connect(config.mongoRemote.cnxStr, config.mongoRemote.options)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async listar(id) {
        try {
            const elemRead = await this.coleccion.find({ _id: id });
            return elemRead;
        } catch (error) {
            errorLog(error);
        }
    }

    async listarByEmail(email) {
        try {
            const elemRead = await this.coleccion.findOne({ email });
            return elemRead;
        } catch (error) {
            errorLog(error);
        }
    }

    async listarAll() {
        try {
            const elemRead = await this.coleccion.find({});
            return elemRead;
        } catch (error) {
            errorLog(error);
        }
    }

    async guardar(nuevoElem) {
        try {
            const elemSave = new this.coleccion(nuevoElem);
            const savedElem = await elemSave.save();
            return savedElem;
        } catch (error) {
            errorLog(error);
        }
    }

    async actualizar(id, nuevoElem) {
        try {
            const elemUpdate = await this.coleccion.updateOne({ _id: id }, {
                $set: { ...nuevoElem }
            });
            return elemUpdate;
        } catch (error) {
            errorLog(error);
        }
    }

    async borrar(id) {
        try {
            const elemDel = await this.coleccion.deleteOne({ _id: id });
            return elemDel;
        } catch (error) {
            errorLog(error);
        }
    }

    async borrarAll() {
        try {
            const elemsDel = await this.coleccion.deleteMany({});
            return elemsDel;
        } catch (error) {
            errorLog(error);
        }
    }
}

export default ContenedorMongoDb