import express from 'express';
import './dotenv.js';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';  // log
import bodyParser from 'body-parser'; // 요청정보 처리


// import postRoutes from "./routes/posts.js"   // 내 포스트 보여주는 화면
import uploadRouter from './routes/uploads.js';
import loginRouter from './routes/login.js';
import signupRouter from './routes/signup.js';
import graphRouter from './routes/graphs.js';
import cardRouter from './routes/cards.js';
import userRouter from './routes/user.js'; 
import { authMiddleware } from './middlewares/auth-middleware.js';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;

/* Middleware */
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Routing */
app.use('/api/upload', authMiddleware, uploadRouter);
app.use('/api/login', loginRouter);
app.use('/api/signup', signupRouter);
app.use('/api/user',authMiddleware,userRouter);
app.use('/api/graph', authMiddleware, graphRouter);
app.use('/api/tag', authMiddleware, cardRouter);


// app.get('/api/users/me', authMiddleware, async (req, res) => {
//   const { user } = res.locals;
//   const useId = user.id;
//   console.log('userId :', useId);
//   console.log('현재 로그인한 유저의 local 정보 : ');
//   console.log(user);
//   res.send({
//     user,
//   });
// });


/* session management */
app.get('/api/users/me', authMiddleware, async (req, res) => {
  const { user } = res.locals;
  console.log('현재 로그인한 유저의 local 정보 : ');
  console.log(user);
  res.send({
    user,
  });
});


/* Server */
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

