import request from "supertest";
import { INewUser } from "../../src/controllers/user";
import * as app from "../../src/index";
import { IUser } from "../../src/models";

export class UserRest {
  async postUser(user: INewUser) {
    const res = await request(app.default)
      .post("/api/usuario/inserir")
      .set("Accept", "application/json")
      .send(user);
    const userInserted: IUser = res.body;
    return userInserted;
  }

  async loginUser(username: string, password: string) {
    const res = await request(app.default)
      .post("/api/usuario/login")
      .set("Accept", "application/json")
      .send({ username, password });
    const user = res.body;
    return user;
  }
}
