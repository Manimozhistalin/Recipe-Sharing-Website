import { Link } from 'react-router-dom'
import './Logo.css'

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <div className="logo-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
          <path d="M12.5 7H11.5V12.25L16.25 15.15L16.75 14.25L12.5 11.75V7Z" fill="currentColor"/>
        </svg>
      </div>
      <div className="logo-text">
        <span className="logo-text-main">Share</span>
        <span className="logo-text-accent">Recipes</span>
      </div>
    </Link>
  )
}

export default Logo