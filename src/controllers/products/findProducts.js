
const axios = require('../../config/axios.config');



async function findProducts( req, res, next ) {
    const { page, limit } = req.query;
    const { token } = req.cookies;

    const {data} = await axios.get( '/products', {
        headers: {
            token
        },
        params: {
            fields: [ 'id', 'nome', 'preco', 'image_src' ],
            page, limit: limit || 30
        }
    });

    res.locals = { 
        view:'listProducts', 
        title: 'Produtos',
        baseUrl: '/products?',
        ...data
    };

    return next();
}

module.exports = findProducts;
