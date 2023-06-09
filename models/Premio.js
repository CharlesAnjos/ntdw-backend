const mongoose = require('mongoose');
const Etapa = require('./Etapa');

const PremioSchema = new mongoose.Schema({
    nome: {
        required: true,
        type: String
    },
    descricao: {
        required: true,
        type: String
    },
    ano: {
        required: true,
        type: String
    },
    cronograma: [{
        required: true,
        type: mongoose.Schema.ObjectId,
        ref: "Etapa"
    }],
    dataInicio: {
        required: true,
        type: String
    },
    dataFim: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Premio', PremioSchema)