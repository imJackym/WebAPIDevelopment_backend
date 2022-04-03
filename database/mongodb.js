const { MongoClient }   = require('mongodb');
const mongoConfig       = require('./config')

const mongo_username    = mongoConfig.configMongo.user    // "shapeapi"
const mongo_password    = mongoConfig.configMongo.pwd     // "shapeapipw"
const mongo_host        = mongoConfig.configMongo.host    // "cluster0.bfapt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const DATABASE_NAME     = mongoConfig.configMongo.dbname  // "testDB"

const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@${mongo_host}`
// mongodb+srv://shapeapi:shapeapipw@cluster0.bfapt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

exports.run_query = async function run_query(collection, query) {
  // console.log(" /// run_query /// mongo_username : " + mongo_username)
  // console.log(" /// run_query /// mongo_password : " + mongo_password)
  // console.log(" /// run_query /// mongo_host : " + mongo_host)
  // console.log(" /// run_query /// DATABASE_NAME : " + DATABASE_NAME)
  console.log(" mongodb.js /// CONNECTION_URI : " + CONNECTION_URI)
  const dbClient = await MongoClient.connect(CONNECTION_URI)
  const result = await dbClient.db(DATABASE_NAME).collection(collection).find(query).toArray()
  console.log(" mongodb.js :: result")
  return result
}

exports.run_insert = async function run_insert(collection, document) {
  const dbClient = await MongoClient.connect(CONNECTION_URI)
  const result = await dbClient.db(DATABASE_NAME).collection(collection).insertOne(document)
  return { "status": 201, "description": "Data insert successfully" }
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