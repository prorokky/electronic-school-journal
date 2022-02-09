const News = require('../models/News')
const {Router} = require("express");
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

            response.status(201).json({message: 'Новость добавлена'})
        } catch (e) {
            response.status(500).json({errors: [{msg: 'Введены неккоректные данные'}]})
        }
    }
)

module.exports = router