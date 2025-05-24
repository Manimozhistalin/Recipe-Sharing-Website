import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecipes } from '../context/RecipeContext.jsx'
import RecipeGrid from '../components/RecipeGrid.jsx'
import './SearchResultsPage.css'

const SearchResultsPage = () => {
  const location = useLocation()
  const { recipes, loading, error } = useRecipes()
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  
  useEffect(() => {
    window.scrollTo(0, 0)
    
    const query = new URLSearchParams(location.search).get('q')
    setSearchQuery(query || '')
    
    if (query && recipes.length > 0) {
      const results = recipes.filter(recipe => {
        const searchableText = `${recipe.title} ${recipe.description} ${recipe.category} ${recipe.ingredients.join(' ')}`.toLowerCase()
        return searchableText.includes(query.toLowerCase())
      })
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [location.search, recipes])
  
  return (
    <div className="search-results-page">
      <div className="container">
        <div className="search-header">
          <h1 className="search-title">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Search Results'}
          </h1>
          <p className="search-summary">
            {searchResults.length > 0 
              ? `Found ${searchResults.length} ${searchResults.length === 1 ? 'recipe' : 'recipes'} matching your search.`
              : searchQuery 
                ? 'No recipes found matching your search criteria.'
                : 'Please enter a search term to find recipes.'
            }
          </p>
        </div>
        
        <div className="search-content">
          <RecipeGrid recipes={searchResults} loading={loading} error={error} />
        </div>
      </div>
    </div>
  )
}

export default SearchResultsPage