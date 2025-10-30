import React from 'react';
import { Link } from 'react-router-dom';
import './DriversInfo.css';

const drivers = [
  { id: 'max-verstappen', name: 'Max Verstappen', team: 'Red Bull Racing', number: '1', image: '/assets/players1.png' },
  { id: 'lewis-hamilton', name: 'Lewis Hamilton', team: 'Mercedes-AMG Petronas', number: '44', image: '/assets/player2.jpg' },
  { id: 'lando-norris', name: 'Lando Norris', team: 'McLaren Racing', number: '4', image: '/assets/player3.jpg' },
  { id: 'charles-leclerc', name: 'Charles Leclerc', team: 'Scuderia Ferrari', number: '16', image: '/assets/player4.jpg' },
  { id: 'oscar-piastri', name: 'Oscar Piastri', team: 'McLaren Racing', number: '81', image: '/assets/player5.jpg' },
  { id: 'sergio-perez', name: 'Sergio Pérez', team: 'Red Bull Racing', number: '11', image: '/assets/Sergio Pérez.png' },
  { id: 'carlos-sainz', name: 'Carlos Sainz', team: 'Scuderia Ferrari', number: '55', image: '/assets/carlos sainz.png' },
  { id: 'george-russell', name: 'George Russell', team: 'Mercedes-AMG Petronas', number: '63', image: '/assets/George Russell.png' },
  { id: 'fernando-alonso', name: 'Fernando Alonso', team: 'Aston Martin Aramco', number: '14', image: '/assets/fernando alonso.png' },
];

const DriversInfo: React.FC = () => {
  return (
    <div className="drivers-info-page">
      {/* Hero Section */}
      <section className="drivers-hero">
        <div className="hero-background">
          <div className="hero-grid"></div>
        </div>
        <div className="hero-content">
          <div className="animated-badge">
            <span className="badge-icon">🏎️</span>
            <span>2024 GRID</span>
          </div>
          <h1 className="hero-title">F1 DRIVERS</h1>
          <p className="hero-subtitle">Meet the Champions of Formula 1</p>
        </div>
      </section>

      {/* Drivers Grid */}
      <section className="drivers-grid-section">
        <div className="drivers-grid">
          {drivers.map((driver) => (
            <Link to={`/drivers/${driver.id}`} key={driver.id} className="driver-card-link">
              <div className="driver-card">
                <div className="driver-number-badge">{driver.number}</div>
                <div className="driver-image-wrapper">
                  <img src={driver.image} alt={driver.name} />
                </div>
                <div className="driver-info">
                  <h3>{driver.name}</h3>
                  <p>{driver.team}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DriversInfo;

