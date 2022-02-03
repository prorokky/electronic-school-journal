const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    role: {
        type: String
    }
})

module.exports = model('Role', schema)