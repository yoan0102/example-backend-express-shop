const { response } = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { generateToken } = require('../helpers/generate-token')

const login = async (req, res = response, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res
        .status(400)
        .json({ msg: 'User and Password no son correctos - email' })
    }

    if (user.state === false) {
      return res
        .status(400)
        .json({ msg: 'User and Password no son correctos - estado: false' })
    }

    const validPassword = bcrypt.compareSync(password, user.password)

    if (!validPassword) {
      return res
        .status(400)
        .json({ msg: 'User and Password no son correctos - password' })
    }

    const token = await generateToken(user.id)

    res.json({
      user,
      token,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Hable con el administrador' })
  }
}

module.exports = {
  login,
}
