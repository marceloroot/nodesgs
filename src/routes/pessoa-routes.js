'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/pessoa-controller');

router.post('/',authService.authorize,controller.store);
router.put('/:id',authService.authorize,controller.update);
router.get('/:id',authService.authorize,controller.show);
router.get('/',authService.authorize,controller.index)
router.get('/showbeneficios/:id',authService.isASS,controller.showBeneficios)
module.exports =router;