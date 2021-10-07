
const axios = require('../../config/axios.config');



const getProductByCategory = async (id, token) => 
    axios.get(`/products/category/${id}`, {
        headers: {
            token
        },
        params: { 
            limit: 8,
            fields: [ 'id', 'nome', 'preco', 'image_src' ]
        }
    })

const categoryWithProducts = (category, token) => new Promise( async (resolve, reject ) => {
    try{
        const responseAxios = await getProductByCategory(category.id, token);
        const products = responseAxios.data;
        
        return resolve({
            ...category,
            products
        });
    } catch(err) {
        return reject( `Não foi possível carregar os produtos, ${err}` );
    }   
})

async function findProductsSlideCategory( req, res, next ) {
    try{
        const { token } = req.cookies;
        const { data } = await axios.get('/categories');

        const categories = await Promise
            .all( data.map( (category) => categoryWithProducts(category, (token || "") ) ) )

        res.locals = {
            view: 'index', 
            title: 'Supermercado Online',
            categories: categories.filter( category => category.products.data.length > 0 ),
        };
        
        next();
    } catch(err) {
        return res.status(500).send(err);
    }
};



module.exports = findProductsSlideCategory
