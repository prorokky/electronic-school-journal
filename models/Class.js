const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    class_study: {
        type: String
    }
})

module.exports = model('Class', schema)