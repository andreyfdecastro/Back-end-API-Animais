function validateAnimal(req, res, next) {
    if (!req.body.nome || !req.body.tipo || !req.body.idade || !req.body.cor || !req.body.imagem || req.body.vacinado === undefined) {
        return res.status(400).send('Os campos id, nome, tipo, idade, cor, imagem e vacinado são obrigatórios.');
    }

    next();
}

export default validateAnimal;