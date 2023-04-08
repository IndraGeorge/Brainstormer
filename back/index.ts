import { Configuration, OpenAIApi} from "openai"
import * as dotenv from "dotenv"
dotenv.config()

// Setting up the connection to OpenAI API
const configOpenai = new Configuration({
    apiKey:process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configOpenai )

// Using OpenAI API

try{
const response = async () => {
    await openai.createEdit({
        model: "text-davinci-edit-001",
        instruction:"Brainstormer une idée ou un défi"
    }) 
    console.log(response.data.choices[0].text);
}
}catch(error: any){
    if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
}
