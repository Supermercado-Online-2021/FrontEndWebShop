
const axios = require('../config/axios.config');



async function renderView( req, res ) {
    const { token } = req.cookies;
    const { view, ...data } = res.locals;

    try {
        let { data:logged } = await axios.post('/user/logged', {}, { headers: { token: (token||'') } });

        if(logged.status === 401 ) {
            logged = { auth: false }
        }

        return res.render( view, {
            ...data,
            ...logged,
            header: data.header === false ? false: true,
        });
    } catch(err) {
        return res.status(500).json(err);
    }
}

module.exports = renderView;
