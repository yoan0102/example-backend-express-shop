const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is obligatorio"],
  },
  email: {
    type: String,
    required: [true, "Email is obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is obligatorio"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    reuired: true,
    enum: ["ADMIN_ROLE", "USER_ROLE", "VENTAS_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);
