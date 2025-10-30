import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './OpeningAnimation.css';

const OpeningAnimation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hasSeenAnimation = sessionStorage.getItem('f1-animation-seen');
    
    // Only show animation on homepage and if not seen yet
    if (location.pathname === '/' && !hasSeenAnimation) {
      console.log('🏁 Showing opening animation');
      setIsVisible(true);
      sessionStorage.setItem('f1-animation-seen', 'true');
      
      // Hide animation after 3.6 seconds
      const hideTimer = setTimeout(() => {
        console.log('✅ Ending animation');
        setIsVisible(false);
      }, 3600);
      
      return () => clearTimeout(hideTimer);
    }
  }, [location]);

  if (!isVisible) return null;

  return (
    <div className="opening-animation">
      <div className="animation-content">
        <div className="f1-logo-animation">
          <div className="logo-glow"></div>
          <div className="logo-icon">🏎️</div>
          <div className="logo-text-anim">F1 PITWALL</div>
        </div>
        <div className="loading-bar">
          <div className="loading-fill"></div>
        </div>
        <p className="tagline-anim">Live Race Data & Championship Updates</p>
      </div>
      <div className="animation-bg">
        <div className="grid-pattern"></div>
        <div className="light-beam"></div>
        <div className="particles"></div>
      </div>
    </div>
  );
};

export default OpeningAnimation;

