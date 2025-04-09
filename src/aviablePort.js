import net from 'node:net';

const aviablePort = (port) => {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        
        server.listen(port, () => {
            const { port: assignedPort } = server.address();
            server.close(() => {
                resolve(port);
            })
        })
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log(`Port ${port} is already in use...  trying next port`);
                aviablePort(0).then((nextPort) => resolve(nextPort))
            } else {
                reject(err);
            }
        })
    })
}

export default aviablePort