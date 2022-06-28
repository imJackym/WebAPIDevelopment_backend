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

const adminToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhhMGQxMTM5Zjg2NjhmYzExMTI5MzQiLCJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NTYzNzk0MjQsImV4cCI6MTY1ODk3MTQyNH0.yUoiNP9E15ea1Rqn3NkKUO58Qouu0YdA5mDJWG3t5ug'
const userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhhMGRhMjM5Zjg2NjhmYzExMTI5NjQiLCJuYW1lIjoidXNlciIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTYzNjI3MjAsImV4cCI6MTY1ODk1NDcyMH0.QNmToNZocsgL7-9fUjJMy-O94S1oFxoSTcesdmXIbGg'

describe('Dogs Delete Testing Cases', () => {
  it('delete one dog', async () => {
    const res = await request(app.callback())
      .post('/api/v1/dog/delete/62bb35ab6a26a0acb968c01e')
      .set({ Authorization: adminToken })
      .send({})
    expect(res.statusCode).toEqual(200)
  })

  it('delete one dog - fail', async () => {
    const res = await request(app.callback())
      .post('/api/v1/dog/delete/6289f075f2f0ccbc448b1a71')
      .set({ Authorization: userToken })
      .send({})
    expect(res.statusCode).toEqual(401)
  })
})