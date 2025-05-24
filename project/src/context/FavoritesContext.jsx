import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites))
        }
      } catch (err) {
        setError('Failed to load favorites')
        console.error('Error loading favorites:', err)
      } finally {
        setLoading(false)
      }
    }
    
    loadFavorites()
  }, [])
  
  useEffect(() => {
    // Save favorites to localStorage whenever they change
    if (!loading) {
      try {
        localStorage.setItem('favorites', JSON.stringify(favorites))
      } catch (err) {
        console.error('Error saving favorites:', err)
      }
    }
  }, [favorites, loading])
  
  const isFavorite = useCallback((id) => {
    return favorites.some(recipe => recipe.id === id)
  }, [favorites])
  
  const toggleFavorite = useCallback((recipe) => {
    setFavorites(prevFavorites => {
      if (isFavorite(recipe.id)) {
        return prevFavorites.filter(item => item.id !== recipe.id)
      } else {
        return [...prevFavorites, recipe]
      }
    })
  }, [isFavorite])
  
  const value = {
    favorites,
    loading,
    error,
    isFavorite,
    toggleFavorite
  }
  
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}