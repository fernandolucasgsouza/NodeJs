const expressConfig = require('./config/express');
const connection = require('./data-source/connection');
const tables = require('./data-source/tables')

connection.connect((erro) => {
    if (erro) console.log(erro);
    else {
        console.log('conectado no banco com sucesso!');
        
        tables.init(connection);
        startServer();
    }
});

startServer = () => {
    const app = expressConfig();
    app.listen(3000, () => console.log('servidor rodando na porta 3000'));
}


