const Homework = require("../models/Homework");
const Marks = require("../models/Mark");
const Class = require("../models/Class");
const Schedule = require("../models/Schedule");
const Subject = require("../models/Subject");
const User = require("../models/User");
const Mark = require("../models/Mark");
const router = require("./auth.routes");


router.post('/get_homework', [
], async (request, response) => {
    try {
        const {
            date,
            class_study,
            login,
        } = request.body

        const yearFrom = date.slice(0, 4)
        const monthFrom = date.slice(5, 7)
        const dayFrom = date.slice(8, 10)
        const date_for = `${dayFrom}.${monthFrom}.${yearFrom}`

        const homeworkDate = new Date(date)
        const allHomework = await Homework.find()
        const allMarks = await Marks.find()
        let lessonsIds = []

        const classId = await Class.findOne({ class_study: class_study })
        const schedule = await Schedule.findOne({ class_study: classId._id })

        switch (homeworkDate.getDay()) {
            case 1:
                lessonsIds = schedule.mondayLessons
                break
            case 2:
                lessonsIds = schedule.tuesdayLessons
                break
            case 3:
                lessonsIds = schedule.wedndesdayLessons
                break
            case 4:
                lessonsIds = schedule.thursdayLessons
                break
            case 5:
                lessonsIds = schedule.fridayLessons
                break
            case 6:
                lessonsIds = schedule.saturdayLessons
                break
        }

        const dayLessons = []
        const homework = []
        const studentMarks = []

        for (let i = 0; i < lessonsIds.length; i++) {
            const lesson = await Subject.findOne({ _id: lessonsIds[i] })
            dayLessons.push(lesson.subject)
            let lessonHomework = ''
            for (let j = 0; j < allHomework.length; j++) {
                const homeworkClass = await Class.findOne({ _id: allHomework[j].class_study })
                if (homeworkClass.class_study === classId.class_study &&
                    allHomework[j].date_for === date_for) {
                    const homeworkSubject = await Subject.findOne({ _id: allHomework[j].subject })
                    if (homeworkSubject.subject === lesson.subject) {
                        lessonHomework = allHomework[j].homework
                    }
                }
            }
            homework.push(lessonHomework)
        }

        for (let i = 0; i < lessonsIds.length; i++) {
            const lesson = await Subject.findOne({ _id: lessonsIds[i] })
            let mark = ''
            for (let j = 0; j < allMarks.length; j++) {
                const markSubject = await Subject.findOne({ _id: allMarks[j].subject })
                const userInfo = await User.findOne({ _id: allMarks[j].user })
                if (markSubject.subject === lesson.subject &&
                    allMarks[j].mark_date === date_for &&
                    userInfo.login === login) {
                    mark = allMarks[j].mark
                }
            }
            studentMarks.push(mark)
        }

        const data = {
            dayLessons,
            homework,
            studentMarks,
        }

        response.json(data)
    } catch (e) {
        console.log(e)
        response.status(500).json({message: 'Что-то пошло не так, попробуйте снова', isWarning: true})
    }
})

router.post('/get_student_marks', [
], async (request, response) => {
    try {
        const {
            class_study,
            subject,
            login
        } = request.body

        const userId = await User.findOne({ login })
        const userFio = `${userId.last_name} ${userId.name} ${userId.patronymic}`

        const allMarks = await Mark.find()
        const data = [] // данные для ответа на фронт
        const students = [] // список всех данных об оценках
        const marksDates = [] // даты оценок

        for (let i = 0; i < allMarks.length; i++) {
            const className = await Class.findOne({ _id: allMarks[i].class_study })
            const subjectName = await Subject.findOne({ _id: allMarks[i].subject })
            if (className &&
                (className.class_study === class_study) &&
                (subjectName.subject === subject)
            ) {
                marksDates.push(allMarks[i].mark_date)
                students.push({
                    student: allMarks[i].user,
                    mark: allMarks[i].mark,
                    markDate: allMarks[i].mark_date,
                    markType: allMarks[i].mark_type,
                })
            }
        }

        marksDates.sort()

        filteredMarksDates = marksDates.filter((item, pos) => {
            return marksDates.indexOf(item) === pos
        })

        const marksDatedRow = []

        for (let i = 0; i < filteredMarksDates.length; i++) {
            marksDatedRow.push({value: filteredMarksDates[i]})
        }

        data.push(marksDatedRow)

        const studentData = []
        for (let i =  0; i < filteredMarksDates.length; i++) {
            let hasMark = false
            for (let j = 0; j < students.length; j++) {
                const fio = await User.findOne({ _id: students[j].student })
                const studentFio = `${fio.last_name} ${fio.name} ${fio.patronymic}`
                if (studentFio === userFio) {
                    if (students[j].markDate === filteredMarksDates[i]) {
                        studentData.push({ value: students[j].mark })
                        hasMark = true
                    }
                }
            }
            if (!hasMark) {
                studentData.push({value: ''})
            }
        }

        data.push(studentData)

        response.json(data)
    } catch (e) {
        response.status(500).json({message: 'Что-то пошло не так, попробуйте снова', isWarning: true})
    }
})

module.exports = router