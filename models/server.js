const express = require("express");
const cors = require("cors");
const { connectionDB } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersRoutePatch = "/api/users";

    //Connection db
    this.dbConnection();

    //middlewares
    this.middlewares();

    this.routes();
  }

  async dbConnection() {
    await connectionDB();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("./public"));
  }

  routes() {
    this.app.use(this.usersRoutePatch, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`El servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
