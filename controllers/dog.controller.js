// Routers <-> Controllers <-> Services <-> Models
// Controller set up business logic

var DogService = require('../services/dog.service');

exports.getAllDog = async function (ctx) {
  console.log("dog.controller.js :: getAll");
  let result = await DogService.getAllDog();
  if (result.length) {
    ctx.status = 200
    ctx.body = {
      status : 200,
      data : result,
      message : "Found/Searched Successfully"
    }
  } else {
    ctx.status = 404
    ctx.body = "Found/Searched Failure"
  }
}

// exports.validateArticle = async function (ctx, next) {
//   const validationOptions = { throwError: true, allowUnknownAttributes: false }
//   const body = ctx.request.body

//   try {
//     v.validate(body, schema, validationOptions)
//     await next()
//   } catch (error) {
//     if (error instanceof ValidationError) {
//       ctx.body = error
//       ctx.status = 400      
//     } else {
//       throw error
//     }
//   }
// }

exports.addNewDog = async function (ctx) {
  console.log("dog.controller.js :: addNewDog")
  let result = await DogService.addNewDog(ctx.request.body);
  if (result.length) {
    ctx.status = 200
    ctx.body = {
      status : 200,
      data : result,
      message : "Added Successfully"
    }
  } else {
    ctx.status = 404
    ctx.body = "Added Failure"
  }
}

exports.getDogById = async function (ctx) {
  console.log("dog.controller.js :: getDogById");
  let result = await DogService.getDogById(parseInt(ctx.params.id))
  if (result.length) {
    ctx.status = 200
    ctx.body = {
      status : 200,
      data : result,
      message : "Search by ID Successfully"
    }
  } else {
    ctx.status = 404
    ctx.body = "Search by ID Failure"
  }
}

exports.updateDogById = async function (ctx, next) {
  console.log("dog.controller.js :: updateDogById");
  let updateDogInfo = ctx.request.body;
  let result = await DogService.updateDogById(parseInt(ctx.params.id), updateDogInfo);
  if (result.length) {
    ctx.status = 200
    ctx.body = {
      status : 200,
      data : result,
      message : "Updated Successfully"
    }
  } else {
    ctx.status = 404
    ctx.body = "Updated Failure"
  }
}

exports.deleteDogById = async function (ctx, next) {
  console.log("dog.controller.js :: deleteDogById");
  let result = await DogService.deleteDogById(parseInt(ctx.params.id));
  if (result.length) {
    ctx.status = 200
    ctx.body = {
      status : 200,
      data : result,
      message : "Deleted Successfully"
    }
  } else {
    ctx.status = 404
    ctx.body = "Deleted Failure"
  }
}

// function validateResult(result, errorComment) {
//   if (result.length) {
//     ctx.status = 200
//     ctx.body = result
//   } else {
//     ctx.status = 404
//     ctx.body = "getById not fount"
//     console.log("getById not fount")
//   }
// }