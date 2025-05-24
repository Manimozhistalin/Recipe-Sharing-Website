import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import SearchBar from './SearchBar.jsx'
import './Header.css'
import { FaHeart, FaPlus, FaBars, FaTimes } from 'react-icons/fa'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])
  
  const categories = [
    { name: 'Breakfast', path: '/category/breakfast' },
    { name: 'Lunch', path: '/category/lunch' },
    { name: 'Dinner', path: '/category/dinner' },
    { name: 'Desserts', path: '/category/desserts' },
    { name: 'Vegetarian', path: '/category/vegetarian' }
  ]
  
  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="header-left">
          <Link to="/" className="logo-container">
            <Logo />
          </Link>
        </div>
        
        <div className={`header-center ${mobileMenuOpen ? 'active' : ''}`}>
          <nav className="main-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle">Categories</span>
                <ul className="dropdown-menu">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link to={category.path} className="dropdown-item">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/submit-recipe" className="nav-link">Submit Recipe</Link>
              </li>
              <li className="nav-item">
                <Link to="/favorites" className="nav-link">Favorites</Link>
              </li>
            </ul>
          </nav>
          
          <div className="mobile-search">
            <SearchBar />
          </div>
          
          <div className="mobile-actions">
            <Link to="/favorites" className="mobile-action-btn">
              <FaHeart /> Favorites
            </Link>
            <Link to="/submit-recipe" className="mobile-action-btn">
              <FaPlus /> Submit Recipe
            </Link>
          </div>
        </div>
        
        <div className="header-right">
          <div className="desktop-search">
            <SearchBar />
          </div>
          
          <div className="header-actions">
            <Link to="/favorites" className="header-action-btn" title="Favorites">
              <FaHeart />
            </Link>
            <Link to="/submit-recipe" className="btn btn-primary">
              Submit Recipe
            </Link>
          </div>
          
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header