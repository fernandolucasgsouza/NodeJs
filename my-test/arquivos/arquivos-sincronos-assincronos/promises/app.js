const readFile = require('./read');

readFile(`${__dirname}\\my_file.txt`)
.then((data)=>{
    console.log(data);
    return '111';
})
.then((res)=>{
    console.log(res);
    return '222';
})
.then((res)=>{
    console.log(res);
    return '333';
})
.done((res)=>console.log(res));