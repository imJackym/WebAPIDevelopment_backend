import Koa from 'koa'
import cors from '@koa/cors'
import user from './routes/user.route.js'
import dog from './routes/dog.route.js'
import mongoose from 'mongoose'
import serve from 'koa-static'
import mount from 'koa-mount'
import staticRouter from 'koa-static-router'

import dotenv from "dotenv"
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