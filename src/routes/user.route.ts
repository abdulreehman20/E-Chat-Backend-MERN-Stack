import { Router } from "express";
import { getUsersController } from "../controllers/user.controller";
import { passportAuthenticateJwt } from "../configs/passopart.config";

const userRoutes = Router()
  .use(passportAuthenticateJwt)
  .get("/all", getUsersController);

export default userRoutes;