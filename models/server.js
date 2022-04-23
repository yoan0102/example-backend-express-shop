const express = require('express')
const cors = require('cors')
const { connectionDB } = require('../database/config')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      auth: '/api/auth',
      users: '/api/users',
      categories: '/api/categories',
      products: 'api/products',
    }


    //Connection db
    this.dbConnection()

    //middlewares
    this.middlewares()
    //Routes
    this.routes()
  }

  async dbConnection() {
    await connectionDB()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static('./public'))
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.routes'))
    this.app.use(this.paths.users, require('../routes/user.routes'))
    this.app.use(this.paths.categories, require('../routes/categories.routes'))
    this.app.use(this.paths.products, require('../routes/products.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`El servidor corriendo en el puerto ${this.port}`)
    })
  }
}

module.exports = Server
