const router = require('express').Router();

router.get('/', function(req, res) {
    res.send('Ini halaman Minimarket beserta CRUD')
})

module.exports = router;