const agentesRepository = require("../repositories/agentesRepository")
async function getAllAgentes(req, res) {
    try {
        const agentes = await agentesRepository.readAllAgentes();
        res.status(200).json(agentes);
    } catch (error) {
        console.error('Erro ao buscar agentes:', error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
}

async function getAgenteById(req, res) {
    try {
        const agenteId = req.params.id;
        const agente = await agentesRepository.readAgente(agenteId);
        if (!agente) {
            return res.status(404).json({ message: "Agente não encontrado"});
        }  
        res.status(200).json(agente);
    } catch (error) {
        console.error('Erro ao buscar agente:', error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};

async function postAgente(req, res) {
    try {
        const data = req.body;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const incorpDate = new Date(data.dataDeIncorporacao);
        incorpDate.setHours(0, 0, 0, 0); 

        if (data.id) {
            return res.status(400).json({ message: "Não pode conter ID" });
        }
        if (!data.nome) {
            return res.status(400).json({ message: "Nome é obrigatório" });
        }
        if (!data.dataDeIncorporacao) {
            return res.status(400).json({ message: "Data de Incorporação é obrigatória" });
        }
        if (data.dataDeIncorporacao && !/^\d{4}-\d{2}-\d{2}$/.test(data.dataDeIncorporacao)) {
            return res.status(400).json({ message: "Data de incorporação deve seguir o formato YYYY-MM-DD" });
        }
        if (incorpDate > today) {
            return res.status(400).json({ message: "Data de incorporação não pode ser futura" });
        }
        if (!data.cargo) {
            return res.status(400).json({ message: "Cargo é obrigatório" });
        }

        const newAgente = await agentesRepository.createAgente(data);
        if (!newAgente) {
            return res.status(500).json({ message: "Erro ao criar agente" });
        }
        res.status(201).json(newAgente);
    } catch (error) {
        console.error('Erro ao criar agente:', error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};

async function putAgenteById(req, res) {
    try {
        const agenteId = req.params.id;
        const agente = await agentesRepository.readAgente(agenteId);
        if (!agente) {
            return res.status(404).json({ message: "Agente não encontrado"});
        }  

        const data = req.body;
        if (data.id) {
            return res.status(400).json({ message: "Não pode conter ID" });
        }
        if (!data.nome) {
            return res.status(400).json({ message: "Nome é obrigatório" });
        }
        if (!data.dataDeIncorporacao) {
            return res.status(400).json({ message: "Data de Incorporação é obrigatória" });
        }
        if (data.dataDeIncorporacao && !/^\d{4}-\d{2}-\d{2}$/.test(data.dataDeIncorporacao)) {
            return res.status(400).json({ message: "Data de incorporação deve seguir o formato YYYY-MM-DD" });
        }
        if (!data.cargo) {
            return res.status(400).json({ message: "Cargo é obrigatório" });
        }

        const updatedAgente = await agentesRepository.updateAgente(agenteId, data);
        if (!updatedAgente) {
            return res.status(500).json({ message: "Erro ao atualizar agente" });
        }
        res.status(200).json(updatedAgente);
    } catch (error) {
        console.error('Erro ao atualizar agente:', error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};

async function patchAgenteById(req, res) {
    try {
        const agenteId = req.params.id;
        const agente = await agentesRepository.readAgente(agenteId);
        if (!agente) {
            return res.status(404).json({ message: "Agente não encontrado"});
        }  

        const data = req.body;
        if (!data.nome && !data.dataDeIncorporacao && !data.cargo) {
            return res.status(400).json({ message: "Pelo menos um campo deve ser atualizado" });
        }
        if (data.id) {
            return res.status(400).json({ message: "Não pode conter ID" });
        }
        if (data.dataDeIncorporacao && !/^\d{4}-\d{2}-\d{2}$/.test(data.dataDeIncorporacao)) {
            return res.status(400).json({ message: "Data de incorporação deve seguir o formato YYYY-MM-DD" });
        }
        const updatedAgente = await agentesRepository.patchAgente(agenteId, data);
        if (!updatedAgente) {
            return res.status(500).json({ message: "Erro ao atualizar agente" });
        }
        res.status(200).json(updatedAgente);
    } catch (error) {
        console.error('Erro ao atualizar agente:', error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};

async function deleteAgenteById(req, res) {
    try {
        const agenteId = req.params.id;
        const agente = await agentesRepository.readAgente(agenteId);
        if (!agente) {
            return res.status(404).json({ message: "Agente não encontrado"});
        }  

        const result = await agentesRepository.removeAgente(agenteId);
        if (result === false) {
            return res.status(500).json({ message: "Erro ao deletar agente" });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar agente:', error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};

module.exports = {
   getAllAgentes,
   getAgenteById,
   postAgente,
   putAgenteById,
   patchAgenteById,
   deleteAgenteById
}