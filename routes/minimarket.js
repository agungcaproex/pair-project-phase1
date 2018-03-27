const router = require('express').Router();
const {Minimarket} = require('../models/index');

router.get('/', function(req, res) {
    Minimarket.findAll()
    .then(dataMinimarket => { 
        let obj = {
            dataMinimarket : dataMinimarket
        };
        res.render('./minimarket/minimarket.ejs', obj)
    })
})

router.get('/add', function(req, res) {
    let obj = {};
    res.render('./minimarket/add-minimarket.ejs', obj)
})

router.post('/add', function(req, res) {
    Minimarket.create({
        name: req.body.name,
        address: req.body.address,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(row => {
        res.redirect('/minimarkets');
    })
})

router.get('/edit/:id', function(req, res) {
    Minimarket.findById(req.params.id)
    .then(dataMinimarket => {
        let obj = {
            data: dataMinimarket
        };
        res.render('./minimarket/edit-minimarket.ejs', obj)
    })
})

router.post('/edit/:id', function(req, res) {
    Minimarket.update({
        name: req.body.name,
        address: req.body.address,
        createdAt: new Date()
    }, {
        where: { id:req.params.id }
    })
    .then(() => {
        res.redirect('/minimarkets')
    })
})

router.get('/delete/:id', function(req, res) {
    Minimarket.destroy({
        where: { id:req.params.id }
    }).
    then(() => {
        res.redirect('/minimarkets')
    })
})

module.exports = router;