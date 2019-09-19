const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const userSchema = require('../models/user.model');

//serialize
passport.serializeUser((user,done) =>{
    done(null,user.id)
    //the userid will pass to the cookie and the cookie will encrypt and send to the browser
});
//deserialize
passport.deserializeUser((id,done) => {
    userSchema.findById(id).then((user) =>{
        done(null,user)
    //here we will decrypt the cookie and get the user id
    });
});
//passport
passport.use(new GoogleStrategy({
    //options in google strategy
    callbackURL:"/auth/google/redirect",
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken,refreshToken,profile,done) => {
    //passport callback function
    userSchema.findOne({googleid:profile.id}).then((currentuser) =>{
        if(currentuser){
            console.log('Current user is :', currentuser)
            done(null,currentuser);
        }else{
            new userSchema({
                name:profile.displayName,
                googleid: profile.id
            }).save().then((data) =>{console.log('User Created :',data)})
            done(null,data);
        }
    })
})
)