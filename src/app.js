'use strict'
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser'); 

require('./database');///importante erro de lenght
const app = express();
var cors = require('cors')
const router = express.Router();



//Carrega rota
const indexRoute =require('./routes/index-route');
const equipamentoRoute =require('./routes/equipamento-routes');
const beeneficioRoute =require('./routes/beneficio-routes');
const usuarioRoute =require('./routes/usuario-routes');
const permissaoRoute =require('./routes/permissao-routes');
const pessoaRoute =require('./routes/pessoa-routes');
const familiarRoute =require('./routes/familiar-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(cors());
app.use('/equipamento',equipamentoRoute);
app.use('/beneficio',beeneficioRoute);
app.use('/usuario',usuarioRoute);
app.use('/permissao',permissaoRoute);
app.use('/pessoa',pessoaRoute);
app.use('/familiar',familiarRoute);
module.exports =app;

