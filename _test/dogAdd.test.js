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

describe('Dogs add Testing Cases', () => {
  it('add one dog information - fail', async () => {
    const res = await request(app.callback())
      .post('/api/v1/dog/')
      .set({ Authorization: adminToken })  
      .send({
        name: 'test dog',
        image: null,
        breed: 'test dog',
        description: 'test dog',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.user.isAdmin).toEqual(true)
  })
  it('add one dog information - fail', async () => {
    const res = await request(app.callback())
      .post('/api/v1/dog/')
      .set({ Authorization: userToken })  
      .send({
        name: 'test dog',
        image: null,
        breed: 'test dog',
        description: 'test dog',
      })
    expect(res.statusCode).toEqual(401)
    expect(res.body.user.isAdmin).toEqual(false)
  })
  it('add one dog information - fail', async () => {
    const res = await request(app.callback())
      .post('/api/v1/dog/')
      .set({ Authorization: '' })  
      .send({
        name: 'test dog',
        image: null,
        breed: 'test dog',
        description: 'test dog',
      })
    expect(res.statusCode).toEqual(401)
    expect(res.body).toEqual({})
  })
})