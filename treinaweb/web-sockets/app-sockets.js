let io = require("socket.io")(3000);

/**
 * io.on é um ouvinte chamado connection
 * executa a função chamada socket
 */
io.on('connection',(socket)=>{
    console.log('Novo usuário conectado..');

    socket.on('client_message',(data)=>{
        io.sockets.emit('server_message', data);
    });
});