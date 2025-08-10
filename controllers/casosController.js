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
    try {
        const casoId = req.params.id;
        const caso = await casosRepository.readCaso(casoId);
        if (!caso) {
            return res.status(404).json({ message: "Caso não encontrado"});
        }  
        res.status(200).json(caso);
    } catch (error) {
        console.error('Erro ao buscar caso:', error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};

async function postCaso(req, res) {
    try {
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
        if (!newCaso) {
            return res.status(500).json({ message: "Erro ao criar caso" });
        }
        res.status(201).json(newCaso);
    } catch (error) {
        console.error('Erro ao criar caso:', error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};

async function putCasoById(req, res) {
    try {
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
        if (!updatedCaso) {
            return res.status(500).json({ message: "Erro ao atualizar caso" });
        }
        res.status(200).json(updatedCaso);
    } catch (error) {
        console.error('Erro ao atualizar caso:', error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};

async function patchCasoById(req, res) {
    try {
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
        if (!updatedCaso) {
            return res.status(500).json({ message: "Erro ao atualizar caso" });
        }
        res.status(200).json(updatedCaso);
    } catch (error) {
        console.error('Erro ao atualizar caso:', error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};

async function deleteCasoById(req, res) {
    try {
        const casoId = req.params.id;
        const caso = await casosRepository.readCaso(casoId);
        if (!caso) {
            return res.status(404).json({ message: "Caso não encontrado"});
        }  

        const result = await casosRepository.removeCaso(casoId);
        if (result === false) {
            return res.status(500).json({ message: "Erro ao deletar caso" });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar caso:', error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};

module.exports = {
   getAllCasos,
   getCasoById,
   postCaso,
   putCasoById,
   patchCasoById,
   deleteCasoById
}