class ContenedorMemoria {

    constructor() {
        this.elementos = []
    }

    listar(id) {
        const result = this.elementos.filter(el => el.id === id);
        if (result.length !== 0) {
            return result;
        } else {
            return { error: 'Elemento no encontrado' };
        }
    }

    listarAll() {
        return this.elementos;
    }

    guardar(elem) {
        let id;
        if (this.elementos.length === 0) {
            id = 1;
        } else {
            id = this.elementos[this.elementos.length - 1].id + 1;
        }
        this.elementos.push({ id, ...elem });
        return { id, ...elem };
    }

    actualizar(id, elem) {
        const modifying = this.elementos.find(prod => prod.id === id);
        if (modifying === undefined) return { error: 'Elemento no encontrado' };
        const i = this.elementos.indexOf(modifying);
        this.elementos[i] = { ...modifying, ...elem };
    }

    borrar(id) {
        const i = this.elementos.findIndex(prod => prod.id === id);
        if (i === -1) return { error: 'producto no encontrado' };
        this.elementos.splice(i, 1);
    }

    borrarAll() {
        this.elementos = []
        return { mensaje: 'Todos los elementos fueron eliminados' }
    }
}

export default ContenedorMemoria
