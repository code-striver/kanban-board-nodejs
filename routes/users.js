const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks_controller')
const usersController = require('../controllers/users_controller');
const passport = require('passport');
router.get('/tasks', passport.checkAuthentication, tasksController.tasks)
router.post('/sign-up', usersController.createUser)//COMPLETE USER CONTROLLER CODE
router.get('/sign-in-page', function(req, res){
    if(req.user){
        return res.redirect('/users/tasks')
    }
    return res.render('sign-in', {title:'ToDo | Sign in'})
})
router.post('/create-session', passport.authenticate(
    'local', 
    {failureRedirect:'/users/sign-in-page'},
), usersController.createSession)

router.get('/sign-out', usersController.destroySession)
module.exports = router;

// URL with users/tasks
router.post('/create-task', passport.checkAuthentication, tasksController.createTask)
router.post('/update-task', tasksController.updateTask)
router.get('/delete-task/:id', tasksController.deleteTask)