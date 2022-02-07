const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    subject: {
        type: String
    }
})

module.exports = model('Subject', schema)