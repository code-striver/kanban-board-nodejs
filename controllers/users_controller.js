const User = require('../models/users')
const Task = require('../models/tasks')

//get the sign up data
module.exports.createUser = async function(req, res){
    console.log('req.body = ', req.body)
    if(req.body.password != req.body.confirm_password){
        console.log('Password and confirm password did not match')
        return res.redirect('back');
    }
    let alreadyUser = await User.findOne({email:req.body.email});
    if(alreadyUser == null){
        await User.create(req.body)
        console.log('user added to database')
        return res.redirect('/users/sign-in-page')

    }
    else{
        console.log('This email is already existing')
        return res.redirect('back')
    }
}

module.exports.createSession = function(req, res){
    res.redirect('/users//tasks')
}

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){
            return console.log('Error while signing out');
        }
    });
    return res.redirect('/');
}