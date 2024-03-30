import express, { Application } from "express";
import morgan from "morgan";
import apiRouter from "./routes";
import { errorHandler, notFoundHandler } from "./middlewares";

const app: Application = express();
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
