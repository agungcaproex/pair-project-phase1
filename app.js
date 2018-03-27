const express = require('express')
const bodyParser = require('body-parser')
const index = require('./routes')

const app = express()
const port = 3000



app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/', index)

app.listen(port, log => {
    console.log(`Apps is running on port "${port}"`)
})