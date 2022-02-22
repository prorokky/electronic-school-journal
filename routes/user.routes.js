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
                    message: 'Некорректные данные при создании пользователя',
                    isWarning: true,
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
                const data = [{message: 'Пользователь создан', isWarning: false}]
                return response.status(400).json(data)
            }

            if (!roleCandidate) {
                const data = {message: 'Введите корректную роль', isWarning: true}
                return response.status(400).json(data)
            }

            if (!classCandidate) {
                const data = {message: 'Введите корректный класс', isWarning: true}
                return response.status(400).json(data)
            }

            if (!subjectCandidate) {
                const data = {message: 'Введите корректный предмет', isWarning: true}
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

            response.status(201).json([{message: 'Пользователь создан', isWarning: false}])
        } catch (e) {
            response.status(500).json({message: 'Что-то пошло не так', isWarning: true})
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
            const subjectCandidate = await Class.findOne({ subject })
            const updateCandidate = {
                login,
                password: user.password,
                role: roleCandidate,
                class_study: classCandidate,
                subject: subjectCandidate,
                name,
                last_name,
                patronymic,
                cab
            }

            const candidate = await User.findByIdAndUpdate(user.id, updateCandidate)

            response.status(201).json([{message: 'Пользователь обновлен', isWarning: false}])
        } catch (e) {
            console.log(e)
            response.status(500).json({message: 'Что-то пошло не так', isWarning: true})
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
                    message: 'Неправильно указан логин',
                    isWarning: true,
                })
            }

            const {
                login,
            } = request.body

            await User.deleteOne({ login })

            response.status(201).json([{message: 'Пользователь удален', isWarning: false}])
        } catch (e) {
            response.status(500).json({message: 'Что-то пошло не так', isWarning: true})
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
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', isWarning: true })
    }
})

router.post('/add_contact',
    [
        check('mail', 'Неправильно указан логин')
            .isEmail()
    ],
    async (request, response) => {
    try {
        const errors = validationResult(request)

        if (!errors.isEmpty()) {
            return response.status(400).json({message: 'Введите корректную почту', isWarning: true})
        }
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
            const data = {message: 'Введите корректные ФИО', isWarning: true}
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

        response.status(201).json([{message: 'Контакт создан', isWarning: false}])
    } catch (e) {
        response.status(500).json({message: 'Введите корректные ФИО', isWarning: true})
    }
    }
)

module.exports = router