import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
//import { Welcome } from './Welcome'
const Welcome = lazy(() => import('./Welcome'));
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Welcome />
    <App />
  </React.StrictMode>,
)
