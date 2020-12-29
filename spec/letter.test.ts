import { UserRest } from "./mocks/user";

import * as faker from "faker";
import { LetterRest } from "./mocks/letter";
import { IUser } from "../src/models";
import { userInfo } from "os";
describe("letter", () => {
  
  let token: { auth: boolean; token: string } = { auth: false, token: "" };
  let user: IUser;
  beforeAll(async () => {
    const userRest = new UserRest();
    const userInfo = {
      username: faker.random.word(),
      name: faker.random.word(),
      password: faker.random.word(),
    };
    user = await userRest.postUser(userInfo);
    token = await userRest.loginUser(userInfo.username, userInfo.password);
  });
  
  test("create", async () => {
    const letterRest = new LetterRest();
    
    const letterSig = await letterRest.postLetter({name: user.name, signature: user.name, letter: faker.random.words()}, token.token);
    expect(letterSig).toBe(user.name);
  });
  
  
  test("get", async () => {
    const letterRest = new LetterRest();
    const userRest = new UserRest();
    
    user = await userRest.postUser({
      username: faker.random.word(),
      name: faker.random.word(),
      password: faker.random.word(),
    });
    
    const letterSig = await letterRest.postLetter({name: user.name, signature: user.name, letter: faker.random.words()}, token.token);
    
    const [letter] = await letterRest.getLetters(user.name, token.token);
    expect(letterSig).toBe(letter.signature);
  });
  
  test("put", async () => {
    const letterRest = new LetterRest();
    await letterRest.postLetter({name: user.name, signature: user.name, letter: faker.random.words()}, token.token);
    
    let [letter] = await letterRest.getLetters(user.name, token.token);
    const oldLetter = letter.letter;
    letter.letter = faker.random.words();
    
    await letterRest.putLetter({...letter, name: user.name}, token.token);
    const letters = await letterRest.getLetters(user.name, token.token);
    
    const updatedLetter =  letters.find(letter => letter._id === letter._id);
  
    expect(letter.signature).toBe(updatedLetter?.signature);
    expect(oldLetter).not.toBe(updatedLetter?.letter);
  });
  
  test("delete", async () => {
    const letterRest = new LetterRest();
    
    const letterSig = await letterRest.postLetter({name: user.name, signature: user.name, letter: faker.random.words()}, token.token);
    
    const letters = await letterRest.getLetters(user.name, token.token);
    
    await letterRest.deleteLetter({...letters[0], name: user.name}, token.token);
  
    const lettersAfterDelete = await letterRest.getLetters(user.name, token.token);
    
    
    expect(lettersAfterDelete.length).toBeLessThan(letters.length);
  });
});
