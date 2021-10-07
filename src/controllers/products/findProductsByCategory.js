
const axios = require('../../config/axios.config.js');



async function findProductsByCategory( req, res, next ) {
    try {
        const { id } = req.params;
        const { page, limit } = req.query;

        const { data } = await axios.get(`/products/category/${id}`, {
            params: {
                fields: [ 'id', 'nome', 'preco', 'image_src' ],
                page, limit: limit || 30
            }
        });

        res.locals = { 
            view: 'listProducts', 
            title: "Produtos da categoria",
            baseUrl: `/products/category/${id}?`,
            ...data 
        };

        next();
    }catch(err) {
        return res.status(500).json(err);
    }
}

module.exports = findProductsByCategory;
