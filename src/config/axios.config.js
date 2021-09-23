
const axios = require('axios');



module.exports = axios.create({
    baseURL: process.env.URL_API
});
