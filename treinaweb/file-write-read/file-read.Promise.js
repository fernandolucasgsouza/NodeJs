let fs = require('fs'),
    Promise = require('promise');

function read(file) {
    return new Promise(function (fulfill, reject) {
        /*
         * ler o arquivo
         * my_file.txt = nome do arquivo a ser lido
        */
        fs.readFile(file, (err, data) => {
            if (err) {
                reject();
            } else {
                fulfill(data.toString());
            }
        })
    });
}

read('my_file.txt')
    .then((answer) => {
        console.log(answer);
        return '11111'
    })
    .then((answer2) => {
        console.log(answer2);
    });