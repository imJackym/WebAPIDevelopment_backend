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

describe('Dogs Search Testing Cases', () => {
  it('search one dog information', async () => {
    const res = await request(app.callback())
      .get('/api/v1/dog/search/Vincent')
      .send({})
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toEqual(expectedSearchDog)
  })
})