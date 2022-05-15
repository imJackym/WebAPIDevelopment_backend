// Routers <-> Controllers <-> Services <-> Models
// Controller set up business logic

import Dog from '../models/dog.model.js';

// name: { type: String, required: true, unique: true },
// image: { type: String, required: true },
// images: [String],
// breed: { type: String, required: true },
// description: { type: String, required: true },

export const getAllDog = async function (ctx) {
  const dogs = await Dog.find({});
  ctx.body = dogs;
}

export const addNewDog = async function (ctx) {
  try {
    ctx.status = 200
    const newDog = new Dog({
      name: ctx.request.body.name,
      image: ctx.request.body.image,
      breed: ctx.request.body.breed,
      description: ctx.request.body.description,
      status: 200
    });
    let dog = await newDog.save();
  } catch (error) {
    console.log("DB connect error")
    ctx.body = {
      status: ctx.status
    };
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

// export const addNewDog = async function (ctx) {
//   console.log("dog.controller.js :: addNewDog")
//   let result = await DogService.addNewDog(ctx.request.body);
//   console.log(result.acknowledged)
//   if (result.acknowledged) {
//     ctx.status = 200
//     ctx.body = {
//       status : 200,
//       data : result,
//       message : "Added Successfully"
//     }
//   } else {
//     ctx.status = 404
//     ctx.body = "Added Failure"
//   }
// }

// export const getDogById = async function (ctx) {
//   console.log("dog.controller.js :: getDogById");
//   let result = await DogService.getDogById(parseInt(ctx.params.id))
//   if (result.length) {
//     ctx.status = 200
//     ctx.body = {
//       status : 200,
//       data : result,
//       message : "Search by ID Successfully"
//     }
//   } else {
//     ctx.status = 404
//     ctx.body = "Search by ID Failure"
//   }
// }

// export const updateDogById = async function (ctx, next) {
//   console.log("dog.controller.js :: updateDogById");
//   let updateDogInfo = ctx.request.body;
//   let result = await DogService.updateDogById(parseInt(ctx.params.id), updateDogInfo);
//   if (result.modifiedCount != 0) {
//     ctx.status = 200
//     ctx.body = {
//       status : 200,
//       data : result,
//       message : "Updated Successfully"
//     }
//   } else {
//     ctx.status = 404
//     ctx.body = "Updated Failure"
//   }
// }

// export const deleteDogById = async function (ctx, next) {
//   console.log("dog.controller.js :: deleteDogById");
//   let result = await DogService.deleteDogById(parseInt(ctx.params.id));
//   if (result.deletedCount) {
//     ctx.status = 200
//     ctx.body = {
//       status : 200,
//       data : result,
//       message : "Deleted Successfully"
//     }
//   } else {
//     ctx.status = 404
//     ctx.body = "Deleted Failure"
//   }
// }

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