const router = require('express').Router();
const {User} = require('../models')

router.get('/', function(req, res) {
    res.render('register-login/home')
})

router.get('/home', function(req, res) {
    res.send('Ini halaman Home untuk menampilkan data produk yang sesuai MVP')
})

router.get('/login', function(req, res) {
    res.render('register-login/home')
})


router.get('/register', function(req, res) {
    res.render('register-login/register')
})

router.post('/register', function(req, res) {
    let newUser = {
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        email: req.body.email,
        role: 'netizen'
    }

    User.create(newUser)
    .then(dataUser => {
        console.log('======', dataUser)
        res.render('register-login/register_success')
    })
    .catch(err => {
        console.log(err)
    })
})



module.exports = router;