'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/usuario-controller');

router.post('/',controller.store);
router.put('/:id',controller.update);
router.post('/authenticate',controller.autenticar);
router.get('/:id',controller.show);
module.exports =router;