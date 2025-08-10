const db = require('../db/db');
const { up } = require('../db/migrations/20250809212213_agentes');
async function readAllCasos() {
    try {
        const casos = await db('casos').select('*');
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
        const newCaso = await db('casos').insert(object,['*']);
        return newCaso[0];
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function updateCaso(id, fieldsToUpdate) {
    try {
        const updatedCaso = await db('casos').where({id: id}).update(fieldsToUpdate, ['*']);
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
        const updatedCaso = await db('casos').where({id: id}).update(fieldsToUpdate, ['*']);
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
        if (removeCaso.length === 0) {
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