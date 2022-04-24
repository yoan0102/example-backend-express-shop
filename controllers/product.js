const { response } = require('express')
const { Product } = require('../models')

exports.getProducts = async (req, res = response) => {
  try {
    const { limit = 5, desde = 0 } = req.query
    const query = { state: true }

    const [totalProducts, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query).skip(parseInt(desde)).limit(parseInt(limit)).populate('category', 'name').populate('user', 'name')
    ])

    res.status(200).json({
      totalProducts,
      products
    })

  } catch (error) {
    res.status(500).send(`Error server  ${error}`)
  }
}

exports.getProduct = async (req, res = response) => {
  try {
    const { id } = req.params

    const product = await Product.findById(id).populate('category', 'name').populate('user', 'name')

    res.json(product)

  } catch (error) {
    res.status(500).send(`Error server  ${error}`)
  }
}

exports.postProducts = async (req, res = response) => {
  try {
    const { state, user, ...rest } = req.body

    const prodcutDb = await Product.findOne({ name: rest.name })

    if (prodcutDb) {
      return res.status(400).json({
        msg: `Prodcut ${prodcutDb.name}, it ready exist`
      })
    }

    const data = {
      user: req.user._id,
      ...rest
    }

    const product = await new Product(data)
    await product.save()

    res.status(201).json(product)

  } catch (error) {
    res.status(500).send(`Error server  ${error}`)
  }
}


exports.putProducts = async (req, res = response) => {
  try {
    const { id } = req.params
    const { state, user, ...data } = req.body

    data.user = req.user._id

    const product = await Product.findByIdAndUpdate(id, data, { new: true }).populate('category', 'name').populate('user', 'name')


    res.status(200).json(product)

  } catch (error) {
    res.status(500).send(`Error server  ${error}`)
  }
}


exports.deleteProducts = async (req, res = response) => {
  try {
    const { id } = req.params

    const deleteProduct = await Product.findByIdAndUpdate(id, { state: false }, { new: true })


    res.status(200).json(deleteProduct)

  } catch (error) {
    res.status(500).send(`Error server  ${error}`)
  }
}