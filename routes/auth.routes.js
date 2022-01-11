const { Router } = require('express')
const User = require('../models/User')
const router = Router

// /api/auth/add_user - создание нового пользователя
router.post('/add_user', async (request, response) => {
    try {
        const { email, password } = request.body
    } catch (e) {
        response.status(500).json({message: 'Something go wrong, try again'})
    }
})

// /api/auth/login - авторизация пользователя
router.post('/login', async (request, response) => {

})

module.exports = router