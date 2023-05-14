import { useState } from "react"
import './App.css'
import { Loader } from "./components/Loader"

export function App() {

  const [idea, setIdea] = useState<string>("")
  const [ideas, setIdeas] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)

  async function generateIdea() {

    const response = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idea: idea })
    }

    setLoading(true)

    await fetch("http://localhost:3000/api/idea", response)
      .then((res) => res.json())
      .then((data) => {
        setIdeas(data.response.replace('/\'|\"/', ""))
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
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
      <h2>Entrer votre projet ou défi:</h2>
      <input type="text" value={idea} aria-label="search" onChange={handleChange} name="idea" />
      <button onClick={handleClick}>Générer une idée</button>
      {loading ? <Loader /> : <div className="response">{ideas}</div>}
    </div>
  )
}
