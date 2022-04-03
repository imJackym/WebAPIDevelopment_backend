// Routers <-> Controllers <-> Services <-> Models
// Services are db massage

var UserModel = require('../models/user.model')

exports.getAllUser = async function (name) {
  console.log("user.service.js :: getAllUser")
  console.log("user.service.js :: getAllUser " + name)
  try {
    var users = await UserModel.getAllUser()
    return users;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users')
  }
}

exports.getUserLogin = async function (query, page, limit) {
  console.log("UserModel :: getUserLogin")
  // try {
  //   var users = await UserModel.find(query)
  //   return users;
  // } catch (e) {
  //   // Log Errors
  //   throw Error('Error while Paginating Users')
  // }
}

exports.findOne = async function (id) {
  console.log("UserModel :: postUserRegister")
  try {
    var users = await UserModel.findOneByEmail(id)
    return users;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users')
  }
}

exports.save = async function (id) {
  console.log("UserModel :: postUserRegister")
  try {
    var users = await UserModel.findOneByEmail(id)
    return users;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users')
  }
}