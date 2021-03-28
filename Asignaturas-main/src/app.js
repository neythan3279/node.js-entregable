// Comentario
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hbs = require('hbs');
// var exphbs = require('express-handlebars');
require('./helpers/helper');

const path = require('path');
const morgan = require('morgan')

// Configuraciones
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));

// const help = path.join(__dirname, '/helpers');
// hbs.registerHelper(help);
const directoriopartials = path.join(__dirname, '/views/partials');
hbs.registerPartials(directoriopartials);

app.set('view engine', 'hbs');

// app.engine('hbs', exphbs({
//     extname: 'hbs',
//     defaultLayout: 'index',
//     partialsDir: path.join(__dirname, '/views/partials'),
//     layoutsDir: path.join(__dirname, '/views/layouts'),
//     helpers: require('./helpers/helper')
//         // helpers: require('./config/handlebars-helpers') //only need this
// }));

// Paginas
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use(require('./routes/index'));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler
app.use((req, res, next) => {
    res.status(404).send('Error 404 pagina no encontrada ');
});

module.exports = app