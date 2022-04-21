// Routers <-> Controllers <-> Services <-> Models
// Models are database interface/query

const db = require('../database/mongodb')
const collection = "test_dog"

exports.getAllDog =  async function () {
  console.log("dog.model.js :: getAllDog")
  let result = await db.run_query(collection)
  console.log(" ==> result :")
  console.log(result)
  return result
}

exports.addNewDog =  async function (dogInfo) {
  console.log("dog.model.js :: addNewDog")
  let result = await db.run_insert(collection, dogInfo)
  console.log(" ==> result :")
  console.log(result)
  return result
}

exports.getDogById =  async function (_id) {
  console.log("dog.model.js :: getDogById :: " + _id)
  let result = await db.run_query(collection, _id)
  console.log(" ==> result :")
  console.log(result)
  return result
}

exports.updateDogById =  async function (_id, updateStatement) {
  console.log("dog.model.js :: getDogById")
  let result = await db.run_update(collection, _id, updateStatement)
  console.log(" ==> result :")
  console.log(result)
  return result
}

exports.deleteDogById =  async function (_id) {
  console.log("dog.model.js :: getDogById")
  let result = await db.run_delete(collection, _id)
  console.log(" ==> result :")
  console.log(result)
  return result
}