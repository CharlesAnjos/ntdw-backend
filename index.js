const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const premioroutes = require('./routes/premioroutes');
const etaparoutes = require('./routes/etaparoutes');
const pessoaroutes = require('./routes/pessoaroutes');
const autorroutes = require('./routes/autorroutes');
const avaliadorroutes = require('./routes/avaliadorroutes');
const projetoroutes = require('./routes/projetoroutes');
const avaliacaoroutes = require('./routes/avaliacaoroutes');
const consultasroutes = require('./routes/consultasroutes');

mongoose.set('strictQuery', false);
const mongoString = "mongodb://localhost:27017/backend-ntdw"
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());
//done
app.use('/premio', premioroutes);
app.use('/etapa', etaparoutes);
app.use('/pessoa', pessoaroutes);
app.use('/autor', autorroutes);
app.use('/avaliador', avaliadorroutes);
app.use('/projeto', projetoroutes);
app.use('/avaliacao', avaliacaoroutes);
app.use('/consultas', consultasroutes);
//doing
//to do
// - consultas customizadas
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
})

