'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/familiar-controller');

router.post('/:idchefe',controller.store);
router.put('/:id/chefe/:idchefe',controller.update);
module.exports =router;