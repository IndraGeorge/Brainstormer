import './App.css'

export function App() {

  async function generateIdea(event: React.FormEvent<HTMLFormElement>) {

    event.preventDefault()
    const getInput = event.currentTarget.input.value

    try {
      const request = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: getInput,
          max_tokens: 50,
          model: "gpt-3.5-turbo",
          messages: [{ role: "system", content: "Donne une idée de projet ou de défi original en une phrase" }]
        }),
      })

      const response = await request.json();
      const setIdea = document.getElementById("output") as HTMLDivElement;
      return setIdea.innerHTML = response;

    } catch (error: any) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }

  }

  return (
    <div className="container">
      <h1>Brainstormer</h1>
      <p>Entrer votre projet ou défi:</p>
      <form onSubmit={generateIdea}>
        <input type="text" id="input" placeholder="Design a logo" />
        <button type="submit">Générer une idée</button>
      </form>
      <div id="output"></div>
    </div>
  )
}

