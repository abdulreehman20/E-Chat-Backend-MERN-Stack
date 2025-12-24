import "dotenv/config";
import cors from "cors";
import http from "http";
import router from "./routes";
import passport from "passport";
import "./configs/passopart.config";
import cookieParser from "cookie-parser";
import { Env } from "./configs/env.config";
import { initializeSocket } from "./lib/socket";
import { HTTPSTATUS } from "./configs/http.config";
import express, { Request, Response } from "express";
import { connectDatabase } from "./configs/database.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();const server = http.createServer(app);

//socket
initializeSocket(server);


app.use(express.json({ limit: "10mb" }));app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: Env.FRONTEND_ORIGIN, credentials: true, }));

app.use(passport.initialize());

app.get("/health", asyncHandler(async (req: Request, res: Response) => {
  res.status(HTTPSTATUS.OK).json({ message: "Server is healthy", status: "OK" });
})
);

app.use("/api", router);
app.use(errorHandler);

app.listen(Env.PORT, async () => {
  await connectDatabase();
  console.log(`Server running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});

