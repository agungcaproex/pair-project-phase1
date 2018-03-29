const express               = require('express');
const bodyParser            = require('body-parser');
const indexRouter           = require('./routes');
const productRouter         = require('./routes/product');
const minimarketRouter      = require('./routes/minimarket');
const prodMinimarketRouter  = require('./routes/product-minimarket'); // price
const clientRouter          = require('./routes/client-side');
const session               = require('express-session');
const checkAdmin            = require('./middleware/authAdmin');
const checkNetizen          = require('./middleware/authNetizen')

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.locals.helper = require('./helpers/helper')

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'hacktiv8',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/', indexRouter);
app.use('/', checkNetizen, clientRouter);
app.use('/products', checkAdmin, productRouter);
app.use('/minimarkets', checkAdmin, minimarketRouter);
app.use('/productminimarkets', checkAdmin, prodMinimarketRouter); // price


app.listen(port, log => {
    console.log(`Apps is running on port "${port}"`)
})