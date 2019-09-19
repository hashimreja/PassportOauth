const router = require('express').Router();
const passport = require('passport');

router.get('/login',(req,res) => {
    res.render('login')
})

router.get('/logout',(req,res) => {
    req.logout();
    res.redirect('/auth/home');
})

router.get('/home',(req,res) => {
    res.render('home')
})

//google+
router.get('/google',
    passport.authenticate('google',{
        scope:['profile']
    })
)

router.get('/google/redirect',passport.authenticate('google'),(req,res) => {
    //we can grab the userdata here with the use of cookie
    // console.log(req.user)
    res.redirect('/api/profile')
})

module.exports = router;