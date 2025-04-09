import http from 'node:http';
import aviablePort from './src/aviablePort.js';

const lookingPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
    console.log('request received', req.url);
    res.end('Hello World!');
});



aviablePort(lookingPort).then(port => {
    server.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}` );
    });
})
