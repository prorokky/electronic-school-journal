const {Router} = require('express')
const config = require('config')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/:id', auth, async (request, response) => {
    try {
        const user = await User.findById(request.params.id)
        response.json(user)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router