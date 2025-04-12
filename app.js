import express from 'express';
import { readFileSync } from 'node:fs';

const app = express();
const PORT = process.env.PORT ?? 3000;

// imports JSONs
const cha1 = JSON.parse(readFileSync('./src/jsons/characters/1.json', 'utf-8'));


app.disable('x-powered-by'); // desactiva el header x-powered-by

app.get('/', (req, res) => {
    res.status(200).send('<h1> Con express </h1>');//express automaticamente detecta el content type
})

app.get('/character/1', (req, res) => {
    res.status(200).json(cha1);
});


app.post('/character', (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const data = JSON.parse(body);
        //base de datos
        res.status(201).json(data);
    }); 
});

app.use((req, res) => {
    res.status(404).send('<h1> 404 no encontrado</h1>');
});

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});