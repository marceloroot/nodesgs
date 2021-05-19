'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/beneficio-controller');

router.post('/',controller.store);
router.get('/:id',controller.show);
router.put('/:id',controller.update);
router.get('/',controller.index);
module.exports =router;