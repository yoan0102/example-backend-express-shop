const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //middlewares
    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(express.static("./public"));
  }

  routes() {
    this.app.get("/api", (req, res) => {
      res.json({ ok: true, message: "get Api" });
    });
    this.app.put("/api", (req, res) => {
      res.json({ ok: true, message: "put Api" });
    });
    this.app.post("/api", (req, res) => {
      res.json({ ok: true, message: "post APi" });
    });
    this.app.delete("/api", (req, res) => {
      res.json({ ok: true, message: "delete Api" });
    });
    this.app.patch("/api", (req, res) => {
      res.json({ ok: true, message: "patch Api" });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`El servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
