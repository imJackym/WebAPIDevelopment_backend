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

export const getDogById = async function (ctx) {
  try {
    console.log("getDpg : " + ctx.params.id)
    let dog = await Dog.findOne({ _id: ctx.params.id });
    console.log(dog)
    ctx.status = 200
    ctx.body = dog
  } catch (error) {
    console.log("DB connect error")
    ctx.body = {
      status: ctx.status
    };
  }
}

export const updateDogById = async function (ctx) {
  console.log("dog.controller.js :: updateDogById : " + ctx.params.id);
  // let updateDogInfo = ctx.request.body;
  try {
    ctx.status = 200
    let dog = await Dog.findOne({ id: ctx.params.id });
    if (dog) {
      dog.name = ctx.request.body.name
      dog.image = ctx.request.body.image
      dog.images = ctx.request.body.images
      dog.breed = ctx.request.body.breed
      dog.description = ctx.request.body.description
      dog.adoption = ctx.request.body.adoption
      await dog.save();
      ctx.body = {
        status: "updated"
      };
      console.log("udpate")
    }
  } catch (error) {
    ctx.body = {
      status: "connection error please try again later"
    };
    console.log("connection error please try again later")
  }
}


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