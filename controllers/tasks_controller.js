const mongoose = require('mongoose');
const Task = require('../models/tasks')
const User = require('../models/users')


module.exports.tasks = async function(req, res){
    let foundUser = await User.findById(req.user._id)
        foundUser = await User.populate(foundUser,'tasks');
        let userTasksList = foundUser.tasks
    return res.render('tasks', {title:'ToDo | Tasks', tasks:userTasksList})
}

module.exports.createTask = async function(req, res){
    try{
        let newTask = await Task.create({
            content: req.body.content,
            status:req.body.status,
            user: req.user._id
        })
        newTask = await Task.populate(newTask, 'user')
        let foundUser = await User.findById(req.user._id)
        foundUser = await User.populate(foundUser,'tasks');
        foundUser.tasks.push(newTask);
        await foundUser.save();
        let userTasksList = foundUser.tasks
        
        console.log('task added sucessfully')
        return res.redirect('back')
    }catch(err){
        console.log('catch error while creating task in  tasks_controller file', err)
    }
}

module.exports.updateTask = async function(req, res){
    let taskToUpdate = await Task.findById(req.body.taskID)
    console.log("before updation the status was ", taskToUpdate.status)
    console.log("task to be updated is", taskToUpdate)
    console.log("the status should be ", req.body.status)
    taskToUpdate.status = req.body.status
    console.log("Now the status is " , taskToUpdate.status)
    console.log("after updation the task looks like ", taskToUpdate)
    taskToUpdate.save()
    return res.redirect('back')
}

module.exports.deleteTask = async function(req, res){
    try{
        let taskDeleted = await Task.findByIdAndDelete(req.params.id)
        return res.redirect('back');
    }catch(err){
        console.log('catch error in deleteTask in task_controller ', err)
    }
}