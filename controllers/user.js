const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const getUsers = async (req, res) => {
  // const { q, page = 1, limit = 10 } = req.query;
  const { limit = 5, desde = 0 } = req.query
  const query = { state: 1 }

  const [usersTotal, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(parseInt(desde)).limit(parseInt(limit)),
  ])

  res.json({
    usersTotal,
    users,
  })
}

const putUsers = async (req, res) => {
  const { id } = req.params
  const { _id, password, google, ...resto } = req.body

  if (password) {
    //Encriptar password
    const salt = bcrypt.genSaltSync(10)
    resto.password = bcrypt.hashSync(password, salt)
  }

  const userDB = await User.findByIdAndUpdate(id, resto, { new: true })

  res.status(200).json(userDB)
}

const postUsers = async (req, res) => {
  const { name, email, password, role } = req.body
  const user = new User({
    name,
    email,
    password,
    role,
  })

  //Encriptar password
  const salt = bcrypt.genSaltSync(10)
  user.password = bcrypt.hashSync(password, salt)

  await user.save()

  res.status(201).json({ user })
}

const deleteUsers = async (req, res) => {
  const { id } = req.params

  //Fisicamente
  // const user = await User.findByIdAndDelete(id)

  const user = await User.findByIdAndUpdate(id, { state: false }, { new: true })

  res.status(201).json(user)
}

const patchUsers = (req, res) => {
  res.status(201).json({ ok: true, message: 'patch APi - Controller' })
}

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers,
}
