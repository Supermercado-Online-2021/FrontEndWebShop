
const express = require('express');

const productsController = require('../controllers/products');



const router = express.Router();

router.get( '/', productsController.findProductsSlideCategory );
router.get( '/products', productsController.findProducts );



module.exports = router
