const moment = require('moment');

const connection = require('../data-source/connection');
const query = require('../data-source/queries');

class AtendimentoRepository {

    create(atendimento) {
        const sql = 'INSERT INTO Atendimentos SET ?';
        return query(sql, atendimento);
    }
   
    readById(id){
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;
        return query(sql, id);
    }

    readAll(){
        const sql = 'SELECT * FROM Atendimentos';
        return query(sql);
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