const express = require("express");

const getUsers = (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;
  res.json({
    ok: true,
    message: "get Api - Controller",
    q,
    page,
    limit,
  });
};

const putUsers = (req, res) => {
  const id = req.params.id;
  res.status(400).json({ ok: true, message: "put Api - Controller", id });
};

const postUsers = (req, res) => {
  const { name, age } = req.body;
  res.status(201).json({ name, age, message: "post APi - Controller" });
};
const deleteUsers = (req, res) => {
  res.status(201).json({ ok: true, message: "delete APi - Controller" });
};
const patchUsers = (req, res) => {
  res.status(201).json({ ok: true, message: "patch APi - Controller" });
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers,
};
