import { Router, Request, Response } from "express";
import { INewUser, UserController } from "../controllers/user";
import { ILetterController, ILetterUpdate, LetterController } from "../controllers/letter";

import * as jwt from "jsonwebtoken";
import { verifyJWT } from "../middlewares/auth";
import { ILetter, IUser, letterModel, userModel } from "../models";
const router = Router();

interface ILetterRequest {
  username: string;
  password: string;
}
router.post("/", [verifyJWT], async (req: Request, res: Response) => {
  const letter = new LetterController();

  try {
    const newLetter: ILetterController = req.body;
    
    res.status(201).send({letter: await letter.createLetter(newLetter)});
    
  } catch (error) {
    throw error;
  }
});

router.put("/", async (req: Request, res: Response) => {
  const letter = new LetterController();
  const user = new UserController();
  

  try {
    const letterToUpdate: ILetterUpdate = req.body;
    
    const userOfLetter = await user.findByName(letterToUpdate.name);
    
    if( userOfLetter && userOfLetter.access === 0){
        throw new Error("esse usuário não tem permissão para atualizar cartas");
    }
    
    res.status(200).send({letter: await letter.updateLetter(letterToUpdate)})
  } catch (error) {
    throw error;
  }
});

router.delete("/", async (req: Request, res: Response) => {
    const letter = new LetterController();
    const user = new UserController();
    
    try {
      const letterToDelete: ILetterUpdate = req.body;
      const userOfLetter = await user.findByName(letterToDelete.name);
      
      if(userOfLetter && userOfLetter.access === 0){
          throw new Error("esse usuário não tem permissão para atualizar cartas");
      }
      
      res.status(200).send({letter: await letter.deleteLetter(letterToDelete)})
    } catch (error) {
      throw error;
    }
});

router.get("/cartas", async (req: Request, res: Response) => {
    const letter = new LetterController();
    const user = new UserController();
    
    try {
      const name: string  = req.body.name;
    
      const userOfLetter = await user.findByName(name);
      res.status(201).send({ letters: await letter.myLetters(userOfLetter?.access === 0 ? null : name) });
    } catch (error) {
      throw error;
    }
});
export default router;
