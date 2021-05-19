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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(cors());
app.use('/equipamento',equipamentoRoute);

module.exports =app;

