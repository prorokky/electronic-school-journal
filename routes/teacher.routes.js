const {Router} = require("express");
const auth = require("../middleware/auth.middleware");
const Homework = require('../models/Homework')
const Class = require("../models/Class");
const router = Router()

router.get('/classes', auth, async (request, response) => {
    try {
        const classes = await Class.find()

        const data = []

        classes.map((classItem) => {
            if (classItem.class_study !== '') {
                data.push(classItem.class_study)
            }
        })

        data.sort()

        response.json(data)
    } catch (e) {
        response.status(500).json({message: 'Что-то пошло не так, попробуйте снова', isWarning: true})
    }
})

router.post('/add_homework', [
    ], async (request, response) => {
        try {

            response.status(201).json([{message: 'Новость добавлена', isWarning: false}])
        } catch (e) {
            console.log(e)
            response.status(500).json({message: 'Введите корректные данные', isWarning: true})
        }
    }
)

module.exports = router