import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RecipeGrid from '../components/RecipeGrid.jsx'
import { useRecipes } from '../context/RecipeContext.jsx'
import { FaUtensils, FaCarrot, FaBirthdayCake, FaEgg, FaHamburger } from 'react-icons/fa'
import './HomePage.css'

const HomePage = () => {
  const { recipes, loading, error } = useRecipes()
  const [featuredRecipes, setFeaturedRecipes] = useState([])
  const [popularRecipes, setPopularRecipes] = useState([])
  
  useEffect(() => {
    if (recipes.length > 0) {
      // Get 3 random recipes for featured section
      const shuffled = [...recipes].sort(() => 0.5 - Math.random())
      setFeaturedRecipes(shuffled.slice(0, 3))
      
      // Get 6 recipes for popular section (different from featured)
      const remaining = shuffled.slice(3)
      setPopularRecipes(remaining.slice(0, 6))
    }
  }, [recipes])
  
  const categories = [
    { name: 'Breakfast', icon: <FaEgg />, path: '/category/breakfast' },
    { name: 'Lunch', icon: <FaHamburger />, path: '/category/lunch' },
    { name: 'Dinner', icon: <FaUtensils />, path: '/category/dinner' },
    { name: 'Desserts', icon: <FaBirthdayCake />, path: '/category/desserts' },
    { name: 'Vegetarian', icon: <FaCarrot />, path: '/category/vegetarian' }
  ]
  
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Discover & Share Amazing Recipes</h1>
            <p className="hero-subtitle">
              Find and share the best recipes from around the world
            </p>
            <div className="hero-buttons">
              <Link to="/submit-recipe" className="btn btn-primary">Share Your Recipe</Link>
              <Link to="/category/popular" className="btn btn-outline">Browse Recipes</Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="section categories-section">
        <div className="container">
          <h2 className="section-title">Browse Categories</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <Link to={category.path} key={category.name} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-name">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Recipes */}
      <section className="section featured-section">
        <div className="container">
          <h2 className="section-title">Featured Recipes</h2>
          {loading ? (
            <div className="loading">Loading featured recipes...</div>
          ) : (
            <div className="featured-recipes">
              {featuredRecipes.map(recipe => (
                <div key={recipe.id} className="featured-recipe">
                  <Link to={`/recipe/${recipe.id}`} className="featured-recipe-image-container">
                    <img src={recipe.image} alt={recipe.title} className="featured-recipe-image" />
                  </Link>
                  <div className="featured-recipe-content">
                    <div className="featured-recipe-category">
                      <Link to={`/category/${recipe.category.toLowerCase()}`}>{recipe.category}</Link>
                    </div>
                    <Link to={`/recipe/${recipe.id}`}>
                      <h3 className="featured-recipe-title">{recipe.title}</h3>
                    </Link>
                    <p className="featured-recipe-description">{recipe.description}</p>
                    <Link to={`/recipe/${recipe.id}`} className="btn btn-outline">View Recipe</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Popular Recipes */}
      <section className="section popular-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Recipes</h2>
            <Link to="/category/popular" className="view-all-link">View All</Link>
          </div>
          <RecipeGrid recipes={popularRecipes} loading={loading} error={error} />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Have a Recipe to Share?</h2>
            <p className="cta-text">
              Share your favorite recipes with our community and get feedback from food lovers around the world.
            </p>
            <Link to="/submit-recipe" className="btn btn-primary">Submit Your Recipe</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage