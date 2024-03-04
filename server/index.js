const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messagesRoute');
const postsRoutes = require('./routes/postRoute');

// const geminiRoutes = require('./routes/geminiRoute');

const app = express(); // node js 프레임 워크
require('dotenv').config(); // .env 가져오기

app.use(cors()); // 요청 범위 설정(보안, 필수)
app.use(express.json());

// mongoDB 연결
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connection Successfull');
  })
  .catch((err) => {
    console.log(err.message);
  });

// front 연결
app.use('/api/auth', userRoutes); //user 부분 연결
app.use('/api/messages', messageRoutes); //message 부분 연결
app.use('/api/posts', postsRoutes); //message 부분 연결
// app.use('/api/geminiall', geminiRoutes);

// server 열기
const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on Port ${process.env.PORT}`);
});
