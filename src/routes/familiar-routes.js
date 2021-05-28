'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/familiar-controller');

router.post('/:idchefe',authService.authorize,controller.store);
router.put('/:id/chefe/:idchefe',authService.authorize,controller.update);
router.get('/:id',authService.authorize,controller.index);
router.get('/show/:id',authService.authorize,controller.show);
module.exports =router;