const router = require('express').Router();
const {User} = require('../models')
const checkAdmin = require('../middleware/authAdmin')


router.get('/', (req, res) => {
    User.findAll({
        order: [['id','ASC']]
    })
    .then(dataUser => {
        res.render('user/list-user', {users: dataUser})
    })
    .catch(err => {
        console.log(err)
    })
})


router.get('/edit-user/:id', (req, res) => {
    User.findById(req.params.id)
    .then(dataUser => {
        res.render('user/edit-user', {users: dataUser})
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/edit-user/:id', (req, res) => {
    let newData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        role: req.body.role
    }
    User.update(newData, {
        where: {
            id: req.params.id
        }
    })
    .then(updateUser => {
        res.redirect('/users')
    })
    .catch(err => {
        console.log(err)
    })
})


router.get('/delete/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(delUser => {
        res.redirect('/users')
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router