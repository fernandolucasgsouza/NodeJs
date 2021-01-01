const petRepository =  require('../repository/pets-repository');

module.exports = (app) => {

    app.post('/pet',(req, res)=>{
        petRepository.create(req.body, res);
    });

}