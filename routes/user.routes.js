const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Contact = require('../models/Contact')
const Role = require('../models/Role')
const Class = require('../models/Class')
const Subject = require('../models/Subject')
const auth = require("../middleware/auth.middleware");
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
            const roleCandidate = await Role.findOne({ role })
            const classCandidate = await Class.findOne({ class_study })
            const subjectCandidate = await Subject.findOne({ subject })

            if (candidate) {
                const data = {errors: [{msg: 'Пользователь создан'}]}
                return response.status(400).json(data)
            }

            if (!roleCandidate) {
                const data = {errors: [{msg: 'Введите корректную роль'}]}
                return response.status(400).json(data)
            }

            if (!classCandidate) {
                const data = {errors: [{msg: 'Введите корректный класс'}]}
                return response.status(400).json(data)
            }

            if (!subjectCandidate) {
                const data = {errors: [{msg: 'Введите корректный предмет'}]}
                return response.status(400).json(data)
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                login,
                password: hashedPassword,
                role: roleCandidate,
                class_study: classCandidate,
                subject: subjectCandidate,
                name,
                last_name,
                patronymic,
                cab
            })

            await user.save()

            response.status(201).json({message: 'Пользователь создан'})
        } catch (e) {
            response.status(500).json({errors: [{msg: 'Что-то пошло не так'}]})
        }
    }
)

router.post('/update_user',
    [],
    async (request, response) => {
        try {
            const {
                login,
                role,
                class_study,
                subject,
                name,
                last_name,
                patronymic,
                cab
            } = request.body

            const user = await User.findOne({ login })
            const roleCandidate = await Role.findOne({ role })
            const classCandidate = await Class.findOne({ class_study })
            const updateCandidate = {
                login,
                password: user.password,
                role: roleCandidate,
                class_study: classCandidate,
                subject,
                name,
                last_name,
                patronymic,
                cab
            }

            const candidate = await User.findByIdAndUpdate(user.id, updateCandidate)

            response.status(201).json({message: 'Пользователь обновлен'})
        } catch (e) {
            response.status(500).json({errors: [{msg: 'Что-то пошло не так'}]})
        }
    }
)

router.post('/delete_user',
    [
        check('login', 'Неправильно указан логин')
            .isString()
            .notEmpty(),
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при удалении пользователя'
                })
            }

            const {
                login,
            } = request.body

            await User.deleteOne({ login })

            response.status(201).json({message: 'Пользователь удален'})
        } catch (e) {
            response.status(500).json({errors: [{msg: 'Что-то пошло не так'}]})
        }
    }
)

router.get('/get_roles', auth, async (request, response) => {
    try {
        const users = await User.find()
        const rolesArray = []

        for (let i = 0; i < users.length; i++)  {
            const roleNameCandidate = await Role.findOne({ _id: users[i].role })
            rolesArray.push({
                last_name: users[i].last_name,
                name: users[i].name,
                patronymic: users[i].patronymic,
                login: users[i].login,
                role: roleNameCandidate.role,
            })
        }

        response.json(rolesArray)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/add_contact', [
], async (request, response) => {
    try {
        const {
            name,
            last_name,
            patronymic,
            phone,
            mail
        } = request.body

        const candidateName = await User.findOne({ name })
        const candidateLastName = await User.findOne({ last_name })
        const candidatePatronymic = await User.findOne({ patronymic })

        if (!candidateName || !candidateLastName || !candidatePatronymic) {
            const data = {errors: [{msg: 'Введите корректные ФИО'}]}
            return response.status(400).json(data)
        }

        const contacts = new Contact({
            name: candidateName,
            last_name: candidateLastName,
            patronymic: candidatePatronymic,
            phone,
            mail,
        })

        await contacts.save()

        response.status(201).json({message: 'Контакт создан'})
    } catch (e) {
        response.status(500).json({errors: [{msg: 'Введите корректные ФИО'}]})
    }
    }
)

module.exports = router