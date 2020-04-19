const express = require('express');

let app = express();
    
app.get('/', (req, resp)=>{
    resp.send('Hello world!')
});

app.listen(3000, ()=>{
    console.log('Rodando na porta 3000');
});