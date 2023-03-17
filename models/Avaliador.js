const mongoose = require('mongoose');
const Pessoa = require('./Pessoa');

const AvaliadorSchema = new mongoose.Schema({
    pessoa: {
        required: true,
        type: Pessoa
    },
    registro: {
        required: true,
        type: String
    },
    area: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Avaliador', AvaliadorSchema)