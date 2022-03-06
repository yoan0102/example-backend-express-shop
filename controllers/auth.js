const express = require('express')


const login = (req, res, next)=> {
  res.json({
    msg: 'Login ok'
  })
}


module.exports = {
  login
}