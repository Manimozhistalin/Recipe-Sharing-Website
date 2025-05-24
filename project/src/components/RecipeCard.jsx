import { Link } from 'react-router-dom'
import { FaClock, FaUtensils, FaHeart } from 'react-icons/fa'
import { useFavorites } from '../context/FavoritesContext.jsx'
import './RecipeCard.css'

const RecipeCard = ({ recipe }) => {
  const { id, title, image, prepTime, difficulty, category } = recipe
  const { isFavorite, toggleFavorite } = useFavorites()
  
  const handleFavoriteClick = (e) => {
    e.preventDefault()
    toggleFavorite(recipe)
  }
  
  return (
    <div className="recipe-card">
      <div className="recipe-card-image-container">
        <Link to={`/recipe/${id}`}>
          <img src={image} alt={title} className="recipe-card-image" />
        </Link>
        <button 
          className={`favorite-button ${isFavorite(id) ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite(id) ? "Remove from favorites" : "Add to favorites"}
        >
          <FaHeart />
        </button>
        <div className="recipe-card-category">
          <Link to={`/category/${category.toLowerCase()}`}>{category}</Link>
        </div>
      </div>
      
      <div className="recipe-card-content">
        <Link to={`/recipe/${id}`}>
          <h3 className="recipe-card-title">{title}</h3>
        </Link>
        
        <div className="recipe-card-meta">
          <div className="recipe-card-meta-item">
            <FaClock />
            <span>{prepTime}</span>
          </div>
          <div className="recipe-card-meta-item">
            <FaUtensils />
            <span>{difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard