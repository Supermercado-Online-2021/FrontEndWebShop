
const express = require('express');

const renderView = require('../middleware/renderView');

const products = require('./products');
const user = require('./user');



const router = express.Router();

router.use(products);
router.use(user);

router.use(renderView);



module.exports = router;
