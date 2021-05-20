'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/pessoa-controller');

router.post('/',controller.store);

module.exports =router;