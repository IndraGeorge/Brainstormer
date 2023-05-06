import { useState } from "react"
import './App.css'
import { Loader } from "./components/Loader"

export function App() {

  const [idea, setIdea] = useState<string>("")
  const [ideas, setIdeas] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)

  async function generateIdea() {

    setLoading(true)

    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },

    })
      .then((response) => response.json())
      .then((response) => {
        setIdeas(response)
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

  const handleClick = () => {
    if (idea === "") {
      setIdeas("")
      alert("Veuillez saisir votre projet")
    } else {
      generateIdea()
    }
  }

  return (
    <div className="container">
      <h1>Brainstormer</h1>
      <p>Entrer votre projet ou défi:</p>
      <input type="text" value={idea} onChange={handleChange} />
      <button onClick={handleClick}>Générer une idée</button>
      {loading ? <Loader /> : <div className="response">{ideas}</div>}
    </div>
  )
}
