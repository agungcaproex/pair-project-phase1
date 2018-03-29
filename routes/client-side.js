const router = require('express').Router();
const {ProductMinimarket, Product, Minimarket, Sequelize} = require('../models/index');

router.get('/beranda', function(req, res) {
    res.render('./client-side/beranda.ejs')
})

router.get('/searchbyproduct', function(req, res) {
    Product.findAll()
    .then(data => {
        let obj = {data:data};
        res.render('./client-side/search-product.ejs', obj)
        // res.send(data)
    })
})

router.post('/findproduct', function(req, res) {
    Product.findOne({
        where: { id: req.body.productID }
    })
    .then(data => {
        let obj = {data:data};
        res.redirect(`/findproduct/${data.id}`)
    })
})

router.get('/findproduct/:id', function(req, res) {
    Product.findAll()
    .then(data => {
        ProductMinimarket.findAll({
            where: { ProductId:req.params.id },
            include: [Product, Minimarket],
            order: [['price', 'ASC']]
        })
        .then(dataProduct => {
            let obj = {
                data:data,
                dataProduct: dataProduct
            };
            res.render('./client-side/product/product-list.ejs', obj)
        })
    })
})

router.get('/searchbyminimarket', function(req, res) {
    Minimarket.findAll()
    .then(data => {
        let obj = {data:data};
        res.render('./client-side/search-minimarket.ejs', obj)
        // res.send(data)
    })
})


router.post('/findminimarket', function(req, res) {
    Minimarket.findOne({
        where: { id: req.body.minimarketID }
    })
    .then(data => {
        let obj = {data:data};
        res.redirect(`/findminimarket/${data.id}`)
    })
})

router.get('/findminimarket/:id', function(req, res) {
    Minimarket.findAll()
    .then(data => {
        ProductMinimarket.findAll({
            where: { MinimarketId: req.params.id},
            include: [Product, Minimarket],
            order: [['price', 'ASC']]
        })
        .then(dataProduct => {
            let obj = {
                dataProduct: dataProduct,
                data: data
            };
            res.render('./client-side/minimarket/minimarket-list.ejs', obj)
        })
        // res.send(data)
    })
})



// router.get('/vendor', function(req, res) {
//     res.render('./client-side/vendor.ejs')
// })

// router.get('/searchpage', function() {
//     res.render('./client-side/searchpage.ejs')
// })

module.exports = router;