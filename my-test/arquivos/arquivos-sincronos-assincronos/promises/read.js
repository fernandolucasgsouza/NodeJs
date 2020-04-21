//tw
const fs = require('fs'),
    promise = require('promise');

read = (file) => {
    return new promise((fulfill, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject()
            else fulfill(data.toString());
        })
    });
}

module.exports = read;