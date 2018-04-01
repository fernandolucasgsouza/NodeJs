let fs = require('fs');


/** ler o arquivo
 * my_file.txt = nome do arquivo a ser lido
 */
// fs.readFile('my_file.txt',(err, data)=>{
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log(data.toString());
// });


/** leitura de arquivo ASSINCRONO
 * my_file.txt = nome do arquivo a ser lido
 * contador time tempo de leitura  1000x
 */
// console.time("Assincrono");
// var count = 0;

// for(var i=0; i<1000; i++){
//     fs.readFile('my_file.txt', (err, data)=>{
//         if(err){
//             return console.error(err);
//         }
//         console.log('Assincrono: ', data.toString())
//         count++;
//         if(count === 1000){
//             console.timeEnd('Assincrono'); //283.980ms
//         }
//     });
// }


/** leitura de arquivo SINCRONO
 * my_file.txt = nome do arquivo a ser lido
 * contador time tempo de leitura  1000x
 */
console.time("Sincrono");
for(var i=0; i<1000; i++){
    let data = fs.readFileSync('my_file.txt');
    console.log('Sincrono: ', data.toString())
}
console.timeEnd("Sincrono"); //639.183ms
