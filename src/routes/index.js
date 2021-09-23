
const express = require('express');
const axios = require('./../config/axios.config');



const router = express.Router();

const getProductByCategory = async (id) => 
    axios.get(`/products/category/${id}`, {
        params: { 
            limit: 7,
            fields: [ 'nome', 'preco', 'image_src' ]
        }
    })

const categoryWithProducts = category => new Promise( async (resolve, reject ) => {
    try{
        const responseAxios = await getProductByCategory(category.id);
        const products = responseAxios.data;
        
        return resolve({
            ...category,
            products
        });
    } catch(err) {
        return reject( `Não foi possível carregar os produtos, ${err}` );
    }   
})

router.get( '/', async ( req, res ) => {
    const { data } = await axios.get('/categories');

    const categories = await Promise
        .all( data.map( (category) => categoryWithProducts(category) ) )

    return res.render( 'index', { 
        title: 'Supermercado Online',
        categories: categories.filter( category => category.products.data.length > 0 )
    });
});



module.exports = router;
