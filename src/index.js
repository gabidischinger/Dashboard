const express = require('express');
const fs = require('fs');
const chart = require('chart.js')

const app = express();

app.use(express.static('public'));

app.get('/api/heroes', (_, res) => {
    fs.readFile('data/heroes.json', (err, data) => {
        if (err) {
            res.statusCode = 500;
            return res.end('houve um erro inesperado...');
        }
        else {
            res.statusCode = 200;
            return res.end(data);
        }
    });
});

app.listen('8080', () => console.info('listening on http://localhost:8080/'));