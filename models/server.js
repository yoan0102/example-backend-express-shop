const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersRoutePatch = "/api/users";

    //middlewares
    this.middlewares();

    this.routes();
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
