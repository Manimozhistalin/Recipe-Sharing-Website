import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useRecipes } from '../context/RecipeContext.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { FaClock, FaUtensils, FaUsers, FaPrint, FaHeart, FaShare, FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa'
import RecipeGrid from '../components/RecipeGrid.jsx'
import './RecipePage.css'

const RecipePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getRecipeById, recipes, loading, error } = useRecipes()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [recipe, setRecipe] = useState(null)
  const [relatedRecipes, setRelatedRecipes] = useState([])
  const [showShareOptions, setShowShareOptions] = useState(false)
  
  useEffect(() => {
    window.scrollTo(0, 0)
    
    const fetchedRecipe = getRecipeById(id)
    if (fetchedRecipe) {
      setRecipe(fetchedRecipe)
      
      // Get related recipes from the same category
      const related = recipes
        .filter(r => r.category === fetchedRecipe.category && r.id !== fetchedRecipe.id)
        .slice(0, 3)
      setRelatedRecipes(related)
    } else if (!loading && !error) {
      navigate('/not-found')
    }
  }, [id, getRecipeById, recipes, loading, error, navigate])
  
  if (loading) {
    return <div className="loading">Loading recipe...</div>
  }
  
  if (error) {
    return <div className="error-message">Error loading recipe: {error}</div>
  }
  
  if (!recipe) {
    return null
  }
  
  const handlePrint = () => {
    window.print()
  }
  
  const handleShare = () => {
    setShowShareOptions(!showShareOptions)
  }
  
  const shareUrl = window.location.href
  
  return (
    <div className="recipe-page">
      <div className="container">
        <div className="recipe-header">
          <div className="recipe-category">
            <Link to={`/category/${recipe.category.toLowerCase()}`}>{recipe.category}</Link>
          </div>
          <h1 className="recipe-title">{recipe.title}</h1>
          <div className="recipe-meta">
            <div className="recipe-meta-item">
              <FaClock />
              <span>{recipe.prepTime}</span>
            </div>
            <div className="recipe-meta-item">
              <FaUtensils />
              <span>{recipe.difficulty}</span>
            </div>
            <div className="recipe-meta-item">
              <FaUsers />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
          <div className="recipe-actions">
            <button 
              className={`recipe-action-btn ${isFavorite(recipe.id) ? 'active' : ''}`}
              onClick={() => toggleFavorite(recipe)}
            >
              <FaHeart />
              <span>{isFavorite(recipe.id) ? 'Saved' : 'Save'}</span>
            </button>
            <button className="recipe-action-btn" onClick={handlePrint}>
              <FaPrint />
              <span>Print</span>
            </button>
            <div className="share-container">
              <button className="recipe-action-btn" onClick={handleShare}>
                <FaShare />
                <span>Share</span>
              </button>
              {showShareOptions && (
                <div className="share-options">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="share-option">
                    <FaFacebook />
                    <span>Facebook</span>
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${recipe.title}`} target="_blank" rel="noopener noreferrer" className="share-option">
                    <FaTwitter />
                    <span>Twitter</span>
                  </a>
                  <a href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${recipe.image}&description=${recipe.title}`} target="_blank" rel="noopener noreferrer" className="share-option">
                    <FaPinterest />
                    <span>Pinterest</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="recipe-image-container">
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        </div>
        
        <div className="recipe-content">
          <div className="recipe-description">
            <h2 className="recipe-section-title">Description</h2>
            <p>{recipe.description}</p>
          </div>
          
          <div className="recipe-ingredients">
            <h2 className="recipe-section-title">Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  <span className="ingredient-checkbox"></span>
                  <span className="ingredient-text">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="recipe-instructions">
            <h2 className="recipe-section-title">Instructions</h2>
            <ol className="instructions-list">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="instruction-item">
                  <div className="instruction-number">{index + 1}</div>
                  <div className="instruction-text">{instruction}</div>
                </li>
              ))}
            </ol>
          </div>
          
          <div className="recipe-notes">
            <h2 className="recipe-section-title">Notes</h2>
            <div className="notes-content">
              <p>{recipe.notes || "No additional notes for this recipe."}</p>
            </div>
          </div>
        </div>
        
        {relatedRecipes.length > 0 && (
          <div className="related-recipes">
            <h2 className="section-title">You Might Also Like</h2>
            <RecipeGrid recipes={relatedRecipes} />
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipePage