const fs = require('fs');

fs.createReadStream('../assets/image/labrador.jpg')
    .pipe(fs.createWriteStream('../assets/image/labrador-stream.jpg'))
    .on('finish',()=>console.log('create image success'));