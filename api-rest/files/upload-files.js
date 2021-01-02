const fs = require('fs');
const path = require('path');

module.exports = (pathSelf, imageName, callback) => {

    const extensionList = ['jpgd', 'png', 'jpeg'];
    const extension = path.extname(pathSelf);
    const isExtension = extensionList.find(ext => ext === extension.replace('.', ''))

    const destination = `./assets/image/${imageName.trim().replace(/\s/g, '')}${extension}`;
    const validation = {
        nome: 'extensao',
        ehValido: isExtension,
        mensagem: 'Extensão inválida'
    }

    if (!isExtension) {
        callback(validation, destination)
        return
    };

    fs.createReadStream(pathSelf)
        .pipe(fs.createWriteStream(destination))
        .on('finish', () => callback(validation, destination));

}