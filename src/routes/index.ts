import { Router } from "express";
import user from "./user";
import letter from "./letter";

const routes = Router();

routes.use("/usuario", user);
routes.use("/carta", letter);
export default routes;
