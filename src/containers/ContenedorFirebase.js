import admin from 'firebase-admin';
import config from '../config/config.js'
import { errorLog } from '../logger/index.js';

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion);
    }

    async listar(id) {
        try {
            const doc = this.coleccion.doc(`${id}`);
            const item = await doc.get();
            const response = item.data();
            return response;
        } catch (error) {
            errorLog(error);
        }
    }

    async listarAll() {
        try {
            const querySnapshop = await this.coleccion.get()
            let docs = querySnapshop.docs
            const response = docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            }))
            return response;
        } catch (error) {
            errorLog(error);
        }
    }

    async guardar(nuevoElem) {
        try {
            const newDoc = await this.coleccion.add(nuevoElem);
            return newDoc;
        } catch (error) {
            errorLog(error);
        }
    }

    async actualizar(id, nuevoElem) {
        try {
            const doc = this.coleccion.doc(`${id}`);
            const item = await doc.update(nuevoElem);
            return item;
        } catch (error) {
            errorLog(error);
        }
    }

    async borrar(id) {
        try {
            const doc = this.coleccion.doc(`${id}`);
            const del = await doc.delete();
            return del;
        } catch (error) {
            errorLog(error);
        }
    }

    async borrarAll() {
        try {
            const snapshot = await this.coleccion.get();
            snapshot.docs.forEach(doc => doc.ref.delete());
        } catch (error) {
            errorLog(error);
        }
    }

    async desconectar() {
        await db.terminate();
    }
}

export default ContenedorFirebase