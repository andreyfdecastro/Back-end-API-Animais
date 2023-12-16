import express from 'express';
import validateAnimal from '../controllers/validateAnimal.js';
import Animal from '../models/Animal.js';

const router = express.Router();

const animais = [];

router.post('/', validateAnimal, (req, res) => {
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

router.get('/', (req, res) => {
    res.json(animais);
});

router.get('/:id', (req, res) => {
    const animal = animais.find(a => a.id === parseInt(req.params.id));
    if (!animal) return res.status(404).send('Animal não encontrado.');
    res.json(animal);
});

router.put('/:id', validateAnimal, (req, res) => {
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
router.patch('/:id', validateAnimal, (req, res) => {
    const id = parseInt(req.params.id);
    const animal = animais.find(a => a.id === id);

    if (!animal) return res.status(404).send('Animal não encontrado.');

    for (let key in req.body) {
        if (animal.hasOwnProperty(key)) {
            animal[key] = req.body[key];
        } else {
            return res.status(400).send(`Campo inválido: ${key}`);
        }
    }

    res.json(animal);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = animais.findIndex(animal => animal.id === id);

    if (index === -1) {
        return res.status(404).send('Animal não encontrado');
    }
    const animal = animais.splice(index, 1);
    res.send(animal);
});

router.delete('/', (req, res) => {
    animais.length = 0;
    res.send('Todos os animais foram deletados');
});

export default router;