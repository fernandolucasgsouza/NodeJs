const axios = require('axios');
const moment = require('moment');

const repository = require("../repository/atendimento-repository");

class AtendimentoModel {

    create(atendimento) {

        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const dataAgendamentoEhValida = moment(data).isSameOrAfter(dataCriacao);
        const nomeClienteEhValido = atendimento.cliente.length >= 5;
        const validacoes = [
            {
                nome: 'data',
                ehValido: dataAgendamentoEhValida,
                mensagem: 'Data de agendamento deve ser maior que data atual'
            },
            {
                nome: 'nome',
                ehValido: nomeClienteEhValido,
                mensagem: 'Nome do cliente deve ter pelo menos 5 caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.ehValido);

        if (erros.length)
            return new Promise((resolve, reject) => reject(erros));

        const atendimentoDatado = { ...atendimento, dataCriacao, data };

        return repository.create(atendimentoDatado)
            .then((response) => {
                const message = response?.affectedRows != 0 ? 'Criado com sucesso!' : 'Cliente já existe na base.';
                return { ...atendimentoDatado, id: response.insertId, message };
            });
    };

    readById(id) {

        return repository.readById(id)
            .then((response) => response[0])
            .then(async (atendimento) => {
                try {

                    const cpf = atendimento.cliente;
                    const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                    atendimento.cliente = data;
                    return atendimento;

                } catch (error) {
                    return new Promise((resolve, reject) => reject(error));
                }
            });
    }

    readAll() {
        return repository.readAll()
            .then(response => response);
    }
}

module.exports = new AtendimentoModel;