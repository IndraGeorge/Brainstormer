import { useState } from "react"
import './App.css'
import { Loader } from "./components/Loader"

export function App() {

  const [idea, setIdea] = useState<string>("")
  const [ideas, setIdeas] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)

  async function generateIdea() {

    setLoading(true)

    const prompt = `Proposez une idée de projet ou de défi original en une seule phrase, liée à ${idea},
     en prenant en compte les critères suivants : qu'elle soit claire, concise et stimulante.`;

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          { role: "user", content: prompt },
          {
            role: "system", content: `Tu es un assistant de brainstorming qui génère
          des idées créatives et inspirantes.` }
        ],
        max_tokens: 100,
        model: "gpt-3.5-turbo",
      })
    })
      .then((response) => response.json())
      .then((response) => {
        const newIdea = response.choices[0].message.content
        setIdeas(newIdea)
        setLoading(false)
        setIdea("")
      })

      .catch((error: any) => {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
        setIdea("")
        setIdeas("Oups! Une erreur est survenue :(")
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdea(e.target.value)
  }

  return (
    <div className="container">
      <h1>Brainstormer</h1>
      <p>Entrer votre projet ou défi:</p>
      <input type="text" value={idea} onChange={handleChange} />
      <button onClick={generateIdea}>Générer une idée</button>
      {loading ? <Loader /> : <div className="response">{ideas}</div>}
    </div>
  )
}
