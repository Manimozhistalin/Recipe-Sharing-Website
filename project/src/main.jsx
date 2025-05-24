import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { RecipeProvider } from './context/RecipeContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RecipeProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </RecipeProvider>
    </BrowserRouter>
  </StrictMode>,
)