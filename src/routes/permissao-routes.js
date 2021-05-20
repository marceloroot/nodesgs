'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/permissao-controller');


router.get('/',controller.index);
router.put('/:userid/editpermissao/:id',controller.linkPermissao);

module.exports =router;