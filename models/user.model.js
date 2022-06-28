const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    favlist: [String]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('users', userSchema);
module.exports = User;