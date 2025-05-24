import { useEffect } from 'react'
import { useFavorites } from '../context/FavoritesContext.jsx'
import RecipeGrid from '../components/RecipeGrid.jsx'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import './FavoritesPage.css'

const FavoritesPage = () => {
  const { favorites, loading, error } = useFavorites()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className="favorites-page">
      <div className="container">
        <div className="favorites-header">
          <h1 className="favorites-title">My Favorite Recipes</h1>
          <p className="favorites-description">
            Your collection of saved recipes for easy access.
          </p>
        </div>
        
        <div className="favorites-content">
          {favorites.length > 0 ? (
            <RecipeGrid recipes={favorites} loading={loading} error={error} />
          ) : (
            <div className="no-favorites">
              <div className="no-favorites-icon">
                <FaHeart />
              </div>
              <h2>No Favorites Yet</h2>
              <p>You haven't saved any recipes to your favorites yet.</p>
              <Link to="/" className="btn btn-primary">Browse Recipes</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FavoritesPage