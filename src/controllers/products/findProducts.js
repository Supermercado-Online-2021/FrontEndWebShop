
const axios = require('../../config/axios.config');



async function findProducts( req, res ) {
    const { page, limit } = req.query;

    const {data} = await axios.get( '/products', {
        params: {
            fields: [ 'nome', 'preco', 'image_src' ],
            page, limit: limit || 30
        }
    });
    
    return res.render( 'listProducts', {
        title: 'Produtos',
        ...data
    });
}

module.exports = findProducts;
