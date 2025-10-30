import React, { useState, useEffect } from 'react';
import './RaceResults.css';

interface Driver {
  driverId: string;
  givenName: string;
  familyName: string;
}

interface Constructor {
  name: string;
  constructorId: string;
}

interface Time {
  time: string;
}

interface FastestLap {
  rank: string;
  Time: Time;
}

interface Result {
  position: string;
  Driver: Driver;
  Constructor: Constructor;
  Time?: Time;
  status: string;
  points: string;
  FastestLap?: FastestLap;
}

interface Circuit {
  circuitName: string;
  Location: {
    locality: string;
    country: string;
  };
}

interface Race {
  round: string;
  raceName: string;
  date: string;
  time: string;
  Circuit: Circuit;
  Results: Result[];
}

interface RaceListItem {
  round: string;
  raceName: string;
  date: string;
}

interface LapData {
  Driver: Driver;
  Constructor: Constructor;
  Time: Time;
}

interface PitStop {
  driverId: string;
  lap: string;
  stop: string;
  time: string;
  duration: string;
}

const RaceResults: React.FC = () => {
  const [raceData, setRaceData] = useState<Race | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [racesList, setRacesList] = useState<RaceListItem[]>([]);
  const [selectedRound, setSelectedRound] = useState<string>('last');
  const [fastestLaps, setFastestLaps] = useState<LapData[]>([]);
  const [pitStops, setPitStops] = useState<PitStop[]>([]);

  // Fetch all races for selector
  useEffect(() => {
    populateRaceSelector();
  }, []);

  // Fetch race results when round changes
  useEffect(() => {
    if (selectedRound) {
      fetchRaceResults(selectedRound);
    }
  }, [selectedRound]);

  const populateRaceSelector = async () => {
    try {
      const response = await fetch('https://api.jolpi.ca/ergast/f1/2024');
      if (response.ok) {
        const data = await response.json();
        const races = data.MRData?.RaceTable?.Races || [];
        setRacesList(races);
      }
    } catch (err) {
      console.error('Failed to load races list:', err);
    }
  };

  const fetchRaceResults = async (round: string = 'last') => {
    setLoading(true);
    setError(null);

    try {
      console.log(`🏎️ Fetching race results for round ${round}...`);
      const response = await fetch(`https://api.jolpi.ca/ergast/f1/2024/${round}/results`);

      if (response.ok) {
        const data = await response.json();
        if (data.MRData?.RaceTable?.Races && data.MRData.RaceTable.Races.length > 0) {
          console.log('✅ Race results loaded!');
          const results = data.MRData.RaceTable.Races[0];
          setRaceData(results);

          // Also fetch fastest laps and pit stops
          fetchFastestLaps(round);
          fetchPitStops(round);
        } else {
          setError('No race results found');
        }
      } else {
        setError('Failed to fetch race results');
      }
    } catch (err) {
      console.error('❌ Failed to load race results:', err);
      setError('Unable to load race results. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFastestLaps = async (round: string) => {
    try {
      const response = await fetch(`https://api.jolpi.ca/ergast/f1/2024/${round}/results`);
      if (response.ok) {
        const data = await response.json();
        const race = data.MRData?.RaceTable?.Races?.[0];
        
        if (race?.Results) {
          // Filter and sort by fastest lap time
          const lapsWithTime = race.Results
            .filter((r: Result) => r.FastestLap?.Time)
            .map((r: Result) => ({
              Driver: r.Driver,
              Constructor: r.Constructor,
              Time: r.FastestLap!.Time
            }))
            .sort((a: LapData, b: LapData) => {
              const timeA = convertLapTimeToSeconds(a.Time.time);
              const timeB = convertLapTimeToSeconds(b.Time.time);
              return timeA - timeB;
            })
            .slice(0, 6); // Top 6
          
          setFastestLaps(lapsWithTime);
        }
      }
    } catch (err) {
      console.error('Failed to load fastest laps:', err);
    }
  };

  const fetchPitStops = async (round: string) => {
    try {
      const response = await fetch(`https://api.jolpi.ca/ergast/f1/2024/${round}/pitstops`);
      if (response.ok) {
        const data = await response.json();
        const stops = data.MRData?.RaceTable?.Races?.[0]?.PitStops || [];
        setPitStops(stops);
      }
    } catch (err) {
      console.error('Failed to load pit stops:', err);
    }
  };

  const convertLapTimeToSeconds = (timeStr: string): number => {
    const parts = timeStr.split(':');
    const minutes = parseInt(parts[0] || '0');
    const seconds = parseFloat(parts[1] || '0');
    return minutes * 60 + seconds;
  };

  const getDriverAvatar = (driver: Driver) => {
    const driverId = driver.driverId;
    const officialUrl = `https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${new Date().getFullYear()}Drivers/${driverId}.png.transform/1col/image.png`;
    const fallbackUrl = `https://ui-avatars.com/api/?name=${driver.givenName}+${driver.familyName}&size=80&background=e10600&color=fff&bold=true&font-size=0.4`;
    
    return (
      <img 
        src={officialUrl}
        alt={driver.familyName}
        className="driver-avatar"
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallbackUrl;
        }}
      />
    );
  };

  const calculatePitStopStats = () => {
    if (pitStops.length === 0) return null;

    // Find fastest pit stop
    const fastestStop = pitStops.reduce((fastest, stop) => {
      const currentDuration = parseFloat(stop.duration);
      const fastestDuration = parseFloat(fastest.duration);
      return currentDuration < fastestDuration ? stop : fastest;
    });

    // Calculate average
    const totalDuration = pitStops.reduce((sum, stop) => sum + parseFloat(stop.duration), 0);
    const avgDuration = (totalDuration / pitStops.length).toFixed(3);

    // Count total stops
    const totalStops = pitStops.length;

    return { fastestStop, avgDuration, totalStops };
  };

  if (loading) {
    return (
      <div className="race-results-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Loading Race Results...</h2>
        </div>
      </div>
    );
  }

  if (error && !raceData) {
    return (
      <div className="race-results-page">
        <div className="error-container">
          <h2>❌ {error}</h2>
          <button className="retry-btn" onClick={() => fetchRaceResults(selectedRound)}>
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  const pitStopStats = calculatePitStopStats();

  return (
    <div className="race-results-page">
      {/* Hero Section with Race Selector */}
      <section className="results-hero">
        <div className="hero-background">
          <div className="hero-grid"></div>
        </div>
        <div className="hero-content">
          <div className="animated-badge">
            <span className="badge-icon">🏁</span>
            <span>LIVE RACE RESULTS</span>
          </div>
          <h1 className="hero-title">RACE RESULTS 2024</h1>
          
          {raceData && (
            <div className="race-info">
              <div className="info-item">
                <span>🏎️</span>
                <span>{raceData.raceName}</span>
              </div>
              <div className="info-item">
                <span>📍</span>
                <span>{raceData.Circuit.circuitName}</span>
              </div>
              <div className="info-item">
                <span>📅</span>
                <span>{new Date(raceData.date).toLocaleDateString()}</span>
              </div>
            </div>
          )}

          {/* Race Selector */}
          <div className="race-selector-inline">
            <label className="selector-label">SELECT A RACE</label>
            <select 
              className="race-selector"
              value={selectedRound}
              onChange={(e) => setSelectedRound(e.target.value)}
            >
              <option value="last">Latest Race</option>
              {racesList.map((race) => (
                <option key={race.round} value={race.round}>
                  Round {race.round} - {race.raceName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Classification Section */}
      {raceData && (
        <section className="classification-section">
          <div className="glass-container">
            <div className="section-title-pro">
              <span className="title-icon">🏆</span>
              <span className="title-text">FULL CLASSIFICATION</span>
              <span className="title-line"></span>
            </div>

            <div className="results-table-container">
              <table className="results-table">
                <thead>
                  <tr>
                    <th className="result-pos">POS</th>
                    <th className="result-driver">DRIVER</th>
                    <th className="result-team">TEAM</th>
                    <th className="result-time">TIME/STATUS</th>
                    <th className="result-points">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {raceData.Results.slice(0, 10).map((result, index) => {
                    const hasFastestLap = result.FastestLap?.rank === '1';
                    const isPodium = index < 3;
                    const medals = ['🥇', '🥈', '🥉'];

                    return (
                      <tr key={result.position} className={`result-row ${isPodium ? 'podium' : ''}`}>
                        <td className="result-pos">
                          <div className={`position-number ${isPodium ? 'podium' : ''}`}>
                            {isPodium ? medals[index] : result.position}
                          </div>
                        </td>
                        <td className="result-driver">
                          <div className="result-driver">
                            {getDriverAvatar(result.Driver)}
                            <div className="driver-name">
                              {result.Driver.givenName} {result.Driver.familyName}
                              {hasFastestLap && <span className="fastest-lap-badge">⚡</span>}
                            </div>
                          </div>
                        </td>
                        <td className="result-team">{result.Constructor.name}</td>
                        <td className="result-time">{result.Time ? result.Time.time : result.status}</td>
                        <td className="result-points">{result.points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Fastest Laps Section */}
      {fastestLaps.length > 0 && (
        <section className="fastest-laps-section-pro">
          <div className="section-title-pro">
            <span className="title-icon">⚡</span>
            <span className="title-text">FASTEST LAPS</span>
            <span className="title-line purple"></span>
          </div>

          <div className="laps-grid">
            {fastestLaps.map((lap, index) => (
              <div key={index} className="lap-card">
                <div className="lap-rank">{index + 1}</div>
                <div className="lap-driver">
                  <div className="lap-driver-name">
                    {lap.Driver.givenName} {lap.Driver.familyName}
                  </div>
                  <div className="lap-team">{lap.Constructor.name}</div>
                  <div className="lap-time" style={{
                    fontSize: '1.8rem',
                    fontFamily: 'var(--font-display)',
                    color: '#8b5cf6',
                    marginTop: '1rem',
                    fontWeight: 700
                  }}>
                    ⏱️ {lap.Time.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pit Stops Section */}
      {pitStopStats && (
        <section className="pitstops-section-pro">
          <div className="section-title-pro">
            <span className="title-icon">🔧</span>
            <span className="title-text">PIT STOP ANALYTICS</span>
            <span className="title-line gold"></span>
          </div>

          <div className="pitstops-grid">
            <div className="pitstop-card">
              <div className="pitstop-icon">⚡</div>
              <div className="pitstop-label">Fastest Stop</div>
              <div className="pitstop-value">{pitStopStats.fastestStop.duration}s</div>
              <div className="pitstop-team" style={{ color: 'var(--gray-400)', marginTop: '0.5rem' }}>
                Lap {pitStopStats.fastestStop.lap}
              </div>
            </div>

            <div className="pitstop-card">
              <div className="pitstop-icon">📊</div>
              <div className="pitstop-label">Average Stop</div>
              <div className="pitstop-value">{pitStopStats.avgDuration}s</div>
            </div>

            <div className="pitstop-card">
              <div className="pitstop-icon">🔢</div>
              <div className="pitstop-label">Total Pit Stops</div>
              <div className="pitstop-value">{pitStopStats.totalStops}</div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default RaceResults;
