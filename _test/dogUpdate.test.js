const request = require('supertest')
require('dotenv').config()
const bodyParser = require('koa-bodyparser')
const Koa = require('koa')
const app = new Koa()
app.use(bodyParser())

const cors = require('@koa/cors')
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,                //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

const serve = require('koa-static')
const mount = require('koa-mount')
app.use(mount('/public/images', serve('./public/images')))

const staticRouter = require('koa-static-router')
app.use(staticRouter({ dir: 'docs', router: '/doc/' }))

const dog = require('../routes/dog.route.js')
app.use(dog.routes())

const user = require('../routes/user.route.js')
app.use(user.routes())

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const utils = require('../utils')

const adminToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhhMGQxMTM5Zjg2NjhmYzExMTI5MzQiLCJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NTYzNzk0MjQsImV4cCI6MTY1ODk3MTQyNH0.yUoiNP9E15ea1Rqn3NkKUO58Qouu0YdA5mDJWG3t5ug'
const userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhhMGRhMjM5Zjg2NjhmYzExMTI5NjQiLCJuYW1lIjoidXNlciIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTYzNjI3MjAsImV4cCI6MTY1ODk1NDcyMH0.QNmToNZocsgL7-9fUjJMy-O94S1oFxoSTcesdmXIbGg'
const expectedAllDogs = {
  "dogs": [
    {
      "_id": "6289f075f2f0ccbc448b1a71",
      "name": "Vincent",
      "image": "dog2.jpg",
      "breed": "brittany spaniel",
      "description": "mother dog",
      "adoption": false,
      "createdAt": "2022-05-22T08:12:37.664Z",
      "updatedAt": "2022-05-22T08:12:37.664Z",
      "__v": 0
    },
    {
      "_id": "6289fb882e1ec54b08c1de8c",
      "name": "Louis",
      "image": "dog3.jpg",
      "breed": "papillon",
      "description": "",
      "adoption": false,
      "createdAt": "2022-05-22T08:59:52.687Z",
      "updatedAt": "2022-05-22T08:59:52.687Z",
      "__v": 0
    },
    {
      "_id": "628a046b9b3b8e49a8212d00",
      "name": "Jason",
      "image": "dog1.jpg",
      "breed": "pitbull",
      "description": "",
      "adoption": false,
      "createdAt": "2022-05-22T09:37:47.196Z",
      "updatedAt": "2022-05-22T09:37:47.196Z",
      "__v": 0
    }
  ],
  "breeds": [
    "brittany spaniel",
    "papillon",
    "pitbull"
  ]
}
const expectedDog = {
  "_id": "6289f075f2f0ccbc448b1a71",
  "name": "Vincent",
  "image": "dog2.jpg",
  "breed": "brittany spaniel",
  "description": "mother dog",
  "adoption": false,
  "createdAt": "2022-05-22T08:12:37.664Z",
  "updatedAt": "2022-05-22T08:12:37.664Z",
  "__v": 0
}
const expectedSearchDog = {
  dogs: [{
    "_id": "6289f075f2f0ccbc448b1a71",
    "name": "Vincent",
    "image": "dog2.jpg",
    "breed": "brittany spaniel",
    "description": "mother dog",
    "adoption": false,
    "createdAt": "2022-05-22T08:12:37.664Z",
    "updatedAt": "2022-05-22T08:12:37.664Z",
    "__v": 0
  }]
}

describe('Dogs info. Update Testing Cases', () => {

  it('update one dog information', async () => {
    const res = await request(app.callback())
      .post('/api/v1/dog/62bb03963ce259ec54916674')
      .set({ Authorization: adminToken })
      .send({
        name: 'test dog',
        image: '',
        breed: 'test',
        description: 'test',
        adoption: false
      })
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
  })

  it('update one dog information - fail', async () => {
    const res = await request(app.callback())
      .post('/api/v1/dog/62bb03963ce259ec54916674')
      .set({ Authorization: userToken })
      .send({
        name: 'test dog',
        image: '',
        breed: 'test',
        description: 'test',
        adoption: false
      })
    expect(res.statusCode).toEqual(401)
    expect(res.type).toEqual("application/json")
  })

})