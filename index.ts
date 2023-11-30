
import express from 'express'
import http from 'http'
import {Server} from "socket.io";
import cors from 'cors'
import {router} from "./src/routes/route";
import { handleSocketEvents } from './src/controllers/handleSocketEvents';


const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
  serveClient: false,
});

handleSocketEvents(io);

server.listen(5000, () => {
  console.log('Server is running');
});


