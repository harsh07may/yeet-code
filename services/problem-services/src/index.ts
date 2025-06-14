import cors from "cors";
import express, { ErrorRequestHandler } from "express";
import "express-async-errors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config";
import { errorHandler } from "./middleware/errorHandler";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
// app.use(limiter);

// Routes
app.use("/api", routes);

//TODO: Fix types for Error handling
//@ts-ignore
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(
    `Problem service running on port http://localhost:${config.port}`
  );
});
