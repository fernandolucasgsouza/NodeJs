//tw
const fs = require('fs');


/* Assincrono 
* comenentar o Sincrono antes de executar
*/
console.time('Assincrono');
let count = 0;
const callbackReadAsync = (err, res, ) => {

    if (err) return console.error(err)
    count++;
    console.log(`Assincrono: ${res.toString()}`);
    if (count === 1000) return console.timeEnd('Assincrono');

}

for (let index = 0; index < 1000; index++) {
    fs.readFile(`${__dirname}\\my_file.txt`, callbackReadAsync)
}
// +|- 481.768ms



/* Sincrono 
* comenentar o Assincrono antes de executar
*/
console.time('Sincrono');
for (let index = 0; index < 1000; index++) {
    let data = fs.readFileSync(`${__dirname}\\my_file.txt`)
    console.log(data.toString());
}
console.timeEnd('Sincrono'); 
// +|- 554.840ms
