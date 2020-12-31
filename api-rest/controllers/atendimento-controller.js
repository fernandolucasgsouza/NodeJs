const atendimentoRepository =  require('../repository/atendimento-repository');

module.exports = (app) => {

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        atendimentoRepository.readById(res, id);
    })

    app.get('/atendimentos', (req, res) => {
        atendimentoRepository.readAll(res);
    })
    
    app.post('/atendimentos', (req, res) => {
        atendimentoRepository.create(req.body, res)
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