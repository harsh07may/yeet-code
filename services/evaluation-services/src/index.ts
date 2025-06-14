import "express-async-errors";
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { routes } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { config } from "./config";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
// app.use(limiter);

// Routes
app.use("/api", routes);

// Error handling
// app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Evaluation service running on port http://localhost:${config.port}`);
});
