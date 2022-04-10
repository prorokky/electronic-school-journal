const {Router, request, response} = require("express")
const Subject = require('../models/Subject')
const Class = require("../models/Class")
const Schedule = require("../models/Schedule")
const User = require("../models/User");
const router = Router()

router.post('/add_schedule', [
], async (request, response) => {
    try {
        const {
            allLessons,
            chosenClass,
        } = request.body

        const classCandidate = await Class.findOne({ class_study: chosenClass })

        let dayLessonsId = []
        let allLessonsId = []

        if (!chosenClass) {
            const data = {message: 'Введите корректный класс', isWarning: true}
            return response.status(400).json(data)
        }

        for (let i = 0; i < allLessons.length; i++) {
            dayLessonsId = []
            for (let j = 0; j < allLessons[i].length; j++) {
                const subjectCandidate = await Subject.findOne({ subject: allLessons[i][j] })

                if (!subjectCandidate) {
                    const data = {message: 'Введите существующий предмет', isWarning: true}
                    return response.status(500).json(data)
                } else {
                    dayLessonsId.push(subjectCandidate)
                }
            }
            allLessonsId.push(dayLessonsId)
            console.log('allLessonsId', allLessonsId)
        }

        const schedule = new Schedule({
            class_study: classCandidate,
            mondayLessons: allLessonsId[0],
            tuesdayLessons: allLessonsId[1],
            wednesdayLessons: allLessonsId[2],
            thursdayLessons: allLessonsId[3],
            fridayLessons: allLessonsId[4],
            saturdayLessons: allLessonsId[5],
        })

        console.log(schedule)

        await schedule.save()

        response.status(201).json([{message: 'Расписание добавлено', isWarning: false}])
    } catch (e) {
        response.status(500).json({message: 'Введите корректные данные', isWarning: true})
    }
})

module.exports = router