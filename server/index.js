import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import ChatRoute from './Routes/ChatRoute.js';
import MessageRoutes from './Routes/MessageRoutes.js';
const app=express();

app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))

dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening at ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));


  app.use('/auth',AuthRoute)
  app.use('/user',UserRoute)   
  app.use('/post',PostRoute)
  app.use('/chat',ChatRoute)
  app.use('/messages',MessageRoutes)