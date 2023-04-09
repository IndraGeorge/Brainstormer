"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var openai_1 = require("openai");
var dotenv = require("dotenv");
dotenv.config();
// Setting up the connection to OpenAI API
var configOpenai = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
var openai = new openai_1.OpenAIApi(configOpenai);
// Using OpenAI API
try {
    var response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "Tu es un assistant de brainstorming qui utilise l'intelligence\n             artificielle pour g\u00E9n\u00E9rer des id\u00E9es cr\u00E9atives et inspirantes." },
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
