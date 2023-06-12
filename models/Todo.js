const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: String,
        enum: ['added', 'complete']
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = new mongoose.model("todo", todoSchema)