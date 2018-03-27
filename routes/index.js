const router = require('express').Router();

router.get('/', function(req, res) {
    res.send('Ini halaman Dashboard Pair Project')
})

router.get('/home', function(req, res) {
    res.send('Ini halaman Home untuk menampilkan data produk yang sesuai MVP')
})

router.get('/login', function(req, res) {
    res.send('Halaman Login')
})

router.get('/register', function(req, res) {
    res.send('Halaman daftar Netijen')
})



module.exports = router;