"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const dotenv = require("dotenv");
dotenv.config();
// Setting up the connection to OpenAI API
const configOpenai = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new openai_1.OpenAIApi(configOpenai);
// Using OpenAI API
try {
    const response = async () => {
        await openai.createEdit({
            model: "text-davinci-edit-001",
            instruction: "Brainstormer une idée ou un défi"
        });
        console.log(response.data.choices[0].text);
    };
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