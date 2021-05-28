'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/beneficio-controller');

router.post('/',authService.isAdmin,controller.store);
router.get('/:id',authService.isAdmin,controller.show);
router.put('/:id',authService.isAdmin,controller.update);
router.get('/',authService.authorize,controller.index);
router.put('/:pessoaid/editbeneficios/:id',authService.isASS,controller.linkPessoa);
module.exports =router;