import {IUser, userModel} from "../models";
import * as bcrypt from "bcrypt";

export interface INewUser {
  name: string;
  username: string;
  password: string;
}

export class UserController {
  async createUser(user: INewUser): Promise<string> {
    try {
      const cryptedPassword = await bcrypt.hash(user.password, 10);
      const [insertedUser] = await userModel.insertMany([
        { ...user, password: cryptedPassword, access: 1 },
      ]);

      return insertedUser.name;
    } catch (error) {
      throw new Error("Não foi possível cadastrar novo usuário.");
    }
  }
  
  async createSantaClausUser(user: INewUser): Promise<string> {
    try {
      const hasSantaClaus = await userModel.findOne({access: 0});
      if (!hasSantaClaus) {
        const cryptedPassword = await bcrypt.hash(user.password, 10);
        await userModel.insertMany([
          { ...user, password: cryptedPassword, access: 0 },
        ]);
      }  
      return "SANTA CLAUS CHECK";
    } catch (error) {
      throw new Error(`Não foi possível cadastrar novo usuário. ${error}`);
    }
  }
  async login(username: string, password: string): Promise<IUser> {
    try {
      const [user] = await userModel.find({ username });

      if (!(await bcrypt.compare(password, user.password))) {
        throw new Error("Não encontrado.");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  
  async findByName(name: string): Promise<IUser | null> {
    try {
      return userModel.findOne({ name });

    } catch (error) {
      throw new Error("Não encontrado.");
    }
  }


}
