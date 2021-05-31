'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/entrega-controller');

router.post('/:id',authService.authorize,controller.store);
router.get('/:id',authService.authorize,controller.index);

module.exports =router;