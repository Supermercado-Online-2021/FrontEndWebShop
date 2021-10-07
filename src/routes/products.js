
const express = require('express');

const productsController = require('../controllers/products');



const router = express.Router();

router.get( '/', productsController.findProductsSlideCategory );
router.get( '/products', productsController.findProducts );
router.get( '/products/name', productsController.findProductsByName );
router.get( '/products/category/:id', productsController.findProductsByCategory );



module.exports = router
