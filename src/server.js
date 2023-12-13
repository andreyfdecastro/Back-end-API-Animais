import express from 'express';
import { config } from 'dotenv';
import validateAnimal from './validateAnimal.js';

config();

const port = process.env.PORT || 5005;

const app = express();
app.use(express.json());

class Animal {
    constructor(id, nome, tipo, idade, cor, imagem, vacinado) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.idade = idade;
        this.cor = cor;
        this.imagem = imagem;
        this.vacinado = vacinado;
    }
}

let animais = [];

app.post('/animais', validateAnimal, (req, res) => {
    const animal = new Animal(
        animais.length + 1,
        req.body.nome,
        req.body.tipo,
        req.body.idade,
        req.body.cor,
        req.body.imagem,
        req.body.vacinado
    );
    animais.push(animal);
    res.json(animal);
});

app.get('/animais', (req, res) => {
    res.json(animais);
});

app.get('/animais/:id', (req, res) => {
    const animal = animais.find(a => a.id === parseInt(req.params.id));
    if (!animal) return res.status(404).send('Animal não encontrado.');
    res.json(animal);
});

app.put('/animais/:id', validateAnimal, (req, res) => {
    const animal = animais.find(a => a.id === parseInt(req.params.id));
    if (!animal) return res.status(404).send('Animal não encontrado.');
    animal.nome = req.body.nome;
    animal.tipo = req.body.tipo;
    animal.idade = req.body.idade;
    animal.cor = req.body.cor;
    animal.imagem = req.body.imagem;
    animal.vacinado = req.body.vacinado;
    res.json(animal);
});

app.delete('/animais/:id', (req, res) => {
    const index = animais.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Animal não encontrado.');
    const animal = animais.splice(index, 1);
    res.json(animal);
});

app.get('/', (req, res) => {
    return res.status(200).send({ message: 'O servidor está funfando' });
});

app.listen(port, () => console.log(`⚡ Server started on http://localhost:${port}`));