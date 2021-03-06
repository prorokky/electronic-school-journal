const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/login - авторизация пользователя
router.post('/login',
    [
        check('password', 'Введите пароль')
            .exists()
            .notEmpty(),
        check('login', 'Введите логин')
            .notEmpty()
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                return response.status(400).json({message: 'Неккоректные данные при входе', isWarning: true})
            }

            const { login, password } = request.body

            const user = await User.findOne({ login })

            if (!user) {
                return response.status(400).json({ message: 'Пользователь не найден', isWarning: true })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return response.status(400).json({message: 'Введен неверный логин или пароль', isWarning: true})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            response.json({ token, userId: user.id })
        } catch (e) {
            response.status(500).json({message: 'Что-то пошло не так', isWarning: true})
        }
})

module.exports = router