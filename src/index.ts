import "reflect-metadata";
import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { UserController }  from "./controllers/user";


import routes from "./routes";
const { PORT, NODE_ENV, SANTA_PWD } = process.env;
export const app = express();
const userController = new UserController();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);

app.listen(PORT, async function () {
  await userController.createSantaClausUser({username: "santaclaus", name: "Santa Claus", password: SANTA_PWD! });
  console.log(
    `Example app listening on port ${PORT}! Go to http://localhost:${PORT}/`
  );
});

export default app;
