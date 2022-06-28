const Koa = require('koa')
const cors = require('@koa/cors')
const user = require('./routes/user.route.js')
const dog = require('./routes/dog.route.js')
const mongoose = require('mongoose')
const serve = require('koa-static')
const mount = require('koa-mount')
const staticRouter = require('koa-static-router')

const dotenv = require("dotenv")
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = new Koa();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,                //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(mount('/public/images', serve('./public/images')))

app.use(staticRouter({dir:'docs', router: '/doc/'}))

app.use(user.routes())
app.use(dog.routes())

const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log(`Application is start: `)
  console.log(`http://localhost:${port}`)
});