const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    name: {
        type: Types.ObjectId,
        ref: 'User',
    },
    last_name: {
        type: Types.ObjectId,
        ref: 'User',
    },
    patronymic: {
        type: Types.ObjectId,
        ref: 'User',
    },
    phone: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
})

module.exports = model('Contact', schema)