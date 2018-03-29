const router = require('express').Router();
const {User} = require('../models')
const checkAdmin = require('../middleware/authAdmin')
const users = require('./user')

router.get('/', function(req, res) {
    res.render('register-login/index')
})

router.get('/home', checkAdmin, function(req, res) {
    res.render('home')
})


router.get('/login', function(req, res) {
    res.render('register-login/index')
})

router.post('/login', function(req, res) {
    // res.render('register-login/home')
    // res.send(req.session)
    User.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    })
    .then(dataUser => {
        if(dataUser){
            req.session.userid = dataUser.id
            req.session.username = dataUser.username
            req.session.role = dataUser.role

            if(req.session.role == 'admin'){
                res.redirect('/home')
            }
            else if(req.session.role == 'netizen'){
                // res.redirect('/productminimarkets')
                res.send(req.session)
            }
        }
        else{
            res.redirect('/login')
        }
    })
    .catch(err => {
        console.log(err)
    })
})


router.get('/register', function(req, res) {
    let error = ""
    if(req.query.error != ""){
        error = req.query.error
    }
    res.render('register-login/register', {error: error})
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
        // console.log(err)
        res.redirect(`/register?error=${err.message}`)
    })
})


router.get('/logout', (req, res) => {
    req.session.destroy(err=>{
        res.redirect('/')
    })
})

router.use('/users',checkAdmin, users)

module.exports = router;