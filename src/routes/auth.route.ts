import { Router } from "express";
import { passportAuthenticateJwt } from "../configs/passopart.config";
import { logoutController, loginController, authStatusController, registerController } from "../controllers/register.controller";

const authRoutes = Router()
  .post("/register", registerController)
  .post("/login", loginController)
  .post("/logout", logoutController)
  .get("/status", passportAuthenticateJwt, authStatusController);

export default authRoutes;  