const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

const users = [];
const messages = [];

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3001", // Allow your React app origin
    methods: ["GET", "POST"],
  }),
  cors({
    origin: "http://localhost:8080", // Allow your React app origin
    methods: ["GET", "POST"],
  })
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log('A user connected:', socket.id);

  // Broadcast the message to all clients
  socket.on("chat message", (msg) => {
    console.log('chat message');
    messages.push(msg);
    io.emit("chat message", msg);
  });

  // Notify about new user
  socket.on("new user", (user) => {
    console.log('New user event received:', user);
    users.push(user);
    console.log('User added to array:', user);
    console.log('Current users:', users);
    io.emit("new user", user);
  });

  // Imitate get request of messages
  socket.on("get messages", () => {
    console.log('Messages requested');
    io.emit("all messages", messages);
  });

  // Imitate get request of users
  socket.on("get users", () => {
    io.emit("all users", users);
  });

  socket.on("disconnect", () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log("Listening on *:3000");
});
