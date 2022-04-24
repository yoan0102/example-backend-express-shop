const { Router } = require('express')
const { check } = require('express-validator')

const { getProduct, getProducts, postProducts, putProducts, deleteProducts } = require('../controllers/product')

const { errorValidation } = require('../middleware/errorValidation')
const { issetProduct, issetCategory } = require('../helpers/bd-validators')
const { validateJwt, isAdminRole } = require('../middleware')

const router = Router()

router.get('/', getProducts)

router.get('/:id', [
  check('id', 'Product not exist').isMongoId().custom(issetProduct),
  errorValidation
], getProduct)

router.post('/', [
  validateJwt,
  check('name', 'Name is required').notEmpty(),
  check('category', 'Category not exist').isMongoId().custom(issetCategory),
  errorValidation
], postProducts)

router.put('/:id', [
  validateJwt,
  check('id', 'Product not exist').isMongoId().custom(issetProduct),
  errorValidation
], putProducts)

router.delete('/:id', [
  validateJwt,
  isAdminRole,
  check('id', 'Product not exist').isMongoId().custom(issetProduct),
  errorValidation
], deleteProducts)






module.exports = router