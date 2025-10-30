import React, { useState, useEffect, useCallback } from 'react';

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
}

const Calendar: React.FC = () => {
  const [allRaces, setAllRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<'upcoming' | 'previous'>('upcoming');
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [raceResults, setRaceResults] = useState<any>(null);
  const [qualifyingResults, setQualifyingResults] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);

  const fetchRaceSchedule = useCallback(async () => {
    console.log('🏎️ Loading F1 Calendar from APIs...');
    
    // Try multiple APIs in sequence
    const apis = [
      'https://api.jolpi.ca/ergast/f1/2025.json',
      'http://ergast.com/api/f1/2025.json',
      'https://ergast.com/api/f1/2025.json'
    ];
    
    for (const apiUrl of apis) {
      try {
        console.log(`📡 Trying API: ${apiUrl}`);
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          const races = data.MRData?.RaceTable?.Races;
          if (races && races.length > 0) {
            console.log(`✅ API Success! ${races.length} races loaded from ${apiUrl}`);
            setAllRaces(races);
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.warn(`⚠️ API failed: ${apiUrl}`, error);
      }
    }
    
    // All APIs failed
    console.error('❌ All APIs failed, no data available');
    setAllRaces([]);
    setLoading(false);
  }, []);

  const fetchRacesByYear = useCallback(async (year: number) => {
    console.log(`🏎️ Loading F1 Calendar for ${year}...`);
    setLoading(true);
    
    // Try multiple APIs in sequence
    const apis = [
      `https://api.jolpi.ca/ergast/f1/${year}.json`,
      `http://ergast.com/api/f1/${year}.json`,
      `https://ergast.com/api/f1/${year}.json`
    ];
    
    for (const apiUrl of apis) {
      try {
        console.log(`📡 Trying API: ${apiUrl}`);
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          const races = data.MRData?.RaceTable?.Races;
          if (races && races.length > 0) {
            console.log(`✅ API Success! ${races.length} races loaded for ${year}`);
            setAllRaces(races);
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.warn(`⚠️ API failed: ${apiUrl}`, error);
      }
    }
    
    // All APIs failed
    console.error(`❌ All APIs failed for year ${year}`);
    setAllRaces([]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (activeView === 'upcoming') {
      fetchRaceSchedule();
    } else if (activeView === 'previous') {
      fetchRacesByYear(selectedYear);
    }
  }, [selectedYear, activeView, fetchRaceSchedule, fetchRacesByYear]);

  const loadRaceDetails = async (race: Race) => {
    setLoadingDetails(true);
    setRaceResults(null);
    setQualifyingResults(null);

    const year = race.date.split('-')[0];
    const round = race.round;
    const raceDate = new Date(race.date);
    const now = new Date();
    const isPastRace = raceDate < now;

    if (isPastRace) {
      // Fetch race results
      try {
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/${round}/results.json`);
        if (response.ok) {
          const data = await response.json();
          const results = data.MRData?.RaceTable?.Races[0]?.Results;
          if (results) {
            setRaceResults(results);
          }
        }
      } catch (err) {
        console.warn('❌ Could not fetch race results:', err);
      }

      // Fetch qualifying results
      try {
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/${round}/qualifying.json`);
        if (response.ok) {
          const data = await response.json();
          const results = data.MRData?.RaceTable?.Races[0]?.QualifyingResults;
          if (results) {
            setQualifyingResults(results);
          }
        }
      } catch (err) {
        console.warn('❌ Could not fetch qualifying results:', err);
      }
    }

    setLoadingDetails(false);
  };

  const getCountryFlag = (country: string): string => {
    const flagMap: { [key: string]: string } = {
      'Australia': '🇦🇺', 'China': '🇨🇳', 'Japan': '🇯🇵', 'Bahrain': '🇧🇭',
      'Saudi Arabia': '🇸🇦', 'USA': '🇺🇸', 'Italy': '🇮🇹', 'Monaco': '🇲🇨',
      'Spain': '🇪🇸', 'Canada': '🇨🇦', 'Austria': '🇦🇹', 'UK': '🇬🇧',
      'Hungary': '🇭🇺', 'Belgium': '🇧🇪', 'Netherlands': '🇳🇱', 'Azerbaijan': '🇦🇿',
      'Singapore': '🇸🇬', 'Mexico': '🇲🇽', 'Brazil': '🇧🇷', 'Qatar': '🇶🇦',
      'UAE': '🇦🇪'
    };
    return flagMap[country] || '🏁';
  };

  const formatRaceDate = (dateStr: string, timeStr: string): string => {
    const date = new Date(dateStr + 'T' + timeStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getRacesByView = () => {
    const now = new Date();
    return allRaces.filter(race => {
      const raceDate = new Date(race.date);
      return activeView === 'upcoming' ? raceDate >= now : raceDate < now;
    }).sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return activeView === 'upcoming' 
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
  };

  const filteredRaces = getRacesByView();

  if (loading) {
    return (
      <div className="calendar-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Loading Calendar...</h2>
        </div>
      </div>
    );
  }

  return (
    <main>
      <section className="calendar-section">
        <div className="section-header">
          <div className="section-badge">SEASON SCHEDULE</div>
          <h2 className="section-title">Race Calendar 2025 <span className="live-badge">🔴 LIVE</span></h2>
          <p className="section-subtitle">Complete schedule of all Grand Prix races</p>
          <div className="last-updated" style={{ textAlign: 'center', color: 'var(--gray-400)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            <span>⟳ Updates automatically every 10 minutes</span>
          </div>
          
          <div className="calendar-toggle">
            <button 
              className={`toggle-btn ${activeView === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveView('upcoming')}
            >
              <span className="toggle-icon">🔮</span>
              <span>Upcoming Races</span>
            </button>
            <button 
              className={`toggle-btn ${activeView === 'previous' ? 'active' : ''}`}
              onClick={() => setActiveView('previous')}
            >
              <span className="toggle-icon">✓</span>
              <span>Previous Races</span>
            </button>
          </div>
          
          {activeView === 'previous' && (
            <div className="year-selector" style={{ display: 'block' }}>
              <div className="year-selector-header">
                <span className="year-label">📅 Select Season</span>
              </div>
              <div className="year-slider-container">
                <button 
                  className="year-nav-btn" 
                  onClick={() => setSelectedYear(Math.max(1950, selectedYear - 1))}
                >
                  ◀
                </button>
                <div className="year-display">
                  <span className="year-value">{selectedYear}</span>
                </div>
                <button 
                  className="year-nav-btn" 
                  onClick={() => setSelectedYear(Math.min(2024, selectedYear + 1))}
                >
                  ▶
                </button>
              </div>
              <input 
                type="range" 
                className="year-slider" 
                min="1950" 
                max="2024" 
                value={selectedYear} 
                step="1"
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              />
              <div className="year-range-labels">
                <span>1950</span>
                <span>2024</span>
              </div>
            </div>
          )}
        </div>
        <div className="races-grid">
          {filteredRaces.length === 0 ? (
            <div className="no-races">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                {activeView === 'upcoming' ? '🏁' : '📜'}
              </div>
              <h3>No {activeView === 'upcoming' ? 'Upcoming' : 'Previous'} Races</h3>
              <p>
                {activeView === 'upcoming' 
                  ? 'The season calendar will be announced soon!' 
                  : 'The season hasn\'t started yet!'}
              </p>
            </div>
          ) : (
            filteredRaces.map((race, index) => {
              const isNext = activeView === 'upcoming' && index === 0;
              const isRecent = activeView === 'previous' && index === 0;

              return (
                <div 
                  key={race.round} 
                  className={`race-card ${isNext ? 'race-next' : ''} ${activeView === 'previous' ? 'race-past' : ''} ${isRecent ? 'race-recent' : ''}`}
                  onClick={() => {
                    setSelectedRace(race);
                    setShowModal(true);
                    loadRaceDetails(race);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {isNext && <div className="next-badge">⚡ NEXT RACE</div>}
                  {isRecent && <div className="past-badge">✓ LATEST RACE</div>}
                  {activeView === 'previous' && !isRecent && <div className="past-badge">✓ COMPLETED</div>}
                  
                  <div className="race-flag">{getCountryFlag(race.Circuit.Location.country)}</div>
                  <div className="race-info">
                    <div className="race-round">ROUND {race.round}</div>
                    <h3>{race.raceName}</h3>
                    <p className="race-circuit">{race.Circuit.circuitName}</p>
                    <div className="race-date">
                      <span className="date-icon">📅</span>
                      <span>{formatRaceDate(race.date, race.time)}</span>
                    </div>
                    <div className="race-stats">
                      <div className="stat-item-small">
                        <span className="label">Location</span>
                        <span className="value">{race.Circuit.Location.locality}</span>
                      </div>
                      <div className="stat-item-small">
                        <span className="label">Round</span>
                        <span className="value">{race.round}/{allRaces.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Race Details Modal */}
      {showModal && selectedRace && (
        <div className="race-modal active">
          <div className="modal-overlay" onClick={() => setShowModal(false)}></div>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            <div className="modal-header">
              <div className="modal-flag">{getCountryFlag(selectedRace.Circuit.Location.country)}</div>
              <h2 className="modal-title">{selectedRace.raceName}</h2>
              <p className="modal-subtitle">{selectedRace.Circuit.circuitName}</p>
              <div className="modal-date">
                {formatRaceDate(selectedRace.date, selectedRace.time)}
              </div>
            </div>
            <div className="modal-body">
              {loadingDetails ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                  <div className="loading-spinner" style={{ margin: '0 auto 1rem' }}></div>
                  <p style={{ color: 'var(--gray-400)' }}>Loading race data...</p>
                </div>
              ) : (
                <>
                  {/* Circuit Information */}
                  <div className="modal-section">
                    <h3 className="modal-section-title">📍 Circuit Information</h3>
                    <div className="modal-info-grid">
                      <div className="modal-info-item">
                        <div className="modal-info-label">Circuit</div>
                        <div className="modal-info-value">{selectedRace.Circuit.circuitName}</div>
                      </div>
                      <div className="modal-info-item">
                        <div className="modal-info-label">Location</div>
                        <div className="modal-info-value">
                          {selectedRace.Circuit.Location.locality}, {selectedRace.Circuit.Location.country}
                        </div>
                      </div>
                      <div className="modal-info-item">
                        <div className="modal-info-label">Round</div>
                        <div className="modal-info-value">{selectedRace.round} / 24</div>
                      </div>
                      <div className="modal-info-item">
                        <div className="modal-info-label">Date</div>
                        <div className="modal-info-value">
                          {new Date(selectedRace.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Podium Section */}
                  {raceResults && raceResults.length >= 3 && (
                    <div className="modal-section">
                      <h3 className="modal-section-title">🏆 Podium</h3>
                      <div className="podium-display">
                        {raceResults[1] && (
                          <div className="podium-item podium-second">
                            <div className="podium-medal">🥈</div>
                            <div className="podium-position">P2</div>
                            <div className="podium-driver">{raceResults[1].Driver.familyName}</div>
                            <div className="podium-team">{raceResults[1].Constructor.name}</div>
                            <div className="podium-stand second">2</div>
                          </div>
                        )}
                        {raceResults[0] && (
                          <div className="podium-item podium-first">
                            <div className="podium-medal">🥇</div>
                            <div className="podium-position">P1</div>
                            <div className="podium-driver">{raceResults[0].Driver.familyName}</div>
                            <div className="podium-team">{raceResults[0].Constructor.name}</div>
                            <div className="podium-stand first">1</div>
                          </div>
                        )}
                        {raceResults[2] && (
                          <div className="podium-item podium-third">
                            <div className="podium-medal">🥉</div>
                            <div className="podium-position">P3</div>
                            <div className="podium-driver">{raceResults[2].Driver.familyName}</div>
                            <div className="podium-team">{raceResults[2].Constructor.name}</div>
                            <div className="podium-stand third">3</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Full Results Section */}
                  {raceResults && raceResults.length > 0 && (
                    <div className="modal-section">
                      <h3 className="modal-section-title">📊 Full Results</h3>
                      <div className="modal-results-table">
                        <div className="modal-result-row header">
                          <div className="modal-position">POS</div>
                          <div className="modal-driver">DRIVER</div>
                          <div className="modal-points">TIME/STATUS</div>
                        </div>
                        {raceResults.slice(0, 10).map((result: any) => {
                          const positionClass = result.position <= 3 ? `podium-${result.position}` : '';
                          const positionNum = parseInt(result.position);
                          let medal = '';
                          if (positionNum === 1) medal = '🥇';
                          else if (positionNum === 2) medal = '🥈';
                          else if (positionNum === 3) medal = '🥉';
                          const hasFastestLap = result.FastestLap?.rank === '1';

                          return (
                            <div key={result.position} className={`modal-result-row ${positionClass}`}>
                              <div className="modal-position">
                                {medal && <span className="position-medal">{medal}</span>}
                                {result.position}
                              </div>
                              <div>
                                <div className="modal-driver">
                                  {result.Driver.givenName} {result.Driver.familyName}
                                </div>
                                <div className="modal-team">
                                  <span>{result.Constructor.name}</span>
                                  {result.points > 0 && <span className="team-badge">{result.points} PTS</span>}
                                </div>
                                {hasFastestLap && (
                                  <div className="fastest-lap">
                                    <span className="fastest-lap-icon">⚡</span>Fastest Lap
                                  </div>
                                )}
                              </div>
                              <div className="modal-points">{result.Time?.time || result.status}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Qualifying Results Section */}
                  {qualifyingResults && qualifyingResults.length > 0 && (
                    <div className="modal-section">
                      <h3 className="modal-section-title">⏱️ Qualifying Results</h3>
                      <div className="modal-results-table">
                        <div className="modal-result-row header">
                          <div className="modal-position">POS</div>
                          <div className="modal-driver">DRIVER</div>
                          <div className="modal-points">BEST TIME</div>
                        </div>
                        {qualifyingResults.slice(0, 10).map((result: any, index: number) => {
                          const positionClass = result.position <= 3 ? `podium-${result.position}` : '';
                          let medal = '';
                          if (index === 0) medal = '🥇';
                          else if (index === 1) medal = '🥈';
                          else if (index === 2) medal = '🥉';

                          return (
                            <div key={result.position} className={`modal-result-row ${positionClass}`}>
                              <div className="modal-position">
                                {medal && <span className="position-medal">{medal}</span>}
                                {result.position}
                              </div>
                              <div>
                                <div className="modal-driver">
                                  {result.Driver.givenName} {result.Driver.familyName}
                                </div>
                                <div className="modal-team">{result.Constructor.name}</div>
                              </div>
                              <div className="modal-points">{result.Q3 || result.Q2 || result.Q1 || '-'}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Calendar;

