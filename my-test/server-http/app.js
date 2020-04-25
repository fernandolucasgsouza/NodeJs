const http = require('http');
const fs = require('fs');
const url = require('url');
const routes = require('./routes')

const server = http.createServer((req, resp) => {
    const url_parts = url.parse(req.url);
    let path = url_parts.pathname;
    const route = routes.find(obj => obj.route == path);
    if(!route) path = '/page404.html';
    
    fs.readFile(`${__dirname}${path}`, (err, data) => {
        if (err) {
            resp.writeHead(500, { 'Content-Type': 'text/html' });
            resp.write('Erro no servidor')
        }else if(!route){
            resp.writeHead(404, { 'Content-Type': 'text/html' });
            resp.write(data)
        }
         else {
            resp.writeHead(200, { 'Content-Type': 'text/html' });
            resp.write(data);
        }
        resp.end();
    })
});


server.listen(3001)