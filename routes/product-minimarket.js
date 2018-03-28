const router = require('express').Router();
const {ProductMinimarket,Product, Minimarket} = require('../models/index');
const Op = require('sequelize').Op

router.get('/', function(req, res) {
    Product.findAll({
        include: [Minimarket]
    })
    .then(dataProduct => {
        let obj = {
            dataProduct: dataProduct
        };
        res.render('./productminimarket/choose-product.ejs', obj)
        // res.send(dataProduct)
    })
})

// router.get('/chooseProduct', function(req, res) {
//     Product.findAll({
//         include: [Minimarket]
//     })
//     .then(dataProduct => {
//         let obj = {
//             dataProduct: dataProduct
//         };
//         res.render('./productminimarket/choose-product.ejs', obj)
//         // res.send(dataProduct)
//     })
// })

router.get('/:id/addminimarket', function(req, res) {
    Product.findOne({
        where: { id: req.params.id }
    })
    .then(dataProduct => {
        ProductMinimarket.findAll({
            where: {ProductId:req.params.id}
        })
        .then(availableMinimarket => {
            var arr = [];
            for(let i=0; i<availableMinimarket.length; i++) {
                arr.push(availableMinimarket[i].MinimarketId)
            }
            // res.send(arr)
            Minimarket.findAll({
                where: {
                    id: {
                        [Op.notIn]: arr
                    }
                }
            })
            .then(dataMinimarket => {
                let obj = {
                    dataMinimarket: dataMinimarket,
                    dataProduct: dataProduct
                };
                res.render('./productminimarket/add-minimarket.ejs', obj)
            })
        })
    })
})

// router.get('/add', function(req, res) {
//     Product.findAll()
//     .then(dataProduct => {
//         Minimarket.findAll()
//         .then(dataMinimarket => {
//             let obj = {
//                 dataMinimarket: dataMinimarket,
//                 dataProduct: dataProduct
//             };
//             res.render('./productminimarket/add-productminimarket.ejs', obj)
//         })
//     })
// })

router.post('/add', function(req, res) {
    ProductMinimarket.create({
        ProductId: req.body.product,
        MinimarketId: req.body.minimarket,
        price: req.body.price
    })
    .then(() => {
        res.redirect('/productminimarkets')
    })
})

router.get('/edit/:id', function(req, res) {
    ProductMinimarket.findOne({
        include: [Product, Minimarket],
        where: { id:req.params.id }
    })
    .then(dataProductMinimarket => {
        let obj = {
            dataProductMinimarket: dataProductMinimarket
        };
        res.render('./productminimarket/edit-productminimarket.ejs', obj)
    })
})

module.exports = router;