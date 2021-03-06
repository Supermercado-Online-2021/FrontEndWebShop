
require('dotenv').config();

const path = require('path');

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');


const app = express();

const routes = require('./src/routes');



app.use('/public', express.static(path.join(__dirname, './src/public')));

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use(cookieParser());

app.use(expressLayouts);
app.set('layout', './layouts/main');

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(routes);



const PORT = process.env.PORT || 8080;
app.listen( PORT, () => {
    console.log(`Servidor aberto na porta ${PORT}`);
});
