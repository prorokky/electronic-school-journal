const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
    },
    mark: {
        type: String,
        required: true,
    },
    mark_type: {
        type: String,
        required: true,
    },
    mark_date: {
        type: String,
        required: true,
    },
    class_study: {
        type: Types.ObjectId,
        ref: 'Class'
    },
    subject: {
        type: Types.ObjectId,
        ref: 'Subject'
    }
})

module.exports = model('Mark', schema)