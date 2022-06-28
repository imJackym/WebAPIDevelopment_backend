// Routers <-> Controllers <-> Services <-> Models
// Controller set up business logic

const User = require('../models/user.model.js')
const bcrypt = require('bcryptjs')
const { isAuth, isAdmin, generateToken } = require('../utils.js')

// signin
exports.login = async (ctx) => {
  let user = await User.findOne({ name: ctx.request.body.username });
  if (user) {
    if (bcrypt.compareSync(ctx.request.body.password, user.password)) {
      ctx.status = 200
      ctx.body = {
        name: user.name,
        isAdmin: user.isAdmin,
        token: generateToken(user),
        status: 200
      };
    } else {
      ctx.status = 404
      ctx.body = { status: "Submit Fail. Please try again later" }
    }
  } else {
    ctx.status = 404
    ctx.body = "not found"
  }
}

// register
exports.register = async (ctx) => {
  try {
    let userV = await User.findOne({
      name: ctx.request.body.name,
    });
    let isAdmin = false
    if (ctx.request.body.icode === "admin"){
      isAdmin = true
    }
    if (userV === null) {
      ctx.status = 200
      const newUser = new User({
        fname: ctx.request.body.fname,
        lname: ctx.request.body.lname,
        name: ctx.request.body.name,
        isAdmin: isAdmin,
        password: bcrypt.hashSync(ctx.request.body.password),
      });
      let user = await newUser.save();
      ctx.body = {
        status: "register"
      };
    } else {
      ctx.status = 205
      ctx.body = {
        status: "duplicate"
      };
    }
  } catch (error) {
    ctx.body = {
      status: 400
    };
  }

}

exports.getfavlist = async (ctx) => {
  ctx.status = 200
  let user = await User.findOne({ name: ctx.request.body.name, })
  ctx.body = { favlist: user.favlist }
}

exports.favlist = async (ctx) => {
  ctx.status = 200
  let user = await User.findOne({ name: ctx.request.body.name, })
  user.favlist[user.favlist.length] = ctx.params.id
  await user.save();
}

exports.refavlist = async (ctx) => {
  ctx.status = 200
  let user = await User.findOne({ name: ctx.request.body.name, })
  const index = user.favlist.indexOf(ctx.params.id);
  if (index > -1) {
    user.favlist.splice(index, 1);
  }
  user.favlist = user.favlist
  await user.save();
}