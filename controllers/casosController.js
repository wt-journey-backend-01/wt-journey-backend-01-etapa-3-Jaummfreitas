const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");
async function getAllCasos(req, res) {
    try {
        const { status, agenteId, search } = req.query;
        const casos = await casosRepository.readAllCasos({ status, agenteId, search });
        
        if (casos === false) {
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
        
        res.status(200).json(casos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};

async function getCasoById(req, res) {
        const casoId = req.params.id;
        const caso = await casosRepository.readCaso(casoId);
        if (!caso) {
            return res.status(404).json({ message: "Caso não encontrado"});
        }  
        res.status(200).json(caso);
};

async function postCaso(req, res) {
        const data = req.body;
        if (data.id) {
            return res.status(400).json({ message: "Não pode conter ID" });
        }
        if (!data.titulo) {
            return res.status(400).json({ message: "Título é obrigatório" });
        }
        if (!data.descricao) {
            return res.status(400).json({ message: "Descrição é obrigatória" });
        }
        if (!data.status) {
            return res.status(400).json({ message: "Status é obrigatório" });
        }
        if (data.status !== "aberto" && data.status !== "solucionado") {
            return res.status(400).json({ message: "Status deve ser 'aberto' ou 'solucionado'" });
        }
        if (!data.agenteId) {
            return res.status(400).json({ message: "ID do agente é obrigatório" });
        }
        if (!await agentesRepository.readAgente(data.agenteId)) {
            return res.status(404).json({ message: "Agente não encontrado para o ID fornecido" });
        }
        const newCaso = await casosRepository.createCaso(data);
        res.status(201).json(newCaso);
};

async function putCasoById(req, res) {
        const casoId = req.params.id;
        const caso = await casosRepository.readCaso(casoId);
        if (!caso) {
            return res.status(404).json({ message: "Caso não encontrado"});
        }  

        const data = req.body;
        if (data.id) {
            return res.status(400).json({ message: "Não pode conter ID" });
        }
        if (!data.titulo) {
            return res.status(400).json({ message: "Título é obrigatório" });
        }
        if (!data.descricao) {
            return res.status(400).json({ message: "Descrição é obrigatória" });
        }
        if (!data.status) {
            return res.status(400).json({ message: "Status é obrigatório" });
        }
        if (data.status !== "aberto" && data.status !== "solucionado") {
            return res.status(400).json({ message: "Status deve ser 'aberto' ou 'solucionado'" });
        }
        if (!data.agenteId) {
            return res.status(400).json({ message: "ID do agente é obrigatório" });
        }
        if (!await agentesRepository.readAgente(data.agenteId)) {
            return res.status(404).json({ message: "Agente não encontrado para o ID fornecido" });
        }

        const updatedCaso = await casosRepository.updateCaso(casoId, data);
        res.status(200).json(updatedCaso);
};

async function patchCasoById(req, res) {
        const casoId = req.params.id;
        const caso = await casosRepository.readCaso(casoId);
        if (!caso) {
            return res.status(404).json({ message: "Caso não encontrado"});
        }  

        const data = req.body;
        if (!data.titulo && !data.descricao && !data.status && !data.agenteId) {
            return res.status(400).json({ message: "Pelo menos um campo deve ser atualizado" });
        }
        if (data.id) {
            return res.status(400).json({ message: "Não pode conter ID" });
        }
        if (data.status && data.status !== "aberto" && data.status !== "solucionado") {
            return res.status(400).json({ message: "Status deve ser 'aberto' ou 'solucionado'" });
        }
        if (data.agenteId && !await agentesRepository.readAgente(data.agenteId)) {
            return res.status(404).json({ message: "Agente não encontrado para o ID fornecido" });
        }
        const updatedCaso = await casosRepository.patchCaso(casoId, data);
        res.status(200).json(updatedCaso);
};

async function deleteCasoById(req, res) {
        const casoId = req.params.id;
        const caso = await casosRepository.readCaso(casoId);
        if (!caso) {
            return res.status(404).json({ message: "Caso não encontrado"});
        }  

        await casosRepository.removeCaso(casoId);
        res.status(204).send();
};

module.exports = {
   getAllCasos,
   getCasoById,
   postCaso,
   putCasoById,
   patchCasoById,
   deleteCasoById
}