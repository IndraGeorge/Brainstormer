import { Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
     apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Fetch idea from OpenAI API
export const getIdea = async (req: Request, res: Response) => {
     res.json({ messsage: "Bienvenue sur l'application de brainstorming" });
};

// Setting up the connection to OpenAI API
export const setIdea = async (req: Request, res: Response) => {
     if (!req.body.message) {
          res.status(400).json({ message: " Merci d'ajouter une requête" });
     }

     const idea = JSON.parse(req.body.message);

     const prompt = `${process.env.VITE_PROMPT} ${idea}, ${process.env.VITE_PROMPT_2}`;

     try {
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

          res.json({ response: completion.data.choices[0].message?.content });
          res.status(200);

          console.log(completion.data.choices[0].message?.content);
     } catch (error: any) {
          if (error.response) {
               console.log(error.response.status);
               console.log(error.response.data);
          } else {
               console.log(error.message);
          }
     }
};
