const express = require('express'); 
const http = require('http'); 
const {Server} = require("socket.io"); 
const cors = require('cors')

const app = express(); 

const route = require('./route')

app.use(route)
app.use(cors({ origin: "*"})); 

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST']
  }
})

app.listen(5000, ( ) => { 
  console.log('Server is running');
})