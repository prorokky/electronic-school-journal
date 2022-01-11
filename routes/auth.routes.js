const { Router } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const router = Router

// /api/auth/add_user - создание нового пользователя
router.post('/add_user', async (request, response) => {
    try {
        const {
            id,
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

        const candidate = await User.findOne({ email })

        if (candidate) {
            return response.status(400).json({ message: 'User already exist' })
        }

        const hashedPassword = await bcrypt(password, 12)
        const user = new User({
            id,
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

        response.status(201).json({ message: 'User created' })
    } catch (e) {
        response.status(500).json({ message: 'Something go wrong, try again'})
    }
})

// /api/auth/login - авторизация пользователя
router.post('/login', async (request, response) => {

})

module.exports = router