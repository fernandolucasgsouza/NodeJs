const fs = require('fs')

const caminho = __dirname + '\\arquivo.json';

//sincrono 1
const conteudo = fs.readFileSync(caminho, 'UTF-8');
console.log(`string >>  ${conteudo}`);


//sincrono 2
const config = require('./arquivo.json')
console.log('object >>',config.db);


//assincrono
const callback_host_port = (error, res) => {
    const config =  JSON.parse(res);
    console.log(`object >> ${config.db.host}:${config.db.port}`);
}
fs.readFile(caminho, 'utf-8', callback_host_port)

//listar diretórios
fs.readdir(__dirname,(err, arquivos)=>{
    console.log('conteúdo da pasta... ',arquivos);
    
})