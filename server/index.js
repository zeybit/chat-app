
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDB();
  app.get("/", (req, res) => {
    res.send("API is running");
  });
  app.get("/ping", (_req, res) => {
    return res.json({ msg: "Ping Successful" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/messages", messageRoutes);
  app.use("/api/eventRoutes", eventRoutes);
  app.use("/api/userRoutes",  userRoutes);
  console.log('Event routes are set up');

  const server = app.listen(process.env.PORT, () =>
    console.log(`Server started on ${process.env.PORT}`)
  );
  
  app.get('eventRoutes/:userId', (req, res) => {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error('Invalid userId format');
      return res.status(400).send('Invalid userId format');
    }
    // Devam eden işlem...
  });

  const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });
};

startServer();
