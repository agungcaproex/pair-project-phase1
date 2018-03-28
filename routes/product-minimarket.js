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

router.get('/:id/addprice', function(req, res) {
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
                    notif: req.query.err,
                    dataMinimarket: dataMinimarket,
                    dataProduct: dataProduct
                };
                res.render('./productminimarket/add-minimarket.ejs', obj)
            })
        })
    })
})

router.post('/:id/addprice', function(req, res) {
    ProductMinimarket.create({
        ProductId: req.params.id,
        MinimarketId: req.body.minimarket,
        price: Number(req.body.price)
    })
    .then(() => {
        res.redirect('/productminimarkets')
    })
    .catch(err => {
        res.redirect(`/productminimarkets/${req.params.id}/addprice?err=${err.message}`)
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

router.get('/deletespecific/:idproduct/:idminimarket', function(req, res) {
    ProductMinimarket.destroy({
        where: {
            ProductId: req.params.idproduct,
            MinimarketId: req.params.idminimarket
        }
    })
    .then(() => {
        res.redirect('/productminimarkets')
    })
})

module.exports = router;