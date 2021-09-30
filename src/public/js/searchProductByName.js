
import debounceEvent from '/public/js/eventDebounce.js';

const inputProductName = document.querySelector('#input-product-name');
const sugestionProducts = document.querySelector('.sugestion-products');



const url_api = 'http://localhost:3000/api'

const clearSegestionProducts = () => sugestionProducts.innerHTML = '';

const searchProductByName = async (name) => {
    if(name.length >= 3) {
        const { data } = await axios.get( `${url_api}/products/name/${name}`, {
            params: {
                limit: 5,
                fields: [ 'id', 'nome' ]
            }
        });

        return data
    }
}

const renderProductsName = ( term, products ) => {

    products.forEach( ({ id, nome }) => {
        const name =  nome.toUpperCase().replaceAll( term, `<span>${term}</span>` );

        const li = document.createElement('li');
        li.innerHTML = `<a href="/product/${id}">${name}</a>`;

        sugestionProducts.appendChild(li);
    });
}

const inputProductNameEvent = async (event) => {
    clearSegestionProducts();
    
    const { value } = event.target;

    const data = await searchProductByName(value);
    if(data)
        renderProductsName(data.term.toUpperCase(), data.data);
};



inputProductName.addEventListener( 'keyup', debounceEvent(inputProductNameEvent) );
inputProductName.addEventListener( 'click', inputProductNameEvent );

inputProductName.addEventListener( 'blur', debounceEvent(clearSegestionProducts) );
