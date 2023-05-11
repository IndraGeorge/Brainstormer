import { Request, Response } from 'express';

// Fetch idea from OpenAI API
export const getIdea = async (req: Request, res: Response) => {
     res.json({ messsage: "Bienvenue sur l'application de brainstorming" });
};
