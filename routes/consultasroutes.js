const express = require('express');
const router = express.Router();
const Autor = require("../models/Autor");
const Projeto = require("../models/Projeto");
const Pessoa = require("../models/Pessoa");
const Premio = require("../models/Premio");
const Avaliacao = require("../models/Avaliacao");
const Avaliador = require("../models/Avaliador");


module.exports = router;

router.get('/projetosautores', async (req, res) => {
    const projetos = await getProjetosAutores();
    try {
        res.send(projetos).json
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/autoresprojetos', async (req, res) => {
    const autores = await getAutoresProjetos();
    try {
        res.send(autores).json
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/projetosnaoavaliados', async (req, res) => {
    try {
        const projetos = await getProjetosNaoAvaliados();
        res.send(projetos).json;
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/projetosavaliados', async (req, res) => {
    try {
        const projetos = await getProjetosAvaliados();
        res.send(projetos).json;
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/consultar/:id', async (req, res) => {
    try {
        var autor = "";
        const id = req.params.id;
        const data = await Autor.findById(id);
        autor+=`\n Autor: ${data.pessoa} (${data._id})`;
        autor+=`\n    Registro: ${data.registro}`;
        autor+=`\n    Área: ${data.area}`;
        res.send(autor);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

async function getProjetosNaoAvaliados(){
    var projetos = null;
    try {
        projetos = await Projeto.aggregate([
            {
                $lookup: {
                    from: Avaliacao.collection.name,
                    localField: '_id',
                    foreignField: 'projeto',
                    as: 'avaliacao'
                }
            },
            {
                $match: {"avaliacao":[]}
            },{
                $lookup: {
                    from: Premio.collection.name,
                    localField: 'premio',
                    foreignField: '_id',
                    as: 'premio'
                }
            },
            {
                $unwind: "$premio"
            },{
                $lookup: {
                    from: Autor.collection.name,
                    localField: 'autores',
                    foreignField: '_id',
                    as: 'autores'
                }
            },
            {
                $unwind: "$autores"
            },
            {
                $lookup: {
                    from: Pessoa.collection.name,
                    localField: 'autores.pessoa',
                    foreignField: '_id',
                    as: 'autores.pessoa'
                },
            },
            {
                $unwind: "$autores.pessoa"
            },
        ]);
    }
    catch (error) {
        console.log(error);
    }
    return projetos;
};

async function getProjetosAvaliados(){
    var projetos = null;
    try {
        projetos = await Projeto.aggregate([
            {
                $lookup: {
                    from: Avaliacao.collection.name,
                    localField: '_id',
                    foreignField: 'projeto',
                    as: 'avaliacao'
                }
            },
            {
                $unwind: "$avaliacao"
            },{
                $lookup: {
                    from: Premio.collection.name,
                    localField: 'premio',
                    foreignField: '_id',
                    as: 'premio'
                }
            },
            {
                $unwind: "$premio"
            },{
                $lookup: {
                    from: Autor.collection.name,
                    localField: 'autores',
                    foreignField: '_id',
                    as: 'autores'
                }
            },
            {
                $unwind: "$autores"
            },
            {
                $lookup: {
                    from: Pessoa.collection.name,
                    localField: 'autores.pessoa',
                    foreignField: '_id',
                    as: 'autores.pessoa'
                },
            },
            {
                $unwind: "$autores.pessoa"
            },{
                $lookup: {
                    from: Avaliador.collection.name,
                    localField: 'avaliacao.avaliador',
                    foreignField: '_id',
                    as: 'avaliacao.avaliador'
                }
            },
            {
                $unwind: "$avaliacao.avaliador"
            },{
                $lookup: {
                    from: Pessoa.collection.name,
                    localField: 'avaliacao.avaliador.pessoa',
                    foreignField: '_id',
                    as: 'avaliacao.avaliador.pessoa'
                },
            },
            {
                $unwind: "$avaliacao.avaliador.pessoa"
            },
        ]);
    }
    catch (error) {
        console.log(error);
    }
    return projetos;
};

async function getProjetosAutores(){
    var projetos = null;
    try {
        projetos = await Projeto.aggregate([
            {
                $lookup: {
                    from: Premio.collection.name,
                    localField: 'premio',
                    foreignField: '_id',
                    as: 'premio'
                }
            },
            {
                $unwind: "$premio"
            },{
                $lookup: {
                    from: Autor.collection.name,
                    localField: 'autores',
                    foreignField: '_id',
                    as: 'autores'
                }
            },
            {
                $unwind: "$autores"
            },
            {
                $lookup: {
                    from: Pessoa.collection.name,
                    localField: 'autores.pessoa',
                    foreignField: '_id',
                    as: 'autores.pessoa'
                },
            },
            {
                $unwind: "$autores.pessoa"
            },
        ]);
    }
    catch (error) {
        console.log(error);
    }
    return projetos;
};

async function getAutoresProjetos(){
    var autores = null;
    try {
        autores = await Autor.aggregate([
            {
                $lookup: {
                    from: Pessoa.collection.name,
                    localField: 'pessoa',
                    foreignField: '_id',
                    as: 'pessoa'
                },
            },
            {
                $unwind: "$pessoa"
            },
            {
                $lookup: {
                    from: Projeto.collection.name,
                    localField: '_id',
                    foreignField: 'autores',
                    as: 'projetosAutor'
                }
            },
            {
                $unwind: "$projetosAutor"
            }
        ]);
    }
    catch (error) {
        console.log(error);
    }
    return autores;
};