const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    todoname: {
        type: String,
        required: true,
        min: 8
    },
    description: {
        type: String,
        min: 5,
        max: 255
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date
    }
})

module.exports = mongoose.model('Todo', todoSchema);