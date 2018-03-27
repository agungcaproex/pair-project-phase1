const router = require('express').Router();

router.get('/', function(req, res) {
    res.send('Ini halaman Product Minimarket beserta CRUD')
})

module.exports = router;