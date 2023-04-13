import * as fs from 'fs'
import config from '../config/config.js'
import { errorLog, infoLog, warnLog } from '../logger/index.js';

class ContenedorArchivo {

    constructor(ruta) {
        this.path = `${config.fileSystem.path}/${ruta}`;
    }

    async listar(id) {
        if (!fs.existsSync(this.path)) return warnLog('El archivo solicitado no está creado');
        try {
            const lectura = await fs.promises.readFile(this.path, 'utf-8');
            const datos = JSON.parse(lectura);
            const res = datos.filter(prod => prod.id === id);
            if (res.length === 0) {
                return null;
            } else {
                return res[0];
            }
        } catch (error) {
            errorLog('Error de lectura: ', error);
        }
    }

    async listarAll() {
        if (!fs.existsSync(this.path)) return warnLog('El archivo solicitado no está creado');
        try {
            const lectura = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(lectura);
        } catch (error) {
            errorLog('Error de lectura: ', error);
        }
    }

    async guardar(objeto) {
        if (!objeto || typeof (objeto) != 'object' || objeto.length === 0) return warnLog('Necesitamos un objeto a guardar');
        try {
            let id;
            const timestamp = Date.now();
            const lectura = fs.existsSync(this.path) ? await fs.promises.readFile(this.path, 'utf-8') : JSON.stringify([]);
            const datos = JSON.parse(lectura);
            datos.length === 0 ? id = 1 : id = datos[datos.length - 1].id + 1;
            datos.push({ ...objeto, id, timestamp });
            await fs.promises.writeFile(this.path, JSON.stringify(datos));
            infoLog(`Objeto guardado con el id nº: ${id}`);
            return id;
        } catch (error) {
            errorLog('Problema al guardar el archivo: ', error);
        }
    }

    async actualizar(id, modProduct) {
        if (!modProduct || typeof (modProduct) != 'object' || modProduct.length === 0) return warnLog('Necesitamos un objeto a guardar');
        try {
            const lectura = await fs.promises.readFile(this.path, 'utf-8');
            const datos = JSON.parse(lectura);
            const modifying = datos.find(prod => prod.id === id);
            if (modifying === undefined) throw new Error('producto no encontrado');
            const i = datos.indexOf(modifying);
            datos[i] = { ...modifying, ...modProduct };
            await fs.promises.writeFile(this.path, JSON.stringify(datos));
            infoLog('Producto modificado exitosamente');
            return datos[i];
        } catch (error) {
            errorLog('Error al intentar modificar el producto: ', error);
        }
    }

    async borrar(id) {
        if (!fs.existsSync(this.path)) return warnLog('El archivo solicitado no está creado');
        if (!id) return warnLog('Se necesita el ID del producto a eliminar');
        if (typeof id != 'number') return warnLog('El valor insertado debe ser de tipo número');
        try {
            const lectura = await fs.promises.readFile(this.path, 'utf-8')
            const datos = JSON.parse(lectura);
            const res = datos.filter(prod => prod.id === id);
            if (res.length === 0) {
                throw new Error(`El ID ${id} no se encuentra en el archivo`);
            } else {
                const newData = datos.filter(prod => prod.id != id);
                await fs.promises.writeFile(this.path, JSON.stringify(newData));
                infoLog(`El producto con el ID ${id} fue eliminado correctamente`);
            }
        } catch (error) {
            errorLog('Error al eliminar el producto: ', error);
        }
    }

    async borrarAll() {
        if (!fs.existsSync(this.path)) return warnLog('El archivo solicitado no está creado');
        try {
            await fs.promises.writeFile(this.path, '[]')
            infoLog('Todos los productos se eliminaron correctamente');
        } catch (error) {
            errorLog('Error al eliminar el archivo: ', error);
        }
    }
}


export default ContenedorArchivo