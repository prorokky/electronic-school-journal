const {Router, request, response} = require("express");
const auth = require("../middleware/auth.middleware")
const Homework = require('../models/Homework')
const Class = require("../models/Class")
const Subject = require("../models/Subject")
const User = require("../models/User")
const Mark = require("../models/Mark")
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

router.post('/get_students', [], async (request, response) => {
    try {
        const { class_study } = request.body
        const data = []
        const users = await User.find()

        for (let i = 0; i < users.length; i ++) {
            const className = await Class.findOne({ _id: users[i].class_study })
            if (className && (className.class_study === class_study)) {
                data.push( `${users[i].last_name} ${users[i].name} ${users[i].patronymic}`)
            }
        }

        response.json(data)
    } catch (e) {
        console.log(e)
        response.status(500).json({message: 'Что-то пошло не так, попробуйте снова', isWarning: true})
    }
})

router.post('/add_mark', [
], async (request, response) => {
    try {
        const {
            fio,
            mark,
            markDate,
            markType,
            classStudy,
            subject,
        } = request.body

        const studentFio = fio.split(' ')
        const classCandidate = await Class.findOne({ class_study: classStudy })
        const subjectCandidate = await Subject.findOne({ subject })
        const student = await User.findOne({ name: studentFio[1], last_name: studentFio[0], class_study: classCandidate })

        if (mark > 5 || mark < 2) {
            response.status(500).json({message: 'Введите корректные данные', isWarning: true})
        }

        const year = markDate.slice(0, 4)
        const month = markDate.slice(5, 7)
        const day = markDate.slice(8, 10)

        const newMark = new Mark ({
            user: student._id,
            mark,
            mark_type: markType,
            mark_date: `${day}.${month}.${year}`,
            class_study: classCandidate,
            subject: subjectCandidate,
        })

        await newMark.save()

        response.status(201).json([{message: 'Оценка добавлена', isWarning: false}])

    } catch (e) {
        response.status(500).json({message: 'Введите корректные данные', isWarning: true})
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

            response.status(201).json([{message: 'Задание добавлено', isWarning: false}])
        } catch (e) {
            response.status(500).json({message: 'Введите корректные данные', isWarning: true})
        }
    }
)

module.exports = router