import React, { useState, useEffect } from 'react';
import './Standings.css';

interface Driver {
  driverId: string;
  givenName: string;
  familyName: string;
  permanentNumber: string;
  nationality: string;
}

interface Constructor {
  constructorId: string;
  name: string;
  nationality: string;
}

interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Constructor[];
}

interface ConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: Constructor;
}

const Standings: React.FC = () => {
  const [driverStandings, setDriverStandings] = useState<DriverStanding[]>([]);
  const [constructorStandings, setConstructorStandings] = useState<ConstructorStanding[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'drivers' | 'constructors'>('drivers');

  useEffect(() => {
    fetchStandings();
  }, []);

  const fetchStandings = async () => {
    setLoading(true);
    try {
      // Fetch Driver Standings
      const driversResponse = await fetch('https://api.jolpi.ca/ergast/f1/current/driverStandings');
      const driversData = await driversResponse.json();
      const drivers = driversData.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings || [];
      setDriverStandings(drivers);

      // Fetch Constructor Standings
      const constructorsResponse = await fetch('https://api.jolpi.ca/ergast/f1/current/constructorStandings');
      const constructorsData = await constructorsResponse.json();
      const constructors = constructorsData.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings || [];
      setConstructorStandings(constructors);
    } catch (error) {
      console.error('Failed to load standings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="standings-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Loading Standings...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="standings-page">
      {/* Hero Section */}
      <section className="standings-hero">
        <div className="hero-background">
          <div className="hero-grid"></div>
        </div>
        <div className="hero-content">
          <div className="animated-badge">
            <span className="badge-icon">🏆</span>
            <span>LIVE STANDINGS</span>
          </div>
          <h1 className="hero-title">CHAMPIONSHIP STANDINGS</h1>
          <p className="hero-subtitle">2024 Formula 1 World Championship</p>
        </div>
      </section>

      {/* Tab Controls */}
      <div className="standings-controls">
        <button 
          className={`tab-btn ${activeTab === 'drivers' ? 'active' : ''}`}
          onClick={() => setActiveTab('drivers')}
        >
          🏎️ Driver Standings
        </button>
        <button 
          className={`tab-btn ${activeTab === 'constructors' ? 'active' : ''}`}
          onClick={() => setActiveTab('constructors')}
        >
          🏁 Constructor Standings
        </button>
      </div>

      {/* Standings Table */}
      <section className="standings-section">
        {activeTab === 'drivers' ? (
          <div className="standings-container">
            <table className="standings-table">
              <thead>
                <tr>
                  <th>POS</th>
                  <th>DRIVER</th>
                  <th>NATIONALITY</th>
                  <th>TEAM</th>
                  <th>WINS</th>
                  <th>POINTS</th>
                </tr>
              </thead>
              <tbody>
                {driverStandings.map((standing, index) => (
                  <tr key={standing.Driver.driverId} className={`standing-row ${index < 3 ? 'podium' : ''}`}>
                    <td className="pos-cell">
                      <div className={`position ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}>
                        {standing.position}
                      </div>
                    </td>
                    <td className="driver-cell">
                      <strong>{standing.Driver.givenName} {standing.Driver.familyName}</strong>
                    </td>
                    <td>{standing.Driver.nationality}</td>
                    <td>{standing.Constructors[0]?.name}</td>
                    <td className="wins-cell">{standing.wins}</td>
                    <td className="points-cell">{standing.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="standings-container">
            <table className="standings-table">
              <thead>
                <tr>
                  <th>POS</th>
                  <th>TEAM</th>
                  <th>NATIONALITY</th>
                  <th>WINS</th>
                  <th>POINTS</th>
                </tr>
              </thead>
              <tbody>
                {constructorStandings.map((standing, index) => (
                  <tr key={standing.Constructor.constructorId} className={`standing-row ${index < 3 ? 'podium' : ''}`}>
                    <td className="pos-cell">
                      <div className={`position ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}>
                        {standing.position}
                      </div>
                    </td>
                    <td className="team-cell">
                      <strong>{standing.Constructor.name}</strong>
                    </td>
                    <td>{standing.Constructor.nationality}</td>
                    <td className="wins-cell">{standing.wins}</td>
                    <td className="points-cell">{standing.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Standings;

