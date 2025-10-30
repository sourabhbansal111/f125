import React from 'react';
import './Common.css';

const Comparison: React.FC = () => {
  return (
    <div className="page-container">
      <section className="page-hero">
        <div className="hero-background"><div className="hero-grid"></div></div>
        <div className="hero-content">
          <div className="animated-badge"><span className="badge-icon">⚔️</span><span>HEAD TO HEAD</span></div>
          <h1 className="hero-title">DRIVER COMPARISON</h1>
          <p className="hero-subtitle">Compare Driver Statistics</p>
        </div>
      </section>
      <section className="content-section">
        <div className="coming-soon">
          <h2>⚔️ Comparison Page</h2>
          <p>Driver comparison tool coming soon!</p>
        </div>
      </section>
    </div>
  );
};

export default Comparison;

