import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecipes } from '../context/RecipeContext.jsx'
import RecipeGrid from '../components/RecipeGrid.jsx'
import './CategoryPage.css'

const CategoryPage = () => {
  const { category } = useParams()
  const { recipes, loading, error } = useRecipes()
  const [categoryRecipes, setCategoryRecipes] = useState([])
  const [categoryTitle, setCategoryTitle] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')
  
  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Format category title
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)
    setCategoryTitle(formattedCategory)
    
    // Set category description
    const descriptions = {
      breakfast: "Start your day right with our delicious breakfast recipes. From quick and easy options to weekend brunch ideas.",
      lunch: "Discover perfect midday meal ideas with our collection of lunch recipes. Quick, easy, and satisfying options for every day.",
      dinner: "End your day with our flavorful dinner recipes. From quick weeknight meals to special occasion dishes.",
      desserts: "Indulge your sweet tooth with our collection of dessert recipes. From cakes and cookies to ice creams and puddings.",
      vegetarian: "Explore our collection of vegetarian recipes. Delicious meat-free meals that are full of flavor and nutrition.",
      popular: "Our most loved recipes that have been tried and enjoyed by many in our community."
    }
    
    setCategoryDescription(descriptions[category.toLowerCase()] || "Explore our collection of delicious recipes.")
    
    // Filter recipes by category
    const filtered = recipes.filter(recipe => 
      recipe.category.toLowerCase() === category.toLowerCase()
    )
    setCategoryRecipes(filtered)
  }, [category, recipes])
  
  return (
    <div className="category-page">
      <div className="category-header">
        <div className="container">
          <h1 className="category-title">{categoryTitle} Recipes</h1>
          <p className="category-description">{categoryDescription}</p>
        </div>
      </div>
      
      <div className="container">
        <div className="category-content">
          <RecipeGrid recipes={categoryRecipes} loading={loading} error={error} />
        </div>
      </div>
    </div>
  )
}

export default CategoryPage