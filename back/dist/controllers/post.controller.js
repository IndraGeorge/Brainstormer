"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIdea = exports.getIdea = void 0;
const openai_1 = require("openai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
// Fetch idea from OpenAI API
const getIdea = async (req, res) => {
    res.json({ messsage: "Bienvenue sur l'application de brainstorming" });
};
exports.getIdea = getIdea;
// Setting up the connection to OpenAI API
const setIdea = async (req, res) => {
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
    }
    catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        }
        else {
            console.log(error.message);
        }
    }
};
exports.setIdea = setIdea;
