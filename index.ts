import {SocketUser} from "./types/socket";
import express from 'express'
import http from 'http'
import {Server} from "socket.io";
import cors from 'cors'
import {router} from "./route";
import {addUser, findUser, getRoomUsers, removeUser} from "./users";

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

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }: SocketUser) => {
    socket.join(room);

    const { user, isExist } = addUser({ name, room });

    const userMessage = isExist
        ? "You back again "
        : `Welcome ${user.name}`;

    socket.emit("message", {
      data: { user: { name: "" }, message: userMessage },
    });

    socket.broadcast.to(user.room).emit("message", {
      data: { user: { name: "" }, message: `${user.name} has joined` },
    });

    io.to(user.room).emit('room', {data: {users: getRoomUsers(user.room)}})
  });



  socket.on("sendMessage", ({ message, params }) => {

    const user = findUser(params);

    if (user) {
      io.to(user.room).emit("message", { data: { user, message } });
    }
  });

  socket.on("leftRoom", ({ params }) => {
    const user = removeUser(params);

    if (user) {
      const { room, name } = user;

      io.to(room).emit("message", {
        data: { user: { name: "" }, message: `${name} has left` },
      });

      io.to(room).emit("room", {
        data: { users: getRoomUsers(room) },
      });
    }
  });


  socket.on('disconnect', () => {
    console.log('Disconnect');
  });
});

server.listen(5000, () => {
  console.log('Server is running');
});


