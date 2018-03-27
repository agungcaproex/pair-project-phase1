const router = require('express').Router();
const {Product} = require('../models')

//List Product
router.get('/', (req, res) => {
    // res.send('Ini halaman Product beserta CRUD')
    Product.findAll({
        order: [['id','ASC']]
    })
    .then(listProduct => {
        res.render('product/list-product', {product: listProduct})
    })
    .catch(err => {
        console.log(err)
    })
})

// Add Product
router.get('/add-product', (req, res) => {
    res.render('product/form-product')
})

router.post('/add-product', (req, res) => {
    let newProduct = {
        name: req.body.product_name
    }

    Product.create(newProduct)
    .then(addProduct => {
        console.log(addProduct)
        res.redirect('/products')
    })
    .catch(err => {
        console.log(err)
    })
})

//Edit Product
router.get('/edit-product/:id', (req, res) => {
    Product.findById(req.params.id)
    .then(dataProduct => {
        res.render('product/edit-product', {product: dataProduct})
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/edit-product/:id', (req, res) => {
    let newProduct = {
        name: req.body.product_name
    }
    Product.update(newProduct, {
        where: {
            id: req.params.id
        }
    })
    .then(updateProduct => {
        res.redirect('/products')
    })
    .catch(err => {
        console.log(err)
    })
})

//Delete Product
router.get('/del-product/:id', (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(delProduct => {
        res.redirect('/products')
    })
    .catch(err => {
        console.log(err)
    })
})



module.exports = router;