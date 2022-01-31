const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

router.post('/add_user',
    [
        check('login', 'Неправильно указан логин')
            .isString()
            .notEmpty(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({min: 6}),
        check('role', 'Неправильно указана роль')
            .isIn([
                'Классный руководитель',
                'Ученик',
                'Учитель',
                'Родитель',
                'Администратор'
            ]),
        check('name', 'Неправильно указано имя')
            .isString()
            .notEmpty(),
        check('last_name', 'Неправильно указана фамилия')
            .isString()
            .notEmpty()
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при создании пользователя'
                })
            }

            const {
                login,
                password,
                role,
                class_study,
                subject,
                name,
                last_name,
                patronymic,
                cab
            } = request.body

            const candidate = await User.findOne({ login })

            if (candidate) {
                return response.status(400).json({message: 'Пользователь уже создан'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                login,
                password: hashedPassword,
                role,
                class_study,
                subject,
                name,
                last_name,
                patronymic,
                cab
            })

            console.log(user)

            await user.save()

            response.status(201).json({message: 'Пользователь создан'})
        } catch (e) {
            console.log(e)
            response.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

module.exports = router