const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.validateJwt = async (req = request, res = response, next) => {
  const token = req.header('x-token')

  if (!token) {
    returnres.status(401).json({ msg: 'Token obligatorio' })
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY)

    const user = await User.findById(uid)

    if (!user) {
      return res
        .status(401)
        .json({ msg: 'Tojen no válido - user not exist! DB' })
    }

    if (!user.state) {
      res.status(401).json({
        msg: 'Token no valido - user desactivado',
      })
    }
    req.user = user

    next()
  } catch (error) {
    res.status(401).json({ msg: 'token no válido' })
  }
}
