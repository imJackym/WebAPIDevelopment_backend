// Routers <-> Controllers <-> Services <-> Models
// Models are database interface/query

const db = require('../database/mongodb')

exports.getAllUser =  async function  () {
  console.log("user.model.js :: getAllUser")
  let result = await db.run_insert('customer', {})
  return result
}

exports.getUserLogin = async function (userName, userPassword) {
  console.log("user.model.js :: getUserLogin")
  // console.log("param : userName : " + userName)
  // console.log("param : userPassword : " + userPassword)
  // let query = 'select * from user where username = ? and password = ?;'
  // let result = await db.run_query(query, [username, userPassword])
  // return result
}

exports.findOneByEmail = async function (id) {
  console.log("user.model.js :: findOneByEmail")
  let result = await db.find('customer', {customer_id: id})
  return result
}