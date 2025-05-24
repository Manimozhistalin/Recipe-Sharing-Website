import RecipeCard from './RecipeCard.jsx'
import './RecipeGrid.css'

const RecipeGrid = ({ recipes, loading, error }) => {
  if (loading) {
    return <div className="loading">Loading recipes...</div>
  }
  
  if (error) {
    return <div className="error-message">Error loading recipes: {error}</div>
  }
  
  if (!recipes || recipes.length === 0) {
    return <div className="no-recipes">No recipes found.</div>
  }
  
  return (
    <div className="recipe-grid">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

export default RecipeGrid