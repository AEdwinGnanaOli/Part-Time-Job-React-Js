import React from 'react'
import { Link } from 'react-router-dom'
import{ FacebookFilled, InstagramOutlined, XOutlined } from '@ant-design/icons'
function Footer() {
  const footerStyle = {
    textAlign: 'center',
    padding: '10px',
    background: '#f1f1f1',
  
    width: '100%',
    bottom: '0',
    boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
  };
  return (
    <div>
      {/* <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>About Us</h3>
            <p>
              Food Truck  is dedicated to bringing you the best street
              food experience with fresh, locally sourced ingredients.
            </p>
          </div>
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>Email: info@foodtruck.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="footer-section social">
            
            <h3>Follow Us</h3>
            <Link
              to="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
            <span className="icons icon-fb"><FacebookFilled /></span>
              Facebook
            </Link>
            <Link
             to="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
                <span className="icons icon-x"><XOutlined /></span>
              Twitter
            </Link>
            <Link
              to="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
                <span className="icons icon-ins"><InstagramOutlined /></span>
              Instagram
            </Link>
          </div>
        </div>
      </footer> */}
        <footer style={footerStyle}>
      <p>&copy; 2024 Your Company. All rights reserved.</p>
      <p>
        <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a>
      </p>
    </footer>
    </div>
  )
}

export default Footer