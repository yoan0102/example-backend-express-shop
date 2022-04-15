const Role = require('../models/role')
const User = require('../models/user')

const isRoleValido = async (role = '') => {
  const issetRole = await Role.findOne({ role })
  if (!issetRole) {
    throw new Error(`El role ${role} no está registrado en la BD`)
  }
}

const issetEmail = async (email = '') => {
  //verificar Email
  const emailRes = await User.findOne({ email })
  if (emailRes) {
    throw new Error(`El email ${email}, ya esta registrado`)
  }
}

const issetUserId = async (id) => {
  //verificar Email
  const issetUser = await User.findById(id)
  if (!issetUser) {
    throw new Error(`El user ${id} no existe`)
  }
}

module.exports = {
  isRoleValido,
  issetEmail,
  issetUserId,
}
