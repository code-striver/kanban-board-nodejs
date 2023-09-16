const mongoose = require('mongoose');
const tasksSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    user:{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    status:
        {
            type: String,
            required: true

        },
},{
    timestamps:true
})

const Task = mongoose.model('Task', tasksSchema)

module.exports = Task;