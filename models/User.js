const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    class_study: {
        type: String // класс обучения, необходимо для учеников, их родителей, классного руководителя
    },
    subject: {
        type: String // предмет обучения, необходимо для учителя
    },
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    patronymic: {
        type: String
    },
    cab: {
        type: String
    },
})

module.exports = model('User', schema)