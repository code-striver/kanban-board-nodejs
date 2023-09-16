module.exports.home = function(req, res){
    if(req.user){
        return res.redirect('/users//tasks')
    }
    return res.render('home', {title:'ToDo | Home'})
}