import express from 'express';
import { config } from 'dotenv';
import animaisRouter from './routes/animais.js';

config();

const port = process.env.PORT || 5005;

const app = express();
app.use(express.json());

app.use('/animais', animaisRouter);

app.get('/', (req, res) => {
    return res.status(200).send({ message: 'O servidor está funfando' });
});

function validURL(str) {
    try {
        new URL(str);
        return true;
    } catch (_) {
        return false;
    }
}

function validateAnimal(req, res, next) {
    if (!req.body.nome || req.body.nome.length < 3 || req.body.nome.length > 50) {
        return res.status(400).send('O nome do animal deve ter no mínimo 3 caracteres e no máximo 50 caracteres.');
    }

    if (!req.body.tipo || req.body.tipo.length > 30) {
        return res.status(400).send('O tipo do animal deve ter o máximo 30 caracteres.');
    }

    if (!req.body.idade || !Number.isInteger(req.body.idade) || req.body.idade < 0) {
        return res.status(400).send('A idade deve ser um número inteiro positivo.');
    }

    if (!req.body.cor || req.body.cor.length > 20) {
        return res.status(400).send('A cor do animal deve ter 20 caracteres.');
    }

    if (req.body.vacinado === undefined || typeof req.body.vacinado !== 'boolean') {
        return res.status(400).send('Vacinado ou não');
    }

    if (!req.body.imagem || !validURL(req.body.imagem)) {
        return res.status(400).send('A imagem do animal deve ser uma URL válida.');
    }

    next();
}

app.listen(port, () => console.log(`⚡ Server started on http://localhost:${port}`));