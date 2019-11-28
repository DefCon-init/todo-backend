const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isAllDay: {
        type: Boolean,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    },
    icon: {
        type: String
    },
    category: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Todo", todoSchema, 'todo');
