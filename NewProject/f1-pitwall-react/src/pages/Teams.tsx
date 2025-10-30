import React from 'react';
import './Common.css';

const Teams: React.FC = () => {
  return (
    <div className="page-container">
      <section className="page-hero">
        <div className="hero-background"><div className="hero-grid"></div></div>
        <div className="hero-content">
          <div className="animated-badge"><span className="badge-icon">🏁</span><span>2024 TEAMS</span></div>
          <h1 className="hero-title">F1 TEAMS</h1>
          <p className="hero-subtitle">Constructor Championship Contenders</p>
        </div>
      </section>
      <section className="content-section">
        <div className="coming-soon">
          <h2>🏎️ Teams Page</h2>
          <p>Full team profiles coming soon!</p>
        </div>
      </section>
    </div>
  );
};

export default Teams;

