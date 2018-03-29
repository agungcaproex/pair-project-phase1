function checkNetizen(req, res, next){
    if(req.session.role == 'netizen'){
        next()
    }   
    else{
        res.redirect('/login')
    }
}

module.exports = checkNetizen