'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/entrega-controller');

router.post('/:id',authService.isASS,controller.store);
router.get('/show/:id',authService.isASS,controller.show);
router.get('/:id',authService.isASS,controller.index);
router.put('/:id',authService.isASS,controller.mudastatus);
module.exports =router;