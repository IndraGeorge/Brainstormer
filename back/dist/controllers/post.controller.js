"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIdea = void 0;
const openai_1 = require("openai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
// Setting up the connection to OpenAI API
const setIdea = async (req, res) => {
    try {
        if (!req.body.idea) {
            res.status(400).json({
                message: " Merci d'ajouter une requête",
            });
        }
        else {
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
    }
    catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            return res
                .status(500)
                .json({ message: 'Erreur de serveur interne' });
        }
        else {
            console.log(error.message);
            return res
                .status(500)
                .json({ message: 'Erreur de serveur interne' });
        }
    }
};
exports.setIdea = setIdea;
