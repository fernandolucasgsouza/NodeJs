const connection = require('../data-source/connection');
const upload = require('../files/upload-files');
const moment = require('moment');

class PetsRepository {

    create(pet, response) {

        const nomePetEhValido = pet.nome.length >= 3;
        const validacoes = [
            {
                nome: 'nomePet',
                ehValido: nomePetEhValido,
                mensagem: 'Nome do pet deve ter pelo menos 3 caracteres'
            }

        ]

        const erros = validacoes.filter(campo => !campo.ehValido);

        if (erros.length) {
            response.status(400).json(erros);
            return;
        }
        
        const sql = 'INSERT INTO Pets SET ?';

        upload(pet.imagem, pet.nome, (validation, destination) => {

            if (!validation.ehValido) response.status(400).json(validation);
            else {
                const petCreated = { nome: pet.nome, imagem: destination }

                connection.query(sql, petCreated, (erro, resultado) => {
                    if (erro) response.status(400).json(erro);
                    else {
                        const message = resultado?.affectedRows != 0 ? 'Criado com sucesso!' : 'Pet já existe na base.';
                        response.status(201).json({ petCreated, message })

                    };
                });
            }
        });

    }

}

module.exports = new PetsRepository;