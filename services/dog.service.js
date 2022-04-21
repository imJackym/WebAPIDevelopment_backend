// Routers <-> Controllers <-> Services <-> Models
// Services are db massage

var DogModel = require('../models/dog.model')

exports.getAllDog = async function (){ //OK！
  console.log("dog.service.js :: getAllDog")
  try {
    var dog = await DogModel.getAllDog()
    return dog;
  } catch (error) {
    throw Error('Error')
  }
}

exports.addNewDog = async function (dogInfo){
  console.log("dog.service.js :: addNewDog")
  try {
    var dog = await DogModel.addNewDog(dogInfo)
    return dog;
  } catch (error) {
    throw Error('Error')
  }
}

exports.getDogById = async function (dogId){
  console.log("dog.service.js :: getDogById")
  let _id = { id: dogId }
  try {
    var dog = await DogModel.getDogById(_id)
    return dog
  } catch (error) {
    throw Error('Error')
  }
}

exports.updateDogById = async function (dogId, dogInfo){
  console.log("dog.service.js :: updateDogById")
  let _id = { id: dogId }
  let updateStatement = { $set: dogInfo }
  // var id = { address: "Valley 345" };
  // var ctx.request.body = { $set: {name: "Mickey", address: "Canyon 123" } };
  try {
    var dog = await DogModel.updateDogById(_id, updateStatement)
    return dog
  } catch (error) {
    throw Error('Error')
  }
}

exports.deleteDogById = async function (dogId){
  console.log("dog.service.js :: updateDogById")
  let _id = { id: dogId }
  try {
    var dog = await DogModel.deleteDogById(_id)
    return dog
  } catch (error) {
    throw Error('Error')
  }
}