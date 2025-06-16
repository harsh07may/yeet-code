import "express-async-errors";
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";
import { routes } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { config } from "./config";
import { Server } from "socket.io";

const app = express();

const client = new Map();

// Create Http server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // adjust for production
    methods: ["GET", "POST"],
  },
});

//websocket connection
io.on("connection", (socket) => {
  console.log(`Client connected`, socket.id);

  socket.on("register", (jobId: string) => {
    client.set(jobId, socket);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
    for (let [key, value] of client) {
      if (value == socket) {
        client.delete(key);
      }
    }
  });
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
// app.use(limiter);

// Routes
app.use("/api", routes);

app.post("code-result", (req, res) => {
  const { jobId, output } = req.body;
  const socket = client.get(jobId);

  if (socket) {
    socket.emit("code-result", { jobId, output });
  }
  res.send(200)
});

//TODO: Fix types for Error handling
//@ts-ignore
app.use(errorHandler);

server.listen(config.port, () => {
  console.log(
    `Evaluation service running on port http://localhost:${config.port}`
  );
});
