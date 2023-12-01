import { SocketUser } from "../types/socket";
import {
  addMessageToHistory,
  addUser,
  findUser,
  getRoomUsers,
  getAllRoomMessages,
  removeUser
} from "./usersService";
import { Server } from 'socket.io';

export function handleSocketEvents (io: Server) { 
  io.on('connection', (socket) => {
    socket.on('join', ({ name, room }: SocketUser) => {
      socket.join(room);
  
      const { user, isExist } = addUser({ name, room });

        if (isExist) {
          const messages = getAllRoomMessages(room);

          socket.emit('messageHistory', { data: { messages} });
        }

      io.to(user.room).emit('room', {data: {users: getRoomUsers(user.room)}})
    });
  
  
  
    socket.on("sendMessage", ({ message, params }) => {
      const {name, room} = params
      const user = findUser(params);



      if (user) {
        addMessageToHistory(user, message);
        io.to(user.room).emit("message", { data: { user, message } });
      } else {
         const {user} = addUser({ name, room});
        addMessageToHistory(user, message);
        io.to(user.room).emit("message", { data: { user, message } });
      }
    });
  
    socket.on("leftRoom", ({ params }) => {
      
      const user = removeUser(params);
  
      if (user) {
        const { room } = user;

  
        io.to(room).emit("room", {
          data: { users: getRoomUsers(room) },
        });
      }
    });

  });
}