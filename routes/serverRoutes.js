const serverRoutes = require('express').Router()
const serverController = require('../controllers/serverController')

serverRoutes.post('/', async function (req, res, next) {
    try {
        let result = await serverController.checkStatus(req.body).catch(err => { throw new Error(err) })
        res.status(200).send({
            'message': 'Server Online!',
            'data': result
        })
    }
    catch (err) {
        next(err.message)
    }
})

serverRoutes.get('/', async function (req, res, next) {
    try {
        let result = await serverController.checkStatus().catch(err => { throw new Error(err) })
        res.status(200).send({
            'message': 'Server Online!'
        })
    }
    catch (err) {
        next(err.message)
    }
})

module.exports = serverRoutes
