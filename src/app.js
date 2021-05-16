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
const enderecoRoute =require('./routes/endereco-routes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(cors());
app.use('/endereco',enderecoRoute);

module.exports =app;

