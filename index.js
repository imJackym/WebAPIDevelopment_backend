const Koa = require('koa')

const app = new Koa();

// app.use(ctx => {
//   ctx.body = "Welcome to Koa"
// });

// const special = require('./routes/special')
// const articles = require('./routes/articles')
const user = require('./routes/user.route')
const dog = require('./routes/dog.route')

// app.use(special.routes())
// app.use(articles.routes())
app.use(user.routes())
app.use(dog.routes())

app.listen(3000);
console.log("Application is start: http://localhost:3000")
console.log("http://localhost:3000/api/v1/users/")
console.log("http://localhost:3000/api/v1/dog/")

