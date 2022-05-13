const { MongoClient } = require('mongodb');
const mongoConfig = require('./config')

const mongo_username = mongoConfig.configMongo.user    // "shapeapi"
const mongo_password = mongoConfig.configMongo.pwd     // "shapeapipw"
const mongo_host = mongoConfig.configMongo.host    // "cluster0.bfapt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const DATABASE_NAME = mongoConfig.configMongo.dbname  // "testDB"

const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@${mongo_host}`
// mongodb+srv://shapeapi:shapeapipw@cluster0.bfapt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

exports.run_query = async function (collection, element) {
  console.log("------------------------------------------------------------")
  console.log("mongodb.js :: run_query => || element : ");
  console.log(element)
  try {
    var dbClient = await MongoClient.connect(CONNECTION_URI)
  } catch (error) {
    console.log("mongodb.js :: connection error")
  }
  try {
    var result = await dbClient.db(DATABASE_NAME).collection(collection).find(element).toArray()
  } catch (error) {
    console.log("mongodb.js :: result not found")
  }
  dbClient.close();
  console.log("------------------------------------------------------------")
  return result
}

exports.run_insert = async function (collection, element) {
  console.log("------------------------------------------------------------")
  console.log("mongodb.js :: run_insert => || element : ");
  console.log(element)
  try {
    var dbClient = await MongoClient.connect(CONNECTION_URI)
  } catch (error) {
    console.log("mongodb.js :: connection error")
  }
  // var doc = { id: 5, name: 'test dogee' }
  try {
    var result = await dbClient.db(DATABASE_NAME).collection(collection).insertOne(element)
  } catch (error) {
    console.log("mongodb.js :: result not found")
  }
  dbClient.close();
  console.log("------------------------------------------------------------")
  return result
}

exports.run_update = async function (collection, element1, element2) {
  console.log("------------------------------------------------------------")
  console.log("mongodb.js :: run_update => || element : ");
  console.log(element1)
  console.log(element2)
  // console.log(element1)               // var element1 = { address: "Valley 345" };
  // console.log(element2)               
  // var element2 = { $set: {name: "Mickey", address: "Canyon 123" } };
  // let doc = {
  //   $set: {
  //     name: 'test dogee'
  //   },
  // };
  try {
    var dbClient = await MongoClient.connect(CONNECTION_URI)
  } catch (error) {
    console.log("mongodb.js :: connection error")
  }
  try {
    var result = await dbClient.db(DATABASE_NAME).collection(collection).updateOne(element1, element2)
  } catch (error) {
    console.log("mongodb.js :: result not found")
  }
  dbClient.close();
  console.log("------------------------------------------------------------")
  return result
}

exports.run_delete = async function (collection, element) {
  console.log("------------------------------------------------------------")
  console.log("mongodb.js :: run_delete => || element : ");
  console.log(element)
  try {
    var dbClient = await MongoClient.connect(CONNECTION_URI)
  } catch (error) {
    console.log("mongodb.js :: connection error")
  }
  try {
    var result = await dbClient.db(DATABASE_NAME).collection(collection).deleteOne(element)
  } catch (error) {
    console.log("mongodb.js :: result not found")
  }
  dbClient.close();
  console.log("------------------------------------------------------------")
  return result
}

async function main() {

  const uri = CONNECTION_URI
  // "mongodb+srv://shapeapi:shapeapipw@cluster0.bfapt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await listDatabases(client);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }

  // console.log("------------------------------------------------------------")
  // console.log("mongodb.js :: run_insert => || element : ");

  // var dbClient = await MongoClient.connect(CONNECTION_URI)

  // // console.log(document)         // var element = { name: "Company Inc", address: "Highway 37" };
  // var doc = { id: 5, name: 'test dogee' }
  // console.log(doc)
  // var result = await dbClient.db(DATABASE_NAME).collection("testDB").insertOne(doc)
  // dbClient.close();
  // console.log("------------------------------------------------------------")
  // console.log(result)
  // return result
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db => {
    console.log(`- ${db.name}`);
  })
}

main().catch(console.error);