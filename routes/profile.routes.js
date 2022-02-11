const {Router} = require('express')
const config = require('config')
const User = require('../models/User')
const Role = require('../models/Role')
const Class = require('../models/Class')
const Subject = require('../models/Subject')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/:id', auth, async (request, response) => {
    try {
        const user = await User.findById(request.params.id)
        const role = await Role.findById(user.role)
        const class_study = await Class.findById(user.class_study)
        const subject = await Subject.findById(user.subject)

        let class_study_name, subject_name

        if (!class_study) {
            class_study_name = ''
        } else class_study_name = class_study.class_study

        if (!subject) {
            subject_name = ''
        } else subject_name = subject.subject

        const userData = {
            last_name: user.last_name,
            name: user.name,
            patronymic: user.patronymic,
            login: user.login,
            role: role.role,
            subject: subject_name,
            cab: user.cab,
            class_study: class_study_name
        }

        response.json(userData)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', isWarning: true })
    }
})

module.exports = router