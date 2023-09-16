const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    async function(email, password, done){
        try{
            let signingUser = await User.findOne({email:email})
            if(signingUser == null || signingUser.password != password){
                console.log('Invald Username/Pasword')
                return done(null, false)
            }
            return done(null, signingUser)
        } catch(err){
           return console.log('Catch Error in passport-local-strategy', err)
    }
        
}))

passport.serializeUser(function(user, done){
    done(null, user.id)
})

passport.deserializeUser(async function(id, done){ 
    let foundIn = await User.findById(id)
    if(foundIn){
        return done(null, foundIn)
    }
    return console.log('error in finding user');
})

passport.checkAuthentication = function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in-page');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;