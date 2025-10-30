import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter submission logic here
    alert('Newsletter subscription coming soon!');
  };

  return (
    <footer className="footer">
      <div className="footer-wave"></div>
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo">
            <span className="logo-icon">🏎️</span>
            <span className="logo-text">F1 PITWALL</span>
          </div>
          <p className="footer-tagline">
            Your ultimate destination for real-time F1 data, statistics, and championship updates.
          </p>
          <div className="footer-stats">
            <div className="footer-stat-item">
              <span className="stat-number">10</span>
              <span className="stat-label">Teams</span>
            </div>
            <div className="footer-stat-item">
              <span className="stat-number">20</span>
              <span className="stat-label">Drivers</span>
            </div>
            <div className="footer-stat-item">
              <span className="stat-number">24</span>
              <span className="stat-label">Races</span>
            </div>
          </div>
        </div>

        <div className="footer-links">
          <h3 className="footer-title">Quick Links</h3>
          <Link to="/"><span className="link-icon">🏠</span><span>Home</span></Link>
          <Link to="/standings"><span className="link-icon">🏆</span><span>Standings</span></Link>
          <Link to="/calendar"><span className="link-icon">📅</span><span>Calendar</span></Link>
          <Link to="/race-results"><span className="link-icon">🏁</span><span>Race Results</span></Link>
        </div>

        <div className="footer-links">
          <h3 className="footer-title">Explore</h3>
          <Link to="/drivers"><span className="link-icon">👤</span><span>All Drivers</span></Link>
          <Link to="/teams"><span className="link-icon">🏎️</span><span>All Teams</span></Link>
        </div>

        <div className="footer-links">
          <h3 className="footer-title">Connect</h3>
          <div className="footer-social">
            <a href="#" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
              <span>Twitter</span>
            </a>
            <a href="#" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01"/>
              </svg>
              <span>Instagram</span>
            </a>
          </div>
          <div className="footer-newsletter">
            <p className="newsletter-text">Get race updates</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input type="email" placeholder="Your email" className="newsletter-input" required />
              <button type="submit" className="newsletter-btn">→</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2025 F1 PITWALL. All rights reserved.</p>
          <div className="footer-credits">
            <span>Data powered by <strong>Ergast API</strong></span>
            <span className="separator">•</span>
            <span>Made with ❤️ for F1 Fans</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

