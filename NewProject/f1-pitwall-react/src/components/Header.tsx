import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <span className="logo-icon">🏎️</span>
            <span className="logo-text">F1 PITWALL</span>
          </Link>
        </div>
        <div className="nav-container">
          <ul className="nav-links">
            <li><Link to="/" className={isActive('/')}>Home</Link></li>
            <li><Link to="/standings" className={isActive('/standings')}>Standings</Link></li>
            <li><Link to="/calendar" className={isActive('/calendar')}>Calendar</Link></li>
            <li><Link to="/race-results" className={isActive('/race-results')}>Race Results</Link></li>
            <li><Link to="/drivers-info" className={isActive('/drivers-info')}>Drivers</Link></li>
            <li><Link to="/teams" className={isActive('/teams')}>Teams</Link></li>
            <li><Link to="/comparison" className={isActive('/comparison')}>Comparison</Link></li>
          </ul>
          
          {user ? (
            // Show user profile when logged in
            <div className="user-profile-container">
              <button 
                className="user-profile-button" 
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
                <span className="user-name">{user.name}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              
              {showDropdown && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">{user.name.charAt(0).toUpperCase()}</div>
                    <div className="dropdown-info">
                      <p className="dropdown-name">{user.name}</p>
                      <p className="dropdown-email">{user.email}</p>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Show login/signup buttons when not logged in
            <div className="auth-buttons">
              <Link to="/login" className="auth-nav-button">Login</Link>
              <Link to="/signup" className="auth-nav-button signup">Sign Up</Link>
            </div>
          )}
        </div>
        <div className="mobile-menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
