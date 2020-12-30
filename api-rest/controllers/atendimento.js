const atendimentoRepository =  require('../repository/atendimento-repository');

module.exports = (app) => {

    app.get('/atendimentos', (req, res) => {
        res.send('você está na rota de atendimentos, GET');
    })
    
    app.post('/atendimentos', (req, res) => {
        atendimentoRepository.create(req.body)
        console.log(req.body);
        res.send('POST atendimentos');
    })
}