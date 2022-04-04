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

  const dbClient = await MongoClient.connect(CONNECTION_URI)
  var result = await dbClient.db(DATABASE_NAME).collection(collection).find(element).toArray()
  dbClient.close();
  console.log("------------------------------------------------------------")
  return result
}

exports.run_insert = async function (collection, element) {
  console.log("------------------------------------------------------------")
  console.log("mongodb.js :: run_insert => || element : ");
  console.log(element)

  const dbClient = await MongoClient.connect(CONNECTION_URI)

  // console.log(document)         // var element = { name: "Company Inc", address: "Highway 37" };
  var doc = { id: 5, name: 'test dogee' }
  var result = await dbClient.db(DATABASE_NAME).collection(collection).insertOne(doc)
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
  // console.log(element2)               // var element2 = { $set: {name: "Mickey", address: "Canyon 123" } };
  // let doc = {
  //   $set: {
  //     name: 'test dogee'
  //   },
  // };

  const dbClient = await MongoClient.connect(CONNECTION_URI)
  var result = await dbClient.db(DATABASE_NAME).collection(collection).updateOne(element1, element2)
  dbClient.close();
  console.log("------------------------------------------------------------")
  return result
}

exports.run_delete = async function (collection, element) {
  console.log("------------------------------------------------------------")
  console.log("mongodb.js :: run_update => || element : ");
  console.log(element)

  const dbClient = await MongoClient.connect(CONNECTION_URI)
  var result = await dbClient.db(DATABASE_NAME).collection(collection).deleteOne(element)
  dbClient.close();
  console.log("------------------------------------------------------------")
  return result
}

// async function main() {

//   const uri = CONNECTION_URI
//   // "mongodb+srv://shapeapi:shapeapipw@cluster0.bfapt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     await listDatabases(client);
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }

//   const dbClient = await MongoClient.connect(CONNECTION_URI)
//   const result = await dbClient.db(DATABASE_NAME).collection(collection).find(query).toArray()
//   console.log(" /// run_query ")
//   console.log(result)
//   return result
// }

// async function listDatabases(client) {
//   const databasesList = await client.db().admin().listDatabases();
//   console.log("Databases:");
//   databasesList.databases.forEach(db => {
//     console.log(`- ${db.name}`);
//   })
// }

// main().catch(console.error);