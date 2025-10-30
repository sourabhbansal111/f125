import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">2025 SEASON</div>
          <h1 className="hero-title">
            <span className="title-line">Welcome to</span>
            <span className="title-main" data-text="F1 PITWALL">F1 PITWALL</span>
          </h1>
          <p className="hero-subtitle">Your Ultimate F1 Data & Visualization Hub with Live Updates</p>
          <a href="#players" className="cta-button">
            <span>Explore Drivers</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
        <div className="data-ticker">
          <span className="ticker-live">LIVE</span>
          <div className="ticker-content">
            <p>🏎️ REAL-TIME F1 DATA | LIVE STANDINGS | RACE RESULTS | DRIVER STATS | TEAM PERFORMANCE | CIRCUITS INFO 🏁</p>
          </div>
        </div>
      </section>

      {/* Featured Drivers Section */}
      <section id="players" className="drivers-section">
        <div className="section-header">
          <div className="section-badge">2025 GRID</div>
          <h2 className="section-title">Meet the Drivers</h2>
          <p className="section-subtitle">The world's fastest racing drivers competing for glory</p>
        </div>
        
        <div className="drivers-grid">
          <Link to="/drivers/max-verstappen" className="driver-card">
            <div className="card-image-wrapper">
              <img src="/assets/players1.png" alt="Max Verstappen" />
              <div className="card-overlay"></div>
            </div>
            <div className="card-content">
              <div className="card-number">1</div>
              <h3 className="card-name">Max Verstappen</h3>
              <p className="card-team">Red Bull Racing</p>
              <div className="card-stats">
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  62 Wins
                </span>
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  3x WDC
                </span>
              </div>
            </div>
          </Link>

          <Link to="/drivers/lewis-hamilton" className="driver-card">
            <div className="card-image-wrapper">
              <img src="/assets/player2.jpg" alt="Lewis Hamilton" />
              <div className="card-overlay"></div>
            </div>
            <div className="card-content">
              <div className="card-number">44</div>
              <h3 className="card-name">Lewis Hamilton</h3>
              <p className="card-team">Mercedes-AMG Petronas</p>
              <div className="card-stats">
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  105 Wins
                </span>
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  7x WDC
                </span>
              </div>
            </div>
          </Link>

          <Link to="/drivers/lando-norris" className="driver-card">
            <div className="card-image-wrapper">
              <img src="/assets/player3.jpg" alt="Lando Norris" />
              <div className="card-overlay"></div>
            </div>
            <div className="card-content">
              <div className="card-number">4</div>
              <h3 className="card-name">Lando Norris</h3>
              <p className="card-team">McLaren F1 Team</p>
              <div className="card-stats">
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  Speed King
                </span>
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  4 Wins
                </span>
              </div>
            </div>
          </Link>

          <Link to="/drivers/charles-leclerc" className="driver-card">
            <div className="card-image-wrapper">
              <img src="/assets/player4.jpg" alt="Charles Leclerc" />
              <div className="card-overlay"></div>
            </div>
            <div className="card-content">
              <div className="card-number">16</div>
              <h3 className="card-name">Charles Leclerc</h3>
              <p className="card-team">Scuderia Ferrari</p>
              <div className="card-stats">
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  Ferrari Star
                </span>
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  26 Poles
                </span>
              </div>
            </div>
          </Link>

          <Link to="/drivers/oscar-piastri" className="driver-card">
            <div className="card-image-wrapper">
              <img src="/assets/player5.jpg" alt="Oscar Piastri" />
              <div className="card-overlay"></div>
            </div>
            <div className="card-content">
              <div className="card-number">81</div>
              <h3 className="card-name">Oscar Piastri</h3>
              <p className="card-team">McLaren F1 Team</p>
              <div className="card-stats">
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  Rising Star
                </span>
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  2 Wins
                </span>
              </div>
            </div>
          </Link>

          <Link to="/drivers/sergio-perez" className="driver-card">
            <div className="card-image-wrapper">
              <img src="/assets/Sergio Pérez.png" alt="Sergio Perez" />
              <div className="card-overlay"></div>
            </div>
            <div className="card-content">
              <div className="card-number">11</div>
              <h3 className="card-name">Sergio Perez</h3>
              <p className="card-team">Red Bull Racing</p>
              <div className="card-stats">
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  6 Wins
                </span>
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  39 Podiums
                </span>
              </div>
            </div>
          </Link>

          <Link to="/drivers/carlos-sainz" className="driver-card">
            <div className="card-image-wrapper">
              <img src="/assets/carlos sainz.png" alt="Carlos Sainz" />
              <div className="card-overlay"></div>
            </div>
            <div className="card-content">
              <div className="card-number">55</div>
              <h3 className="card-name">Carlos Sainz</h3>
              <p className="card-team">Scuderia Ferrari</p>
              <div className="card-stats">
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  3 Wins
                </span>
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  25 Podiums
                </span>
              </div>
            </div>
          </Link>

          <Link to="/drivers/george-russell" className="driver-card">
            <div className="card-image-wrapper">
              <img src="/assets/George Russell.png" alt="George Russell" />
              <div className="card-overlay"></div>
            </div>
            <div className="card-content">
              <div className="card-number">63</div>
              <h3 className="card-name">George Russell</h3>
              <p className="card-team">Mercedes-AMG Petronas</p>
              <div className="card-stats">
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  2 Wins
                </span>
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  13 Podiums
                </span>
              </div>
            </div>
          </Link>

          <Link to="/drivers/fernando-alonso" className="driver-card">
            <div className="card-image-wrapper">
              <img src="/assets/fernando alonso.png" alt="Fernando Alonso" />
              <div className="card-overlay"></div>
            </div>
            <div className="card-content">
              <div className="card-number">14</div>
              <h3 className="card-name">Fernando Alonso</h3>
              <p className="card-team">Aston Martin Aramco</p>
              <div className="card-stats">
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  32 Wins
                </span>
                <span className="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  2x WDC
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
