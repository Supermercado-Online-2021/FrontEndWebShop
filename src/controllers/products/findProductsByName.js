
const axios = require('../../config/axios.config');



async function findProductsByName( req, res, next ) {
    const { page, limit, name } = req.query;
    const { token } = req.cookies;

    const {data} = await axios.get( `/products/name/${name}`, {
        headers: { token },
        params: {
            fields: [ 'id', 'nome', 'preco', 'image_src' ],
            page, limit: limit || 30
        }
    });
    
    res.locals = { 
        ...res.locals,
        view: 'listProducts',
        title: `Resultados para "${data.term}"`,
        baseUrl: `/products/name?name=${name}&`,
        ...data
    };

    next();
}

module.exports = findProductsByName;
