import http from 'node:http';
import aviablePort from './src/aviablePort.js';
import fs from 'node:fs';

const lookingPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
    if(req.url === '/'){
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('<h1> Bienvenido a mi página de inicio</h1> <a href="/contacto">Contacto</a>');
    
    } else if (req.url === '/contacto'){
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('<h1>contacto</h1> <a href="/">Inicio</a>');
    }
    else if(req.url === '/img'){
        fs.readFile('./src/tts.png', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.end('<h1> 500 something happend</h1>');
                return;
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'image/png');
                res.end(data);
            }
        })
        res.setHeader('Content-Type', 'image/png');
        
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('<h1> 404 </h1>');
    }
}

const server = http.createServer(processRequest);

aviablePort(lookingPort).then(port => {
    server.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}` );
    });
})
