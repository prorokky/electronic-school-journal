const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    header: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
})

module.exports = model('News', schema)