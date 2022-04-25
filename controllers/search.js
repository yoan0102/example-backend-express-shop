const { response, request } = require('express')
const { ObjectId } = require('mongoose').Types
const { User, Category, Product } = require('../models')

const collectionsPermitidas = [
  'users',
  'categories',
  'products',
  'roles',
]

const searchUsers = async (termino = '', res = response) => {
  const isMongoId = ObjectId.isValid(termino)

  if (isMongoId) {
    const user = await User.findById(termino)
    return res.json({
      results: user ? [user] : []
    })
  }

  const regex = new RegExp(termino, 'i')

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }]
  })

  res.json({
    results: users
  })

}

const searchCategory = async (termino = '', res = response) => {

  const isMongoId = ObjectId.isValid(termino)

  if (isMongoId) {
    const category = await Category.findById(termino)
    return res.json({
      results: category ? [category] : []
    })
  }

  const regex = new RegExp(termino, 'i')

  const categories = await Category.find({ name: regex, state: true })

  res.json({
    results: categories
  })

}

const searchProduct = async (termino = '', res = response) => {

  const isMongoId = ObjectId.isValid(termino)

  if (isMongoId) {
    const product = await Product.findById(termino).populate('category', 'name')
    return res.json({
      results: product ? [product] : []
    })
  }

  const regex = new RegExp(termino, 'i')

  const products = await Product.find({ name: regex, state: true }).populate('category', 'name')

  res.json({
    results: products
  })

}

exports.search = async (req = request, res = response) => {

  const { collection, termino } = req.params

  if (!collectionsPermitidas.includes(collection)) {
    return res.status(400).json({
      msg: `Las collection permitidas son: ${collectionsPermitidas
        }`
    })
  }

  switch (collection) {
    case 'users':
      searchUsers(termino, res)
      break;
    case 'products':
      searchProduct(termino, res)
      break;
    case 'categories':
      searchCategory(termino, res)
      break;
    default:
      res.status(500).json('Se me olvido hacer esta busqueda')
  }

}