import express from "express";
import './dotenv.js';
import http from "http";
import cors from "cors";

// import postRoutes from "./routes/posts.js"   // 내 포스트 보여주는 화면
import uploadRouter from "./routes/uploads.js"  // 사진 업로드 화면

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;


/* Middleware */
app.use(express.json());
app.use(cors());
app.use('/static', express.static('static'));   //  가상경로 지정. http://localhost:8000/static/파일명.jpg


/* Routing */
app.use("/upload", uploadRouter);


/* Server */
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})