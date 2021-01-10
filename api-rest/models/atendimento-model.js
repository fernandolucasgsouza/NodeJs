const axios = require('axios');
const moment = require('moment');

const repository = require("../repository/atendimento-repository");

class AtendimentoModel {

    constructor() {

        this.isValidDateAgendament = ({ date, dateCreate }) => moment(date).isSameOrAfter(dateCreate);
        this.isValidClientName = ({ lengthName }) => lengthName >= 5;

        this.validate = (params) => this.validations.filter(property => {
            const { name } = property;
            const param = params[name];
            return !property.isValid(param);
        });

        this.validations = [
            {
                name: 'data',
                isValid: this.isValidDateAgendament,
                message: 'Data de agendamento deve ser maior que data atual'
            },
            {
                name: 'nome',
                isValid: this.isValidClientName,
                message: 'Nome do cliente deve ter pelo menos 5 caracteres'
            }
        ];
    }

    create(atendimento) {

        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const paramsValidation = {
            data: { date: data, dateCreate: dataCriacao },
            nome: { lengthName: atendimento.cliente.length }
        }

        const erros = this.validate(paramsValidation);

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