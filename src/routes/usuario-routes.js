'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/usuario-controller');

router.post('/',controller.store);
router.put('/:id',controller.update);
router.post('/authenticate',controller.autenticar);
router.get('/:id',controller.show);
router.get('/usuariocompermissao/:id',controller.showPermissao);
router.get('/',controller.index);
router.put('/mudastatus/:id',controller.mudastatus);
module.exports =router;