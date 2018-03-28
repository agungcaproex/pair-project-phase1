function checkAdmin(req, res, next){
    if(req.session.role == 'admin'){
        next()
    }   
    else{
        res.redirect('/login')
    }
}

module.exports = checkAdmin