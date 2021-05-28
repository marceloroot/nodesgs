'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/equipamento-controller');

router.post('/',authService.isASS,controller.store);
router.get('/:id',authService.isASS,controller.show);
router.put('/:id',authService.isASS,controller.update);
router.get('/',authService.isASS,controller.index);
module.exports =router;