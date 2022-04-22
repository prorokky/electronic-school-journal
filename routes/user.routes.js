const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Contact = require('../models/Contact')
const Role = require('../models/Role')
const Class = require('../models/Class')
const Subject = require('../models/Subject')
const auth = require("../middleware/auth.middleware");
const Mark = require("../models/Mark");
const Schedule = require('../models/Schedule');
const Homework = require('../models/Homework');
const router = Router()

router.post('/add_user',
    [
        check('login', 'Неправильно указан логин')
            .isString()
            .notEmpty(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({min: 6}),
        check('role', 'Неправильно указана роль')
            .isIn([
                'Классный руководитель',
                'Ученик',
                'Учитель',
                'Родитель',
                'Администратор'
            ]),
        check('name', 'Неправильно указано имя')
            .isString()
            .notEmpty(),
        check('last_name', 'Неправильно указана фамилия')
            .isString()
            .notEmpty()
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    message: 'Некорректные данные при создании пользователя',
                    isWarning: true,
                })
            }

            const {
                login,
                password,
                role,
                class_study,
                subject,
                name,
                last_name,
                patronymic,
                cab
            } = request.body

            const candidate = await User.findOne({ login })
            const roleCandidate = await Role.findOne({ role })
            const classCandidate = await Class.findOne({ class_study })
            const subjectCandidate = await Subject.findOne({ subject })

            if (candidate) {
                const data = [{message: 'Пользователь создан', isWarning: false}]
                return response.status(400).json(data)
            }

            if (!roleCandidate) {
                const data = {message: 'Введите корректную роль', isWarning: true}
                return response.status(400).json(data)
            }

            if (!classCandidate) {
                const data = {message: 'Введите корректный класс', isWarning: true}
                return response.status(400).json(data)
            }

            if (!subjectCandidate) {
                const data = {message: 'Введите корректный предмет', isWarning: true}
                return response.status(400).json(data)
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                login,
                password: hashedPassword,
                role: roleCandidate,
                class_study: classCandidate,
                subject: subjectCandidate,
                name,
                last_name,
                patronymic,
                cab
            })

            await user.save()

            response.status(201).json([{message: 'Пользователь создан', isWarning: false}])
        } catch (e) {
            response.status(500).json({message: 'Что-то пошло не так', isWarning: true})
        }
    }
)

router.post('/update_user',
    [],
    async (request, response) => {
        try {
            const {
                login,
                role,
                class_study,
                subject,
                name,
                last_name,
                patronymic,
                cab
            } = request.body

            const user = await User.findOne({ login })
            const roleCandidate = await Role.findOne({ role })
            const classCandidate = await Class.findOne({ class_study })
            const subjectCandidate = await Class.findOne({ subject })
            const updateCandidate = {
                login,
                password: user.password,
                role: roleCandidate,
                class_study: classCandidate,
                subject: subjectCandidate,
                name,
                last_name,
                patronymic,
                cab
            }

            const candidate = await User.findByIdAndUpdate(user.id, updateCandidate)

            response.status(201).json([{message: 'Пользователь обновлен', isWarning: false}])
        } catch (e) {
            console.log(e)
            response.status(500).json({message: 'Что-то пошло не так', isWarning: true})
        }
    }
)

router.post('/delete_user',
    [
        check('login', 'Неправильно указан логин')
            .isString()
            .notEmpty(),
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    message: 'Неправильно указан логин',
                    isWarning: true,
                })
            }

            const {
                login,
            } = request.body

            await User.deleteOne({ login })

            response.status(201).json([{message: 'Пользователь удален', isWarning: false}])
        } catch (e) {
            response.status(500).json({message: 'Что-то пошло не так', isWarning: true})
        }
    }
)

router.get('/get_roles', auth, async (request, response) => {
    try {
        const users = await User.find()
        const rolesArray = []

        for (let i = 0; i < users.length; i++)  {
            const roleNameCandidate = await Role.findOne({ _id: users[i].role })
            rolesArray.push({
                last_name: users[i].last_name,
                name: users[i].name,
                patronymic: users[i].patronymic,
                login: users[i].login,
                role: roleNameCandidate.role,
            })
        }

        response.json(rolesArray)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', isWarning: true })
    }
})

router.post('/add_contact',
    [
        check('mail', 'Неправильно указан логин')
            .isEmail()
    ],
    async (request, response) => {
    try {
        const errors = validationResult(request)

        if (!errors.isEmpty()) {
            return response.status(400).json({message: 'Введите корректную почту', isWarning: true})
        }
        const {
            name,
            last_name,
            patronymic,
            phone,
            mail
        } = request.body

        const candidateName = await User.findOne({ name })
        const candidateLastName = await User.findOne({ last_name })
        const candidatePatronymic = await User.findOne({ patronymic })

        if (!candidateName || !candidateLastName || !candidatePatronymic) {
            const data = {message: 'Введите корректные ФИО', isWarning: true}
            return response.status(400).json(data)
        }

        const contacts = new Contact({
            name: candidateName,
            last_name: candidateLastName,
            patronymic: candidatePatronymic,
            phone,
            mail,
        })

        await contacts.save()

        response.status(201).json([{message: 'Контакт создан', isWarning: false}])
    } catch (e) {
        response.status(500).json({message: 'Введите корректные ФИО', isWarning: true})
    }
    }
)

router.get('/get_contacts', auth, async (request, response) => {
    try {
        const contacts = await Contact.find()
        const data = [
            [{ value: 'Фамилия' },
            { value: 'Имя' },
            { value: 'Отчество' },
            { value: 'Предмет' },
            { value: 'Телефон' },
            { value: 'Почта' }]
        ] // массив возвращаемых значений

        for (let i = 0; i < contacts.length; i++) {
            const tableRow = [] // массив строк с 1 контактом
            const candidate = await User.findOne({ _id: contacts[i].name })
            const subject = await Subject.findOne({ _id: candidate.subject })
            if (!candidate || !subject) {
                const data = {message: 'Что-то пошло не так', isWarning: true}
                return response.status(400).json(data)
            } else {
                tableRow.push(
                    {value: candidate.last_name},
                    {value: candidate.name},
                    {value: candidate.patronymic},
                    {value: subject.subject },
                    {value: contacts[i].phone},
                    {value: contacts[i].mail},
                )
                data.push(tableRow)
            }
        }

        response.json(data)
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', isWarning: true })
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

router.post('/get_homework', [
], async (request, response) => {
    try {
        const {
            date,
            class_study,
        } = request.body

        const yearFrom = date.slice(0, 4)
        const monthFrom = date.slice(5, 7)
        const dayFrom = Number(date.slice(8, 10)) + 1 // Почему-то разница 1 день с датой

        const date_for = `${dayFrom}.${monthFrom}.${yearFrom}`

        const homeworkDate = new Date(date)
        const allHomework = await Homework.find()
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

        const data = {
            dayLessons,
            homework
        }

        response.json(data)
    } catch (e) {
        response.status(500).json({message: 'Что-то пошло не так, попробуйте снова', isWarning: true})
    }
})

module.exports = router