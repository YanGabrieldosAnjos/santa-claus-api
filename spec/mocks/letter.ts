import request from "supertest";
import { ILetterController, ILetterUpdate } from "../../src/controllers/letter";
import * as app from "../../src/index";
import { ILetter, IUser } from "../../src/models";

export class LetterRest {
  async postLetter(letter: ILetterController, token: string) {
    const res = await request(app.default)
      .post("/api/carta")
      .set("auth", token)
      .send(letter);
    const letterRes: string = res.body.letter;
    return letterRes;
  }
  
  async putLetter(letter: ILetterUpdate, token: string) {
    const res = await request(app.default)
      .put("/api/carta")
      .set("auth", token)
      .send(letter);
    const letterRes: string = res.body.letter;
    return letterRes;
  }
  
  async deleteLetter(letter: ILetterUpdate, token: string) {
    const res = await request(app.default)
      .delete("/api/carta")
      .set("auth", token)
      .send(letter);
    const letterRes: string = res.body.letter;
    return letterRes;
  }
  
  async getLetters(name: string, token: string) {
    const res = await request(app.default)
      .get("/api/carta/cartas")
      .set("auth", token)
      .send({name});

    const letterRes: Array<ILetter> = res.body.letters;
    return letterRes;
  }
}
