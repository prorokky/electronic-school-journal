const {Router} = require("express");
const auth = require("../middleware/auth.middleware");
const News = require("../models/News")
const router = Router()

router.post('/add_news', [
    ], async (request, response) => {
        try {
            const {
                header,
                text,
            } = request.body

            const news = new News({
                header,
                text,
            })

            await news.save()

            response.status(201).json([{message: 'Новость добавлена', isWarning: false}])
        } catch (e) {
            response.status(500).json({message: 'Введите корректные данные', isWarning: true})
        }
    }
)

router.get('/get_news', auth, async (request, response) => {
    try {
        const news = await News.find()

        response.json(news)
    } catch (e) {
        response.status(500).json({message: 'Что-то пошло не так, попробуйте снова', isWarning: true})
    }
})

module.exports = router