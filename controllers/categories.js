const { response } = require('express')
const { Category } = require('../models')


exports.getCategories = async (req, res = response) => {
  try {
    const { limit = 5, desde = 0 } = req.query
    const query = { state: true }

    const [totalCategories, categories] = await Promise.all([
      Category.countDocuments(query),
      Category.find(query).skip(parseInt(desde)).limit(parseInt(limit)).populate('user')
    ])

    res.status(200).json({
      totalCategories,
      categories
    })

  } catch (error) {
    res.status(500).json({ msg: `Error server ${error}` })
  }



}
exports.getCategory = async (req, res = response) => {
  try {
    const { id } = req.params
    const category = await Category.findById(id).populate('user')

    res.status(200).json(category)

  } catch (error) {
    res.status(500).json({ msg: `Error server ${error}` })
  }
}
//Todo: refactor
exports.createCategory = async (req, res = response) => {

  const name = req.body.name.toUpperCase()

  const categoriaDb = await Category.findOne({ name })

  if (categoriaDb) {
    return res.status(400).json({
      msg: `Category ${categoriaDb.name}, it ready exist`
    })
  }

  const data = {
    name,
    user: req.user._id
  }

  const category = await new Category(data)

  await category.save()

  res.status(201).json(category)

}
exports.putCategory = async (req, res = response) => {
  try {
    const { id } = req.params
    const name = req.body.name.toUpperCase()

    const category = await Category.findByIdAndUpdate(id, { name: name }, { new: true })
    res.status(200).json(category)

  } catch (error) {
    res.status(500).json({ msg: `Error server ${error}` })
  }
}

//Todo:  id - state:false
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params

    await Category.findByIdAndUpdate(id, { state: false })

    res.status(201).json({ msg: 'User deleted successfully' })

  } catch (error) {
    res.status(500).json({ msg: `Error server ${error}` })
  }
}

