import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import mockRecipes from '../data/mockRecipes.js'

const RecipeContext = createContext()

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        setRecipes(mockRecipes)
        setLoading(false)
      } catch (err) {
        setError('Failed to load recipes')
        setLoading(false)
      }
    }
    
    fetchRecipes()
  }, [])
  
  const getRecipeById = useCallback((id) => {
    return recipes.find(recipe => recipe.id === id)
  }, [recipes])
  
  const addRecipe = useCallback((newRecipe) => {
    return new Promise((resolve) => {
      // Generate a unique ID (in a real app, this would be handled by the backend)
      const id = `recipe-${Date.now()}`
      
      const recipeToAdd = {
        id,
        ...newRecipe,
        // Add any default values or transformations here
      }
      
      setRecipes(prevRecipes => [...prevRecipes, recipeToAdd])
      
      // Simulate API delay
      setTimeout(() => {
        resolve(recipeToAdd)
      }, 500)
    })
  }, [])
  
  const value = {
    recipes,
    loading,
    error,
    getRecipeById,
    addRecipe
  }
  
  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  )
}

export const useRecipes = () => {
  const context = useContext(RecipeContext)
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider')
  }
  return context
}