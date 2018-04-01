let fs = require('fs');

let text = 'Arquivo criado com este conteúdo!'

/** cria e ecreve no arquivo
 * my_file.txt = nome do arquivo a ser criado
 * text = conteudo do arquivo
 */
fs.writeFile('my_file.txt', text ,(err)=>{
    if(err){
        console.log(err)
    }
    console.log('Arquivo criado');
});


let addText = ' texto do append.'
/** acrescenta texto no arquivo
 * my_file.txt = nome do arquivo a ser acrescentado conteúdo
 * addText = conteudo a ser add no arquivo
 */
fs.appendFile('my_file.txt',addText, (err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('conteudo acrecentado!');
});

