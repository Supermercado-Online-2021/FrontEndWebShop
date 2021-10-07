
const url_api = "http://localhost:3000/api";



const onClickProduct = async ({ target }) => {
    const { product_id } = target.dataset;
    console.log(product_id);
    
    try {
        const favorite = await axios.post( 
            `${url_api}/favorites/product/${product_id}`, 
            {}, 
            { headers: { token: localStorage.getItem('token') }}
        );

        console.log(favorite)

        if(favorite.status === 200) {
            target.classList.toggle('favorited');
        } else if(favorite.status === 401 ) {
            alert('Sua sessão expirou.');
            window.location.href= "/signin";
        }
    } catch(err) {
        alert('Sua sessão expirou.');
        window.location.href= "/signin";
    }
}



const products = document.querySelectorAll('div.favorite-product > i');

products.forEach( product => {
    product.addEventListener( 'click', onClickProduct );
});
