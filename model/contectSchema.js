const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    subject: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
})

const contacts = new mongoose.model('contacts',userSchema);

module.exports = contacts ;