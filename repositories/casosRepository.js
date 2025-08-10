const db = require('../db/db');

async function readAllCasos(filters = {}) {
    try {
        const query = db('casos').select('*');

        if (filters.status) {
            query.where('status', filters.status);
        }
        if (filters.agenteId) {
            query.where('agenteId', filters.agenteId);
        }
        if (filters.search) {
            query.where(function() {
                this.where('titulo', 'ilike', `%${filters.search}%`).orWhere('descricao', 'ilike', `%${filters.search}%`)
            });
        }

        const casos = await query;
        return casos;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function readCaso(id) {
    try {
        const caso = await db('casos').where({id: id});
        if (caso.length === 0) {
            return false;
        }
        return caso[0];
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function createCaso(object) {
    try {
        const newCaso = await db('casos').insert(object).returning('*');
        return newCaso[0];
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function updateCaso(id, fieldsToUpdate) {
    try {
        const updatedCaso = await db('casos').where({ id }).update(fieldsToUpdate).returning('*');
        if (!updatedCaso || updatedCaso.length === 0) {
            return false;
        }
        return updatedCaso[0];
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function patchCaso(id, fieldsToUpdate) {
    try {
        const updatedCaso = await db('casos').where({ id }).update(fieldsToUpdate).returning('*');
        if (!updatedCaso || updatedCaso.length === 0) {
            return false;
        }
        return updatedCaso[0];
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function removeCaso(id) {
    try {
        const removedCaso = await db('casos').where({id: id}).del();
        if (removedCaso === 0) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    readAllCasos,
    readCaso,
    createCaso,
    updateCaso,
    patchCaso,
    removeCaso
}