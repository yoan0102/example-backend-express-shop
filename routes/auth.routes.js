const { Router } = require('express')
const { check } = require('express-validator')

//middlewares
const { errorValidation } = require('../middleware/errorValidation')

//controllers
const { login } = require('../controllers/auth')

const router = Router()

router.post(
  '/login',
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').notEmpty(),
  errorValidation,
  login
)

module.exports = router
