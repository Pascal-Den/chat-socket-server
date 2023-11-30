import { SocketUser } from "../../types/socket";
import {addUser, findUser, getAllRoomMessages, getRoomUsers, removeUser} from "./users";
import { Server } from 'socket.io';

export function handleSocketEvents (io: Server) { 
  io.on('connection', (socket) => {
    socket.on('join', ({ name, room }: SocketUser) => {
      socket.join(room);
  
      const { user, isExist } = addUser({ name, room, messageHistory: [] });
  
      const userMessage = isExist
          ? ''
          : `Welcome ${user.name}`;
  
      socket.emit("message", {
        data: { user: { name: "" }, message: userMessage },
      });
  
      if (isExist) {
        const allMessages = getAllRoomMessages(room)
        socket.emit("messageHistory", { data: { messages: allMessages } });
      }
  
      socket.broadcast.to(user.room).emit("message", {
        data: { user: { name: "" }, message: `${user.name} has joined` },
      });
  
      io.to(user.room).emit('room', {data: {users: getRoomUsers(user.room)}})
    });
  
  
  
    socket.on("sendMessage", ({ message, params }: any) => {
  
      const user = findUser(params);
  
      if (user) {
        user.messageHistory.push(message);
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
}