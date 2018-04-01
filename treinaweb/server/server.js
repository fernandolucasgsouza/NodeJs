let http = require('http'),
    fs   = require('fs'),
    url  = require('url');

    let server = http.createServer((request, response)=>{
        let url_parts = url.parse(request.url);
        let path = url_parts.pathname;
       
        console.log('x ',url_parts, path);
        console.log(__dirname);
       
        
        fs.readFile(__dirname + path, (err, data)=>{
            if(err){
                response.writeHead(400, {'Content-Type':'text/html'});
                response.write('Not found');
            }else{
                response.writeHead(200, {'Content-Type':'text/html'});
                response.write(data);
                console.log(url_parts);
            }
            response.end();
        });
    });

server.listen(3000)