const atendimentoRepository = require('../repository/atendimento-repository');
const model = require('../models/atendimento-model');

module.exports = (app) => {

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        console.log(id)
        model.readById(id)
            .then((result) => res.status(200).json(result))
            .catch((erro) =>  res.status(400).json(`${erro}`));
    })

    app.get('/atendimentos', (req, res) => {
        model.readAll()
            .then((result) => res.json(result))
            .catch((erro) => res.status(400).json(erro));
    })


    app.post('/atendimentos', (req, res) => {
        model.create(req.body)
            .then((result) => res.status(201).json(result))
            .catch((erros) => res.status(400).json(erros));
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        atendimentoRepository.update(id, req.body, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        atendimentoRepository.delete(id, res);
    })


}