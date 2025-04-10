import http from 'node:http';
import { readFileSync } from 'node:fs';

const PORT = process.env.PORT ?? 3000;

// imports JSONs
const cha1 = JSON.parse(readFileSync('./src/jsons/characters/1.JSON', 'utf-8'));

const processRequest = (req, res) => {
    const {method, url} = req;

    switch (method) {
        case 'GET':

            switch(url){
                case '/':
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    res.end('<h1> Bienvenido </h1> <a href="/character/1">personaje 1</a>');
                    break;
                case '/character/1':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8');
                    res.end(JSON.stringify(cha1));
                    break;
                
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    res.end('<h1> 404 </h1>');
            }
            break;
        
        case 'POST': 
            switch(url) {
                case '/character/':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8');
                    let body = '';
                }
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    res.end('<h1> 404 not found </h1>');

            
    }



}

const server = http.createServer(processRequest);

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}` );
});

