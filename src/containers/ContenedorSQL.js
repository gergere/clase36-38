import knex from 'knex'

class ContenedorSQL {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    async listar(id) {
        const result = await this.knex.select('*').from(this.tabla).where('id', id);
        return result;
    }

    async listarAll() {
        const result = await this.knex(this.tabla).select('*');
        return result;
    }

    async guardar(elem) {
        return await this.knex(this.tabla).insert(elem);
    }

    async actualizar(elem) {
        const result = await this.knex.from(this.tabla).where('id', elem.id).update(elem);
        return result;
    }

    async borrar(id) {
        const result = await this.knex.delete().from(this.tabla).where('id', id);
        return result;
    }

    async borrarAll() {
        const result = this.knex.delete().from(this.tabla);
        return result;
    }

    async desconectar() {
        await this.knex.destroy();
    }
}

export default ContenedorSQL