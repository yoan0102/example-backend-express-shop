const { response, request } = require('express')
const { ObjectId } = require('mongoose').Types
const { User, Category, Product } = require('../models')

const collectionsPermitidas = [
  'users',
  'category',
  'products',
  'roles',
]

const searchUsers = async (termino = '', res = response) => {
  const isMongoId = ObjectId.isValid(termino)

  if (isMongoId) {
    const user = await User.findById(termino)
    res.json({
      results: user ? [user] : []
    })
  }
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
      break;
    case 'category':
      break;
    default:
      res.status(500).json('Se me olvido hacer esta busqueda')
  }

}