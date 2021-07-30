const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //middlewares

    this.routes();
  }

  middlewares() {}

  routes() {
    this.app.get("/", (req, res) => {
      res.send("HEllo World");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`El servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
