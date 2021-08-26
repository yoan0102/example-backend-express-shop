const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

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

const putUsers = async (req, res) => {
  const { id } = req.params;
  const { password, google, ...resto } = req.body;

  if (password) {
    //Encriptar password
    const salt = bcrypt.genSaltSync(10);
    resto.password = bcrypt.hashSync(password, salt);
  }

  const userDB = await User.findByIdAndUpdate(id, resto);

  res.status(200).json({ ok: true, message: "put Api - Controller", userDB });
};

const postUsers = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({
    name,
    email,
    password,
    role,
  });

  //Encriptar password
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);

  await user.save();

  res.status(201).json({ user });
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
