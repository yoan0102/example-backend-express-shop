const { Router } = require('express')
const { check } = require('express-validator')

//middlewares
const { errorValidation } = require('../middleware/errorValidation')

//controllers
const { uploadFile } = require('../controllers/uploads')

const router = Router()


router.post('/', uploadFile)

module.exports = router
