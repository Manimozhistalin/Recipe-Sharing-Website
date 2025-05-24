import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-column">
            <div className="footer-logo">
              <Logo />
            </div>
            <p className="footer-description">
              Share Recipes  for food lovers to discover, share, and save the best recipes in the world.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/madrassamayal/" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaFacebook />
              </a>
              <a href="https://x.com/seriouseats/" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/khana_peena_recipe?igsh=cXBvaHB2Y2swYjY1" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram />
              </a>
              <a href="https://pin.it/1SQ2bnLMg" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaPinterest />
              </a>
              <a href="https://www.youtube.com/@MadrasSamayal" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-heading">Categories</h3>
            <ul className="footer-links">
              <li><Link to="/category/breakfast">Breakfast</Link></li>
              <li><Link to="/category/lunch">Lunch</Link></li>
              <li><Link to="/category/dinner">Dinner</Link></li>
              <li><Link to="/category/desserts">Desserts</Link></li>
              <li><Link to="/category/vegetarian">Vegetarian</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/submit-recipe">Submit Recipe</Link></li>
              <li><Link to="/favorites">Favorites</Link></li>
              <li><Link to="/search">Search</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-contact">
              <li>Email: manimozhistalin123.com</li>
              <li>Phone: +91-8610555404</li>
              <li>Address: Thanthonimalai, Karur,  Tamil nadu</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          {/* <p className="copyright">
            &copy; {currentYear} Share Recipes. All rights reserved.
          </p> */}
          {/* <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/cookie-policy">Cookie Policy</Link>
          </div> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer