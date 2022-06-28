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

const expectedLoginFail = { status: "Submit Fail. Please try again later" }
const expectedRegisterFail = { status: 400 }
const expectedFavouriteList = { favlist: ["6289f075f2f0ccbc448b1a71"] }
const dummyToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhhMGRhMjM5Zjg2NjhmYzExMTI5NjQiLCJuYW1lIjoidXNlciIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTYzNjI3MjAsImV4cCI6MTY1ODk1NDcyMH0.QNmToNZocsgL7-9fUjJMy-O94S1oFxoSTcesdmXIbGg'

describe('Login Authentication Testing Cases', () => {

  it('login test - Admin', async () => {
    const res = await request(app.callback())
      .post('/api/v1/user/login')
      .auth('admin', '123')
      .send({ username: 'admin', password: '123' })
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body.name).toEqual("admin")
  })

  it('login test - User', async () => {
    const res = await request(app.callback())
      .post('/api/v1/user/login')
      .auth('user', '123')
      .send({ username: 'user', password: '123' })
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body.name).toEqual("user")
  })

  it('login test - fail', async () => {
    const res = await request(app.callback())
      .post('/api/v1/user/login')
      .auth('admin', '222')
      .send({ username: 'admin', password: '222' })
    expect(res.type).toEqual("application/json")
    expect(res.body).toEqual(expectedLoginFail)
  })
})
