import { Schema, Types } from "mongoose";

const ObjectId = Types.ObjectId;

export const userSchema = new Schema(
  {
    _id: ObjectId,
    name: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    password: String,
    
    access: Number
  },
  { collection: "users", versionKey: false }
);

export const letterSchema = new Schema(
  {
    _id: ObjectId,
    signature: String,
    letter: String,
    user: {
      type: ObjectId,
      ref: "users",
    },
    deletedAt: Date
  },
  { collection: "letters", versionKey: false }
);