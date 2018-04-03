let http = require('http'),
    fs   = require('fs'),
    url  = require('url');

    let server = http.createServer((request, response)=>{
        let url_parts = url.parse(request.url);
        let path = url_parts.pathname;
        
        fs.readFile(__dirname + path, (err, data)=>{
            if(err){
                response.writeHead(400, {'Content-Type':'text/html'});
                response.write('Not found');
            }else{
                response.writeHead(200, {'Content-Type':'text/html'});
                response.write(data);
            }
            response.end();
        });
    });

server.listen(3000)