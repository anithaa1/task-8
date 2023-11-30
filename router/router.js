const express = require('express');
const router = express.Router();
const Controller = require('../controller/controller');

//ROUTING
router.use("/public", Controller);

module.exports = router;