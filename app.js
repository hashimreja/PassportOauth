const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passportsetup = require('./config/passport-setup');
const passport = require('passport')
const cookieSession = require('cookie-session');
app.use(express.static('public'))
app.set('view engine','ejs');

//Database 
mongoose.connect('mongodb://localhost/passportoauth',(err) => {
    if(err){
        console.log(err);
    }else{
        console.log('Database Connected')
    }
})

//cookie lifetime 24hrs 60mins 60secs 1000millisecs   key to hash the cookie
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['passportisawesome']
}))

app.use(passport.initialize());
app.use(passport.session());

//routes
const authroutes = require('./routes/oauth-routes');
const profileroutes = require('./routes/profile.routes');

//apis
app.use('/auth',authroutes);
app.use('/api',profileroutes);



app.listen(3000,() =>{
    console.log('Listening on port 3000')
})