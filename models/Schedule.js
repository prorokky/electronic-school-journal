const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    class_study: {
        type: Types.ObjectId,
        ref: 'Class'
    },
    mondayLessons: {
        type: [{type: Types.ObjectId, ref: 'Subject'}],
        required: true,
    },
    tuesdayLessons: {
        type: [{type: Types.ObjectId, ref: 'Subject'}],
        required: true,
    },
    wednesdayLessons: {
        type: [{type: Types.ObjectId, ref: 'Subject'}],
        required: true,
    },
    thursdayLessons: {
        type: [{type: Types.ObjectId, ref: 'Subject'}],
        required: true,
    },
    fridayLessons: {
        type: [{type: Types.ObjectId, ref: 'Subject'}],
        required: true,
    },
    saturdayLessons: {
        type: [{type: Types.ObjectId, ref: 'Subject'}],
        required: true,
    }
})

module.exports = model('Schedule', schema)