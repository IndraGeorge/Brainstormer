import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();
// Setting up the connection to OpenAI API
const configOpenai = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configOpenai);
// Using OpenAI API
try {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `Tu es un assistant de brainstorming qui utilise l'intelligence
             artificielle pour générer des idées créatives et inspirantes.` },
            { role: "user", content: "créer une marque de maquillage" }
        ]
    });
    console.log(response.data.choices[0].message);
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
//# sourceMappingURL=index.js.map