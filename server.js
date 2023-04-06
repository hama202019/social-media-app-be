import express from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRouter from './Routes/authRoute.js';
import userRouter from './Routes/userRoute.js';
import postRouter from './Routes/postRoute.js';
import chatRouter from './Routes/chatRoute.js';
import messageRouter from './Routes/messageRoute.js';
import {createServer} from 'http'
import cors from 'cors';
import initSocket from './socket.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

initSocket(httpServer);

app.use(bodyParser.json({limit: '30mb'}));
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        httpServer.listen(process.env.PORT, () => console.log("the server is up, listening on port ",process.env.PORT))
    }).catch(e => console.log(e));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);