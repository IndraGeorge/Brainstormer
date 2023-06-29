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

    await fetch("https://murmuring-ocean-81159.herokuapp.com/api/idea", response)
      .then((res) => res.json())
      .then((data) => {
        setIdeas(data.response.replaceAll('/\'|\"/', null))
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setIdeas("Oups, une erreur est survenue !")
        console.log(err)
      })

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdea(e.target.value)
  }

  const regex = new RegExp("^[a-zA-Z0-9éèîëïäöüùçâà .',-]+$");

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (idea === "") {
      setIdeas("")
      alert("Veuillez saisir votre projet")
    }
    else if (!regex.test(idea)) {
      setIdeas("")
      alert("Veuillez vérifier la validité de votre requête")
    }
    else {
      generateIdea()
    }
  }

  return (
    <div className="container">
      <h1>Challenge Master</h1>
      <h2>Entrer votre projet ou défi:</h2>
      <form onSubmit={handleClick}>
        <input type="text" value={idea} aria-label="search" onChange={handleChange} name="idea" />
        <button type="submit">GÉNÉRER UNE IDÉE</button>
      </form>
      {loading ? <Loader /> : <div className="response">{ideas}</div>}
    </div>
  )
}
