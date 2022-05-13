// Routers <-> Controllers <-> Services <-> Models
// Controller set up business logic

var UserService = require('../services/user.service');

exports.getAllUser = async function (content) {
  console.log("user.controller.js :: getAllUser");
  var name = "12345647897";
  let result = await UserService.getAllUser(name);

  console.log("return => result");
  console.log(result);
  console.log("--- end of return ---");

  if (result.length) {
    content.status = 200
    content.body = result
  } else {
    content.status = 404
    content.body = "Login Fail"
    console.log("Login Fail")
  }
}

exports.getUserLogin = async function (ctx) {
  console.log("UserController :: getUserLogin")
  console.log("ctx.param.userName, " + ctx.param.userName);
  console.log("ctx.param.userPassword, " + ctx.param.userPassword);

  let result = await UserService.getUserLogin(ctx.param.userName, ctx.param.userPassword);

  console.log("return => result");
  console.log(result);
  console.log("--- end of return ---");

  if (result.length) {
    ctx.body = result;
    console.log("Login Success")
  } else {
    cnx.status = 404
    ctx.body = "Login Fail"
    console.log("Login Fail")
  }
}

exports.postUserRegister = async function (ctx, next) {
  const { name, id, password } = ctx.request.body;
  console.log("UserController :: postUserRegister")
  console.log("ctx.param.userName, " + name);
  console.log("ctx.param.userId, " + id);
  console.log("ctx.param.userPassword, " + password);

  if (name && id && password) {
    let userResult = await UserService.findOne({ id });
    if (!userResult) {
      user = new UserService({name, email});
      user.password = user.generateHash(password);
      await UserService.createUser();

      ctx.passport = {
        user: user._id,
      };

      console.log(ctx.passport)

      await next();

    } else {
      ctx.status = 400;
      ctx.body = { status: 'error', message: 'E-mail already registered' };
    }
  } else {
    ctx.status = 400;
    ctx.body = { status: 'error', message: 'Invalid email or password' };
  }

  // let result = await UserService.postUserRegister(name, email, password)

  // console.log("return => result");
  // console.log(result);
  // console.log("--- end of return ---");

  // if (result.length) {
  //   ctx.body = result;
  //   console.log("Register Success")
  // } else {
  //   cnx.status = 404
  //   ctx.body = "Register Fail"
  //   console.log("Register Fail")
  // }
}