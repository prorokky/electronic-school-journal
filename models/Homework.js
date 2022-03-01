const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    class_study: {
        type: Types.ObjectId,
        ref: 'Class'
    },
    subject: {
        type: Types.ObjectId,
        ref: 'Subject',
    },
    homework: {
        type: String,
        required: true
    },
    date_for: {
        type: String,
        required: true
    },
    date_from: {
        type: String,
        required: true
    }
})

module.exports = model('Homework', schema)