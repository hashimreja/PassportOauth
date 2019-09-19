const router = require('express').Router();

//middleware to protect routes

const authcheck = (req,res,next) =>{
    if(!req.user){
        res.redirect('/auth/login')
    }else{
        next();
    }
}


router.get('/profile',authcheck,(req,res) =>{
    res.render('loggedin')
})


module.exports = router;