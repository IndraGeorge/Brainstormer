import { Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
     apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Setting up the connection to OpenAI API
export const setIdea = async (req: Request, res: Response) => {
     try {
          if (!req.body.idea) {
               res.status(400).json({
                    message: " Merci d'ajouter une requête",
               });
          } else {
               const idea = req.body.idea;
               const prompt = `${process.env.VITE_PROMPT} ${idea}, ${process.env.VITE_PROMPT_2}`;

               const completion = await openai.createChatCompletion({
                    model: 'gpt-3.5-turbo',
                    messages: [
                         { role: 'user', content: prompt },
                         {
                              role: 'system',
                              content: `Tu es un assistant de brainstorming qui génère
                    des idées créatives et inspirantes.`,
                         },
                    ],
                    max_tokens: 100,
               });

               res.status(200).json({
                    response: completion.data.choices[0].message?.content,
               });
          }
     } catch (error: any) {
          if (error.response) {
               console.log(error.response.status);
               console.log(error.response.data);
               return res
                    .status(500)
                    .json({ message: 'Erreur de serveur interne' });
          } else {
               console.log(error.message);
               return res
                    .status(500)
                    .json({ message: 'Erreur de serveur interne' });
          }
     }
};
