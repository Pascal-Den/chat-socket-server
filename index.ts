
import express from 'express'
import http from 'http'
import {Server} from "socket.io";
import cors from 'cors'
import {router} from "./routes/route";
import { handleSocketEvents } from './controllers/handleSocketEvents';

import {helmetConfig} from "./helmetConfig";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(helmetConfig)

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
  serveClient: false,
});

handleSocketEvents(io);


const port = process.env.PORT || 5001;

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});


