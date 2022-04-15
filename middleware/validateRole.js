const { response, request } = require('express')

exports.isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res
      .status(500)
      .json({ msg: 'Se queire validar role sin verificar token' })
  }

  const { role, name } = req.user

  if (role !== 'ADMIN_ROLE')
    return res.status(401).json({ msg: `${name} no es admin` })

  next()
}

exports.haveRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res
        .status(500)
        .json({ msg: 'Se queire validar role sin verificar token' })
    }
    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ msg: `El servicio requeire unos de estos roles ${roles}` })
    }
    next()
  }
}
