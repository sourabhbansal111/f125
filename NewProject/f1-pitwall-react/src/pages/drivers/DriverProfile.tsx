import React from 'react';
import { Link } from 'react-router-dom';

interface DriverData {
  name: string;
  number: string;
  team: string;
  nationality: string;
  flag: string;
  image: string;
  badge: string;
  wins: number;
  podiums: number;
  poles: number;
  championships: number;
  gpStarts: number;
  fastestLaps: number;
  age: number;
  careerYears: string;
  season2024: {
    wins: number;
    winRate: number;
    poles: number;
    poleRate: number;
    podiums: number;
    podiumRate: number;
    points: number;
    pointsRate: number;
  };
  biography: {
    intro: string;
    achievement: string;
    current: string;
  };
  carLink: string;
  carName: string;
  engine: string;
}

interface DriverProfileProps {
  driver: DriverData;
}

const DriverProfile: React.FC<DriverProfileProps> = ({ driver }) => {
  return (
    <div className="profile-page">
      {/* Hero Section */}
      <div className="profile-hero">
        <div className="hero-background">
          <div className="hero-grid"></div>
        </div>
        
        <div className="profile-hero-content">
          <div className="driver-image-container">
            <div className="driver-glow"></div>
            <img src={driver.image} alt={driver.name} className="driver-hero-image" />
            <div className="driver-number">{driver.number}</div>
          </div>
          
          <div className="driver-hero-info">
            <div className="hero-badge">{driver.badge}</div>
            <h1 className="driver-name">{driver.name}</h1>
            <div className="team-info">
              <span className="team-name">🏎️ {driver.team}</span>
              <span className="nationality">{driver.flag} {driver.nationality}</span>
            </div>
            
            <div className="quick-stats">
              <div className="quick-stat">
                <div className="stat-number">{driver.wins}</div>
                <div className="stat-label">Wins</div>
              </div>
              <div className="quick-stat">
                <div className="stat-number">{driver.podiums}</div>
                <div className="stat-label">Podiums</div>
              </div>
              {driver.championships > 0 && (
                <div className="quick-stat">
                  <div className="stat-number">{driver.championships}</div>
                  <div className="stat-label">Championships</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Career Highlights */}
      <section className="career-section">
        <h2 className="section-title-pro">
          <span className="title-icon">🏆</span>
          CAREER HIGHLIGHTS
        </h2>
        
        <div className="highlights-grid">
          {driver.championships > 0 && (
            <div className="highlight-card">
              <div className="highlight-icon">🥇</div>
              <div className="highlight-title">World Championships</div>
              <div className="highlight-value">{driver.championships}</div>
            </div>
          )}
          
          <div className="highlight-card">
            <div className="highlight-icon">🏁</div>
            <div className="highlight-title">Race Victories</div>
            <div className="highlight-value">{driver.wins}</div>
            <div className="highlight-years">{driver.careerYears}</div>
          </div>
          
          <div className="highlight-card">
            <div className="highlight-icon">⚡</div>
            <div className="highlight-title">Pole Positions</div>
            <div className="highlight-value">{driver.poles}</div>
          </div>
          
          <div className="highlight-card">
            <div className="highlight-icon">🏅</div>
            <div className="highlight-title">Podium Finishes</div>
            <div className="highlight-value">{driver.podiums}</div>
          </div>
        </div>
      </section>

      {/* 2024 Performance */}
      <section className="performance-section-pro">
        <h2 className="section-title-pro">
          <span className="title-icon">📊</span>
          2024 SEASON PERFORMANCE
        </h2>
        
        <div className="performance-grid-pro">
          <div className="performance-card-pro">
            <div className="perf-header">
              <span className="perf-icon">🏆</span>
              <span className="perf-title">Race Wins</span>
            </div>
            <div className="perf-bar-container">
              <div className="perf-bar-bg">
                <div className="perf-bar-fill" style={{width: `${driver.season2024.winRate}%`}}></div>
              </div>
              <div className="perf-value">{driver.season2024.wins} / 24</div>
            </div>
            <div className="perf-percentage">{driver.season2024.winRate}% Win Rate</div>
          </div>
          
          <div className="performance-card-pro">
            <div className="perf-header">
              <span className="perf-icon">⚡</span>
              <span className="perf-title">Pole Positions</span>
            </div>
            <div className="perf-bar-container">
              <div className="perf-bar-bg">
                <div className="perf-bar-fill" style={{width: `${driver.season2024.poleRate}%`}}></div>
              </div>
              <div className="perf-value">{driver.season2024.poles} / 24</div>
            </div>
            <div className="perf-percentage">{driver.season2024.poleRate}% Conversion</div>
          </div>
          
          <div className="performance-card-pro">
            <div className="perf-header">
              <span className="perf-icon">🏅</span>
              <span className="perf-title">Podium Finishes</span>
            </div>
            <div className="perf-bar-container">
              <div className="perf-bar-bg">
                <div className="perf-bar-fill" style={{width: `${driver.season2024.podiumRate}%`}}></div>
              </div>
              <div className="perf-value">{driver.season2024.podiums} / 24</div>
            </div>
            <div className="perf-percentage">{driver.season2024.podiumRate}% Success Rate</div>
          </div>
          
          <div className="performance-card-pro">
            <div className="perf-header">
              <span className="perf-icon">📈</span>
              <span className="perf-title">Championship Points</span>
            </div>
            <div className="perf-bar-container">
              <div className="perf-bar-bg">
                <div className="perf-bar-fill" style={{width: `${driver.season2024.pointsRate}%`}}></div>
              </div>
              <div className="perf-value">{driver.season2024.points}</div>
            </div>
            <div className="perf-percentage">{driver.season2024.pointsRate}% Max Points</div>
          </div>
        </div>
      </section>

      {/* Current Car */}
      <section className="driver-car-section">
        <h2 className="section-title-pro">
          <span className="title-icon">🏎️</span>
          CURRENT MACHINERY
        </h2>
        
        <div className="car-showcase">
          <Link to={driver.carLink} className="car-showcase-card">
            <div className="car-image-wrapper">
              <img src="/assets/car1A.jpg" alt={driver.carName} className="showcase-car-image" />
              <div className="car-overlay">
                <span className="view-details-btn">VIEW DETAILS →</span>
              </div>
            </div>
            
            <div className="car-showcase-info">
              <h3 className="car-showcase-title">{driver.carName}</h3>
              <p className="car-showcase-subtitle">2024 Championship Contender</p>
              
              <div className="car-specs-grid">
                <div className="car-spec-item">
                  <span className="spec-icon">⚙️</span>
                  <div className="spec-info">
                    <div className="spec-label">Engine</div>
                    <div className="spec-value">{driver.engine}</div>
                  </div>
                </div>
                
                <div className="car-spec-item">
                  <span className="spec-icon">💨</span>
                  <div className="spec-info">
                    <div className="spec-label">Top Speed</div>
                    <div className="spec-value">350+ km/h</div>
                  </div>
                </div>
                
                <div className="car-spec-item">
                  <span className="spec-icon">⚡</span>
                  <div className="spec-info">
                    <div className="spec-label">Power Output</div>
                    <div className="spec-value">1000+ HP</div>
                  </div>
                </div>
                
                <div className="car-spec-item">
                  <span className="spec-icon">⚖️</span>
                  <div className="spec-info">
                    <div className="spec-label">Weight</div>
                    <div className="spec-value">798 kg</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Biography */}
      <section className="biography-section">
        <h2 className="section-title-pro">
          <span className="title-icon">📖</span>
          DRIVER BIOGRAPHY
        </h2>
        
        <div className="bio-content">
          <div className="bio-header">
            <div className="bio-icon-large">🏆</div>
            <div className="bio-header-text">
              <h3>The Story Behind the Champion</h3>
              <p>From Karting Prodigy to F1 Legend</p>
            </div>
          </div>
          
          <div className="bio-body">
            <p className="bio-paragraph">{driver.biography.intro}</p>
            <p className="bio-paragraph">{driver.biography.achievement}</p>
            <p className="bio-paragraph">{driver.biography.current}</p>
          </div>
          
          <div className="bio-stats">
            <div className="bio-stat-item">
              <span className="bio-stat-icon">🎂</span>
              <span className="bio-stat-label">Age</span>
              <span className="bio-stat-value">{driver.age}</span>
            </div>
            <div className="bio-stat-item">
              <span className="bio-stat-icon">🏁</span>
              <span className="bio-stat-label">GP Starts</span>
              <span className="bio-stat-value">{driver.gpStarts}</span>
            </div>
            <div className="bio-stat-item">
              <span className="bio-stat-icon">⚡</span>
              <span className="bio-stat-label">Fastest Laps</span>
              <span className="bio-stat-value">{driver.fastestLaps}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DriverProfile;

