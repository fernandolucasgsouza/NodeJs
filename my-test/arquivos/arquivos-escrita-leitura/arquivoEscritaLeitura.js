//tw
const fs = require('fs');

const callback_write = (err) => {
    if (err) console.error(err)
    else console.log('Arquivo criado!');
}

const callback_read = (err, res) => {
    if (err) console.error(err)
    else console.log('ASSINCRONO: ', res.toString());
}

//escreve sempre um novo texto no arquivo
fs.writeFile('my_file.txt', 'Fernando Write', callback_write);

//adiciona escrita no arquivo
fs.appendFile('my_file.txt', '\nLucas Write Add', callback_write);


fs.readFile(`${__dirname}\\my_file.txt`, 'utf-8', callback_read);
const data = fs.readFileSync(`${__dirname}\\my_file.txt`, 'utf-8');
console.log('SINCRONO: ', data.toString());

