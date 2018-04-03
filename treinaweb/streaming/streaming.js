
const fs    = require('fs'),
      http  = require('http'),
      url   = require('url'),
      path  = require('path');
      

http.createServer((request, response)=>{
    if(request.url !== '/movie.mp4'){
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end('<video src="http://localhost:3000/movie.mp4" controls></video>')
    }else{
        let file = path.resolve(__dirname, 'movie.mp4');
        let range = request.headers.range;
        let positions = range.replace('/bytes=/','').split('-');
        let start = parseInt(positions[0], 10);

        fs.stat(file, (err, stats)=>{
            let total = stats.size;
            let end = positions[1] ? parseInt(positions[1], 10) : total -1;
            let chunksize = (end - start) + 1;

            response.writeHead(200, {
                'Content-Range':`bytes${start}-${end}/${total}`,
                'Accept-Ranges':'bytes',
                'Content-Length':chunksize,
                'Content-Type':'video/mp4'
            });

            var stream = fs.createReadStream(file,{start: start, end: end})
            .on('open',()=>{
                stream.pipe(response);
            })
            .on('error',(err)=>{
                response.end(err);
            });
        });
    }
}).listen(3000);    