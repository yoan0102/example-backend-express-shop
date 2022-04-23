const { Router } = require('express')
const { check } = require('express-validator')

const { createCategory, getCategories, getCategory, putCategory, deleteCategory } = require('../controllers/categories')

const { issetCategory } = require('../helpers/bd-validators')

const { errorValidation } = require('../middleware/errorValidation')
const { validateJwt } = require('../middleware/validate-jwt')
const { isAdminRole } = require('../middleware')

const router = Router()

router.get('/', getCategories)

router.get('/:id', [
  check('id').custom(issetCategory).isMongoId(),
  errorValidation
], getCategory)

router.post('/', [
  validateJwt,
  check('name', 'Name is required').notEmpty(),
  check(''),
  errorValidation
], createCategory)

router.put('/:id', [
  validateJwt,
  check('id', 'Category not validate').isMongoId().custom(issetCategory),
  errorValidation
], putCategory)

router.delete('/:id', [
  validateJwt,
  isAdminRole,
  check('id', 'Id is required').isMongoId().custom(issetCategory),
  errorValidation
], deleteCategory)

module.exports = router
