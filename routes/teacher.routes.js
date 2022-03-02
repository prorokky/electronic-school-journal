const {Router} = require("express");
const auth = require("../middleware/auth.middleware")
const Homework = require('../models/Homework')
const Class = require("../models/Class")
const Subject = require("../models/Subject");
const router = Router()

router.get('/classes', auth, async (request, response) => {
    try {
        const classes = await Class.find()

        const data = []

        classes.map((classItem) => {
            data.push(classItem.class_study)
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
            const {
                homework,
                date_for,
                date_from,
                class_study,
                subject
            } = request.body

            console.log(date_from)

            const yearFrom = date_from.slice(0, 4)
            const monthFrom = date_from.slice(5, 7)
            const dayFrom = date_from.slice(8, 10)

            const yearFor = date_for.slice(0, 4)
            const monthFor = date_for.slice(5, 7)
            const dayFor = date_for.slice(8, 10)

            const classCandidate = await Class.findOne({ class_study })
            const subjectCandidate = await Subject.findOne({ subject })

            if (!classCandidate) {
                const data = {message: 'Введите корректный класс', isWarning: true}
                return response.status(400).json(data)
            }

            if (!subjectCandidate) {
                const data = {message: 'Некорректный предмет', isWarning: true}
                return response.status(400).json(data)
            }

            const work = new Homework({
                homework,
                class_study: classCandidate,
                date_for: `${dayFor}.${monthFor}.${yearFor}`,
                date_from: `${dayFrom}.${monthFrom}.${yearFrom}`,
                subject: subjectCandidate,
            })

            await work.save()

            response.status(201).json([{message: 'Новость добавлена', isWarning: false}])
        } catch (e) {
            console.log(e)
            response.status(500).json({message: 'Введите корректные данные', isWarning: true})
        }
    }
)

module.exports = router