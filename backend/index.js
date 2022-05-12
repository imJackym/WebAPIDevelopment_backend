import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// import userRouter from './routes/userRoutes.js';
// import dogRouter from './routes/dogRoutes.js';

dotenv.config();


console.log("process.env.MONGODB_URI : " + process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// app.use('/api/users', userRouter);
// app.use('/api/dogs', dogRouter);

const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
  console.log(`serve at http://localhost:${port}/api/v1/user`);
  console.log(`serve at http://localhost:${port}/api/v1/dog`);
});
