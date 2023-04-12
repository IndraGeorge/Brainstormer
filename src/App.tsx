import './App.css'

export function App() {

  function generateIdea(event: React.FormEvent<HTMLFormElement>) {

    event.preventDefault()

    const getInput = event.currentTarget.input.value

    const ideas = [
      `Créer un ${getInput} inspirer par la nature`,
      `Concevoir un ${getInput} pour l'année 2050`,
      `Créer un ${getInput} qui résout un problème courant`,
      `Créer un ${getInput} qui incorpore des matériaux recyclés`,
      `Concevoir un ${getInput} pour une culture ou un pays spécifique`,
      `Créer un ${getInput} multifonctionnel`,
      `Créer un ${getInput} qui favorise la santé mentale`,
      `Concevoir un ${getInput} pour un nouveau type d'entreprise`,
      `Créer un ${getInput} qui encourage un mode de vie durable`,
      `Créer un ${getInput} qui utilise la réalité augmentée`,
      `Concevoir un ${getInput} pour un groupe d'âge différent`,
      `Créer un ${getInput} interactif`,
      `Créer un ${getInput} qui se concentre sur l'expérience utilisateur`,
      `Concevoir un ${getInput} pour une industrie spécifique`,
      `Créer un ${getInput} qui intègre l'intelligence artificielle`,
      `Créer un ${getInput} qui promeut le bien social`,
      `Concevoir un ${getInput} pour un climat ou un environnement différent`,
      `Créer un ${getInput} peu coûteux et accessible`,
      `Créer un ${getInput} qui intègre la conception biophilique`
    ];
    const randomIndex = Math.floor(Math.random() * ideas.length);
    const idea = ideas[randomIndex];
    const setIdea = document.getElementById("output") as HTMLDivElement;
    return setIdea.innerHTML = idea
  }

  return (
    <div className="container">
      <h1>Brainstormer</h1>
      <p>Entrer votre projet ou défi:</p>
      <form onSubmit={generateIdea}>
        <input type="text" id="input" placeholder="e.g. Design a logo" />
        <button type="submit">Générer une idée</button>
      </form>
      <div id="output"></div>
    </div>
  )
}

