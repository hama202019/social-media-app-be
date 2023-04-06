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
import { Server } from 'socket.io';
import cors from 'cors';

dotenv.config();

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})
app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
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