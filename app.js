const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./routes');
const productRouter = require('./routes/product');
const minimarketRouter = require('./routes/minimarket');
const prodMinimarketRouter = require('./routes/product-minimarket'); // price

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/products', productRouter);
app.use('/minimarkets', minimarketRouter);
app.use('/productminimarkets', prodMinimarketRouter); // price


app.listen(port, log => {
    console.log(`Apps is running on port "${port}"`)
})