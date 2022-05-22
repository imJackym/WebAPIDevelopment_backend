// Routers <-> Controllers <-> Services <-> Models
// Controller set up business logic

import Dog from '../models/dog.model.js';

export const getAllDog = async function (ctx) {
  console.log("getAllDog")
  const dogs = await Dog.find({});
  let breeds = await Dog.distinct('breed')
  ctx.body = {
    dogs: dogs,
    breeds: breeds
  };
}

export const addNewDog = async function (ctx) {
  console.log("addNewDog")
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
  console.log("getDogById")
  try {
    let dog = await Dog.findOne({ _id: ctx.params.id });
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
  console.log("updateDogById")
  try {
    ctx.status = 200
    let dog = await Dog.findOne({ id: ctx.params.id });
    if (dog) {
      dog.name = ctx.request.body.name
      dog.image = ctx.request.body.image
      // dog.images = ctx.request.body.images
      dog.breed = ctx.request.body.breed
      dog.description = ctx.request.body.description
      dog.adoption = ctx.request.body.adoption
      let dogUpdate = await dog.save();
    }
    ctx.body = {
      status: "updated"
    }
    console.log("udpate")
  } catch (error) {
    ctx.body = {
      status: "connection error please try again later"
    };
    console.log("connection error please try again later")
  }
}

export const search = async function (ctx) {
  console.log("search")
  let dogs = await Dog.find({ name: new RegExp(ctx.params.name, 'i') });
  ctx.body = {
    dogs: dogs,
  }
}

export const deleteDogById = async function (ctx) {
  console.log("deleteDogById")
  ctx.status = 200
  let result = await Dog.findById(ctx.params.id);
  if (result) {
    await result.remove();
  } else {
    ctx.status = 404
    ctx.body = "Deleted Failure"
  }
}

export const filter = async function (ctx) {
  console.log("filter")
  let dogs = await Dog.find({ breed: new RegExp(ctx.params.breed, 'i') });
  ctx.body = {
    dogs: dogs,
  }
}

export const uploadimg = async function (ctx) {
  ctx.body = ctx.req.file.filename
  console.log(`http://localhost:5005/public/images/${ctx.req.file.filename}`)
}