const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

const rolesArray = ['Классный руководитель', 'Ученик', 'Учитель', 'Родитель', 'Администратор']
const subjectsArray = [
    'Русский язык',
    'Литература',
    'Математика',
    'География',
    'Биология',
    'Физкультура',
    'ИЗО',
    'Черчение',
]

// /api/add_user - создание нового пользователя
router.post('/add_user',
    [
        check('login', 'Неправильно указан логин')
            .isString()
            .notEmpty(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({min: 6}),
        check('role', 'Неправильно указана роль')
            .if((value) => value.indexOf(rolesArray) !== -1),
        check('subject', 'Неправильно указан предмет')
            .if((value) => value.map((item) => {
                if (item.indexOf(subjectsArray) === -1) {
                    return false
                } else return true
            })),
        check('name', 'Неправильно указано имя')
            .isString()
            .notEmpty(),
        check('last_name', 'Неправильно указана фамилия')
            .isString()
            .notEmpty()
    ],
    async (request, response) => {
        try {
            console.log(request.body)
            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при создании пользователя'
                })
            }

            const {
                email,
                password,
                role,
                class_study,
                subject,
                name,
                last_name,
                patronymic,
                cab
            } = request.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return response.status(400).json({message: 'Пользователь уже создан'})
            }

            const hashedPassword = await bcrypt(password, 12)
            const user = new User({
                email,
                password: hashedPassword,
                role,
                class_study,
                subject,
                name,
                last_name,
                patronymic,
                cab
            })

            await user.save()

            response.status(201).json({message: 'User created'})
        } catch (e) {
            response.status(500).json({message: 'Что-то пошло не так'})
        }
    })

module.exports = router