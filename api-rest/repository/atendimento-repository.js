const connection = require('../data-source/connection');
const moment = require('moment');

class AtendimentoRepository {

    create(atendimento, response) {

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
        ]

        const erros = validacoes.filter(campo => !campo.ehValido);

        if (erros.length) {
            response.status(400).json(erros);
            return;
        }

        const atendimentoDatado = { ...atendimento, dataCriacao, data }
        const sql = 'INSERT INTO Atendimentos SET ?';

        connection.query(sql, atendimentoDatado, (erro, resultado) => {
            if (erro) response.status(400).json(erro);
            else {
                const message = resultado?.affectedRows != 0 ? 'Criado com sucesso!' : 'Cliente já existe na base.';
                response.status(201).json({ atendimentoDatado, message })
               
            };
        });

    }

    readById(response, id) {

        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;

        connection.query(sql, (erro, resultado) => {
            if (erro) response.status(400).json(erro);
            else response.status(200).json(resultado[0]);
        });

    }

    readAll(response) {

        const sql = 'SELECT * FROM Atendimentos';

        connection.query(sql, (erro, resultados) => {
            if (erro) response.status(400).json(erro);
            else response.status(200).json(resultados);
        });

    }

    update(id, values, response) {

        if (values.dataCriacao) {
            response.status(400).json({
                nome: 'dataCriacao',
                ehValido: !values.dataCriacao,
                mensagem: 'Data de criação não pode ser alterada'
            });
            return;
        }

        if (values.data) values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

        connection.query(sql, [values, id], (erro, resultados) => {
            if (erro) response.status(400).json(erro);
            else {
                const message = resultados?.affectedRows != 0 ? 'Alterado com sucesso!' : 'Não existem dados para alterar.';
                response.status(200).json({ values, message })
            };
        });

    }

    delete(id, response) {

        const sql = `DELETE FROM Atendimentos WHERE id=?`;

        connection.query(sql, id, (erro, resultado) => {
            if (erro) response.status(400).json(erro);
            else {
                const message = resultado?.affectedRows != 0 ? 'Deletado com sucesso!' : 'Não existem dados para deletar.';
                response.status(200).json({ id, message })
            };
        });

    }
}

module.exports = new AtendimentoRepository;