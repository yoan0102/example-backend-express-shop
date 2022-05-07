const { response } = require('express')


exports.uploadFile = (req, res = response) => {


  res.json({
    msg: 'Hola MUndo Uploads'
  })
}