import {ILetter, IUser, letterModel, userModel} from "../models";

export interface ILetterController {
  signature: string;
  letter: string;
  name: string
}

export interface ILetterUpdate {
  _id: string;
  signature: string;
  letter: string;
  name: string
}

export class LetterController {
  async createLetter(letter: ILetterController ): Promise<string> {
    try {
      const [user] = await userModel.find({name: letter.name});
      
      const [insertedLetter] = await letterModel.insertMany([
        {  ...letter, user: user},
      ]);
      return insertedLetter.signature;
    } catch (error) {
      throw new Error(`Não foi possível enviar nova carta.${error}`);
    }
  }
  
  async myLetters(name: string | null): Promise<Array<ILetter>> {
    try {
        if( name === null ) {
            return letterModel.find();
        }
        
        const [user] =  await userModel.find({name});
        return letterModel.find({user, deletedAt: undefined});
    } catch (error) {
        throw new Error(`Não foi possível encontrar cartas.${error}`);
    }
  }
  
  async updateLetter(letter: ILetterUpdate): Promise<String> {
    try {
      
        await letterModel.updateOne( {_id: letter._id}, letter);
        return letter.letter;
    } catch (error) {
        throw error(`Não foi possível atualizar carta.`);
    }
  }
  
  async deleteLetter(letter: ILetterUpdate): Promise<String> {
    try {
        await letterModel.updateOne( {_id: letter._id}, {deletedAt: new Date()});
        return "deleted";
    } catch (error) {
        throw error(`Não foi possível deletar carta.`);
    }
  }
}
