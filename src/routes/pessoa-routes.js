'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/pessoa-controller');

router.post('/',controller.store);
router.put('/:id',controller.update);
router.get('/:id',controller.show);
router.get('/',controller.index)
module.exports =router;