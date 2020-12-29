import { Document, createConnection, set } from "mongoose";
const { NODE_ENV } = process.env;
import config from "./config";
import * as s from "./schemas";

export const mongoOptions = config.MONGO_OPTIONS;

const uri = config.DB_URI;

export let conn = createConnection(uri!, mongoOptions);

conn.on("error", console.log.bind(console, "Erro ao conectar"));
conn.once("open", console.log.bind(console, "Conexão estabelecida"));

set("useCreateIndex", true);

export interface IUser extends Document {
  username: string;
  name: string;
  password: string;
  access: number;
}

export interface ILetter extends Document {
  user: IUser;
  signature: string;
  letter: string;
  deletedAt: Date;
}

export const userModel = conn.model<IUser>("users", s.userSchema);
export const letterModel = conn.model<ILetter>("letters", s.letterSchema);
