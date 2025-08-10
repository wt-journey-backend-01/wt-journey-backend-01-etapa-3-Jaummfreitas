const db = require('../db/db');
async function readAllAgentes() {
    try {
        const agentes = await db('agentes').select('*');
        return agentes;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function readAgente(id) {
    try {
        const agente = await db('agentes').where({id: id});
        if (agente.length === 0) {
            return false;
        }
        return agente[0];
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function createAgente(object) {
    try {
        const newAgente = await db('agentes').insert(object).returning('*');
        return newAgente[0];
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function updateAgente(id, fieldsToUpdate) {
    try {
        const updatedAgente = await db('agentes').where({ id }).update(fieldsToUpdate).returning('*');
        if (!updatedAgente || updatedAgente.length === 0) {
            return false;
        }
        return updatedAgente[0];
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function patchAgente(id, fieldsToUpdate) {
    try {
        const updatedAgente = await db('agentes').where({ id }).update(fieldsToUpdate).returning('*');
        if (!updatedAgente || updatedAgente.length === 0) {
            return false;
        }
        return updatedAgente[0];
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function removeAgente(id) {
    try {
        const removedAgente = await db('agentes').where({id: id}).del();
        if (removedAgente === 0) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    readAllAgentes,
    readAgente,
    createAgente,
    updateAgente,
    patchAgente,
    removeAgente
}
