const connection = require('../data-source/connection');

class AtendimentoRepository {

    create(atendimento) {
        const insert = 'INSERT INTO Atendimentos SET ?';

        connection.query(insert, atendimento, (error, result) => {
            if (error) console.log(error);
            else console.log(result);
        });

    }
}

module.exports = new AtendimentoRepository;