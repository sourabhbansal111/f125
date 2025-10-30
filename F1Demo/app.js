/* ========================================
   F1 PITWALL - JavaScript Functionality
   Real-Time F1 Data Integration
   ======================================== */

// API Configuration
const F1_API_BASE = 'https://ergast.com/api/f1';
const CURRENT_SEASON = 2025; // Current season for upcoming races

// Global variable to store all races for toggle functionality
let allRacesData = [];

// Driver Database
const driversData = {
    verstappen: {
        name: "Max Verstappen",
        team: "Red Bull Racing",
        image: "assets/players1.png",
        wins: 60,
        podiums: 105,
        poles: 38,
        championships: 3,
        points: 575
    },
    hamilton: {
        name: "Lewis Hamilton",
        team: "Mercedes-AMG Petronas",
        image: "assets/player2.jpg",
        wins: 103,
        podiums: 201,
        poles: 104,
        championships: 7,
        points: 289
    },
    norris: {
        name: "Lando Norris",
        team: "McLaren Racing",
        image: "assets/player3.jpg",
        wins: 1,
        podiums: 15,
        poles: 2,
        championships: 0,
        points: 356
    },
    leclerc: {
        name: "Charles Leclerc",
        team: "Scuderia Ferrari",
        image: "assets/player4.jpg",
        wins: 5,
        podiums: 32,
        poles: 23,
        championships: 0,
        points: 251
    },
    piastri: {
        name: "Oscar Piastri",
        team: "McLaren Racing",
        image: "assets/player5.jpg",
        wins: 0,
        podiums: 2,
        poles: 0,
        championships: 0,
        points: 197
    }
};

// Map driver IDs to local data
const driverIdMap = {
    'max_verstappen': 'verstappen',
    'hamilton': 'hamilton',
    'norris': 'norris',
    'leclerc': 'leclerc',
    'piastri': 'piastri'
};

/* ======== FETCH LIVE F1 DATA ======== */
async function fetchDriverStandings() {
    try {
        console.log('🏎️ Fetching live driver standings...');
        const response = await fetch(`${F1_API_BASE}/current/driverStandings.json`);
        const data = await response.json();
        const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        
        console.log('✅ Live standings loaded!', standings);
        updateDriverStandings(standings);
        return standings;
    } catch (error) {
        console.error('❌ Error fetching driver standings:', error);
        return null;
    }
}

async function fetchConstructorStandings() {
    try {
        console.log('🏎️ Fetching live constructor standings...');
        const response = await fetch(`${F1_API_BASE}/current/constructorStandings.json`);
        const data = await response.json();
        const standings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        
        console.log('✅ Live constructor standings loaded!', standings);
        updateConstructorStandings(standings);
        return standings;
    } catch (error) {
        console.error('❌ Error fetching constructor standings:', error);
        return null;
    }
}

async function fetchRaceSchedule() {
    console.log('🏎️ Starting fetchRaceSchedule...');
    
    // Use fallback data immediately for guaranteed display
    console.log('📡 Loading F1 Calendar with fallback data...');
    const fallbackRaces = get2025Calendar();
    
    if (fallbackRaces && fallbackRaces.length > 0) {
        console.log(`✅ Loaded ${fallbackRaces.length} races from fallback calendar`);
        updateRaceCalendar(fallbackRaces);
        return fallbackRaces;
    }
    
    console.error('❌ Failed to load calendar!');
    showNoRacesMessage();
    return null;
}

// Convert F1 News API format to Ergast format
function convertF1NewsToRaces(newsRaces) {
    return newsRaces.map((race, index) => ({
        round: (index + 1).toString(),
        raceName: race.raceName || race.name || 'Grand Prix',
        date: race.date || race.raceDate || race.start_date,
        time: race.time || race.raceTime || '14:00:00Z',
        Circuit: {
            circuitName: race.circuit?.name || race.circuitName || 'Circuit',
            Location: {
                locality: race.circuit?.city || race.location || 'Unknown',
                country: race.circuit?.country || race.country || 'Unknown'
            }
        }
    }));
}

// Convert OpenF1 format to Ergast format
function convertOpenF1ToRaces(sessions) {
    const raceMap = new Map();
    
    sessions.forEach(session => {
        const key = session.location + session.date_start;
        if (!raceMap.has(key)) {
            raceMap.set(key, {
                round: session.session_key || '1',
                raceName: `${session.location} Grand Prix`,
                date: session.date_start.split('T')[0],
                time: session.date_start.split('T')[1],
                Circuit: {
                    circuitName: `${session.location} Circuit`,
                    Location: {
                        locality: session.location,
                        country: session.country_name || session.location
                    }
                }
            });
        }
    });
    
    return Array.from(raceMap.values()).sort((a, b) => new Date(a.date) - new Date(b.date));
}

// 2025 F1 Calendar (Official - Most Reliable)
function get2025Calendar() {
    return [
        {
            round: '1',
            raceName: 'Australian Grand Prix',
            date: '2025-03-16',
            time: '05:00:00Z',
            Circuit: {
                circuitName: 'Albert Park Circuit',
                Location: { locality: 'Melbourne', country: 'Australia' }
            }
        },
        {
            round: '2',
            raceName: 'Chinese Grand Prix',
            date: '2025-03-23',
            time: '07:00:00Z',
            Circuit: {
                circuitName: 'Shanghai International Circuit',
                Location: { locality: 'Shanghai', country: 'China' }
            }
        },
        {
            round: '3',
            raceName: 'Japanese Grand Prix',
            date: '2025-04-06',
            time: '05:00:00Z',
            Circuit: {
                circuitName: 'Suzuka Circuit',
                Location: { locality: 'Suzuka', country: 'Japan' }
            }
        },
        {
            round: '4',
            raceName: 'Bahrain Grand Prix',
            date: '2025-04-13',
            time: '15:00:00Z',
            Circuit: {
                circuitName: 'Bahrain International Circuit',
                Location: { locality: 'Sakhir', country: 'Bahrain' }
            }
        },
        {
            round: '5',
            raceName: 'Saudi Arabian Grand Prix',
            date: '2025-04-20',
            time: '17:00:00Z',
            Circuit: {
                circuitName: 'Jeddah Corniche Circuit',
                Location: { locality: 'Jeddah', country: 'Saudi Arabia' }
            }
        },
        {
            round: '6',
            raceName: 'Miami Grand Prix',
            date: '2025-05-04',
            time: '19:30:00Z',
            Circuit: {
                circuitName: 'Miami International Autodrome',
                Location: { locality: 'Miami', country: 'USA' }
            }
        },
        {
            round: '7',
            raceName: 'Emilia Romagna Grand Prix',
            date: '2025-05-18',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Autodromo Enzo e Dino Ferrari',
                Location: { locality: 'Imola', country: 'Italy' }
            }
        },
        {
            round: '8',
            raceName: 'Monaco Grand Prix',
            date: '2025-05-25',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Circuit de Monaco',
                Location: { locality: 'Monte Carlo', country: 'Monaco' }
            }
        },
        {
            round: '9',
            raceName: 'Spanish Grand Prix',
            date: '2025-06-01',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Circuit de Barcelona-Catalunya',
                Location: { locality: 'Barcelona', country: 'Spain' }
            }
        },
        {
            round: '10',
            raceName: 'Canadian Grand Prix',
            date: '2025-06-15',
            time: '18:00:00Z',
            Circuit: {
                circuitName: 'Circuit Gilles Villeneuve',
                Location: { locality: 'Montreal', country: 'Canada' }
            }
        },
        {
            round: '11',
            raceName: 'Austrian Grand Prix',
            date: '2025-06-29',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Red Bull Ring',
                Location: { locality: 'Spielberg', country: 'Austria' }
            }
        },
        {
            round: '12',
            raceName: 'British Grand Prix',
            date: '2025-07-06',
            time: '14:00:00Z',
            Circuit: {
                circuitName: 'Silverstone Circuit',
                Location: { locality: 'Silverstone', country: 'UK' }
            }
        },
        {
            round: '13',
            raceName: 'Belgian Grand Prix',
            date: '2025-07-27',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Circuit de Spa-Francorchamps',
                Location: { locality: 'Spa', country: 'Belgium' }
            }
        },
        {
            round: '14',
            raceName: 'Hungarian Grand Prix',
            date: '2025-08-03',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Hungaroring',
                Location: { locality: 'Budapest', country: 'Hungary' }
            }
        },
        {
            round: '15',
            raceName: 'Dutch Grand Prix',
            date: '2025-08-31',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Circuit Zandvoort',
                Location: { locality: 'Zandvoort', country: 'Netherlands' }
            }
        },
        {
            round: '16',
            raceName: 'Italian Grand Prix',
            date: '2025-09-07',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Autodromo Nazionale di Monza',
                Location: { locality: 'Monza', country: 'Italy' }
            }
        },
        {
            round: '17',
            raceName: 'Azerbaijan Grand Prix',
            date: '2025-09-21',
            time: '11:00:00Z',
            Circuit: {
                circuitName: 'Baku City Circuit',
                Location: { locality: 'Baku', country: 'Azerbaijan' }
            }
        },
        {
            round: '18',
            raceName: 'Singapore Grand Prix',
            date: '2025-10-05',
            time: '12:00:00Z',
            Circuit: {
                circuitName: 'Marina Bay Street Circuit',
                Location: { locality: 'Singapore', country: 'Singapore' }
            }
        },
        {
            round: '19',
            raceName: 'United States Grand Prix',
            date: '2025-10-19',
            time: '19:00:00Z',
            Circuit: {
                circuitName: 'Circuit of the Americas',
                Location: { locality: 'Austin', country: 'USA' }
            }
        },
        {
            round: '20',
            raceName: 'Mexico City Grand Prix',
            date: '2025-10-26',
            time: '20:00:00Z',
            Circuit: {
                circuitName: 'Autódromo Hermanos Rodríguez',
                Location: { locality: 'Mexico City', country: 'Mexico' }
            }
        },
        {
            round: '21',
            raceName: 'São Paulo Grand Prix',
            date: '2025-11-09',
            time: '17:00:00Z',
            Circuit: {
                circuitName: 'Autódromo José Carlos Pace',
                Location: { locality: 'São Paulo', country: 'Brazil' }
            }
        },
        {
            round: '22',
            raceName: 'Las Vegas Grand Prix',
            date: '2025-11-22',
            time: '06:00:00Z',
            Circuit: {
                circuitName: 'Las Vegas Street Circuit',
                Location: { locality: 'Las Vegas', country: 'USA' }
            }
        },
        {
            round: '23',
            raceName: 'Qatar Grand Prix',
            date: '2025-11-30',
            time: '16:00:00Z',
            Circuit: {
                circuitName: 'Losail International Circuit',
                Location: { locality: 'Lusail', country: 'Qatar' }
            }
        },
        {
            round: '24',
            raceName: 'Abu Dhabi Grand Prix',
            date: '2025-12-07',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Yas Marina Circuit',
                Location: { locality: 'Abu Dhabi', country: 'UAE' }
            }
        }
    ];
}

function showNoRacesMessage() {
    const racesGrid = document.getElementById('races-grid');
    if (racesGrid) {
        racesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--gray-400);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                <h3 style="color: var(--white); margin-bottom: 0.5rem;">Unable to Load Race Data</h3>
                <p>Please check your internet connection or try again later.</p>
            </div>
        `;
    }
}

// Fetch Previous Races (Completed races only)
async function fetchPreviousRaces() {
    try {
        console.log('🏁 Fetching previous races from multiple F1 APIs...');
        
        // API 1: Try Jolpi F1 API (Most reliable)
        try {
            console.log('📡 Trying Jolpi F1 API...');
            const response = await fetch('https://api.jolpi.ca/ergast/f1/current.json');
            if (response.ok) {
                const data = await response.json();
                const races = data.MRData.RaceTable.Races;
                if (races && races.length > 0) {
                    console.log(`✅ Jolpi API Success! ${races.length} races loaded`);
                    updatePreviousRaces(races);
                    return races;
                }
            }
        } catch (err) {
            console.warn('❌ Jolpi API failed:', err.message);
        }
        
        // API 2: CORS Proxy + Ergast
        try {
            console.log('📡 Trying CORS Proxy + Ergast...');
            const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://ergast.com/api/f1/current.json'));
            if (response.ok) {
                const proxy = await response.json();
                const data = JSON.parse(proxy.contents);
                const races = data.MRData.RaceTable.Races;
                if (races && races.length > 0) {
                    console.log(`✅ CORS Proxy Success! ${races.length} races loaded`);
                    updatePreviousRaces(races);
                    return races;
                }
            }
        } catch (err) {
            console.warn('❌ CORS Proxy failed:', err.message);
        }
        
        // API 3: Use hardcoded 2024 past races
        console.log('📡 Loading 2024 past races...');
        const races2024 = get2024PastRaces();
        updatePreviousRaces(races2024);
        return races2024;
        
    } catch (error) {
        console.error('❌ All APIs failed:', error);
        showNoPreviousRacesMessage();
        return null;
    }
}

// 2024 Past Races
function get2024PastRaces() {
    return [
        {
            round: '1',
            raceName: 'Bahrain Grand Prix',
            date: '2024-03-02',
            time: '15:00:00Z',
            Circuit: {
                circuitName: 'Bahrain International Circuit',
                Location: { locality: 'Sakhir', country: 'Bahrain' }
            }
        },
        {
            round: '2',
            raceName: 'Saudi Arabian Grand Prix',
            date: '2024-03-09',
            time: '17:00:00Z',
            Circuit: {
                circuitName: 'Jeddah Corniche Circuit',
                Location: { locality: 'Jeddah', country: 'Saudi Arabia' }
            }
        },
        {
            round: '3',
            raceName: 'Australian Grand Prix',
            date: '2024-03-24',
            time: '05:00:00Z',
            Circuit: {
                circuitName: 'Albert Park Circuit',
                Location: { locality: 'Melbourne', country: 'Australia' }
            }
        },
        {
            round: '4',
            raceName: 'Japanese Grand Prix',
            date: '2024-04-07',
            time: '05:00:00Z',
            Circuit: {
                circuitName: 'Suzuka Circuit',
                Location: { locality: 'Suzuka', country: 'Japan' }
            }
        },
        {
            round: '5',
            raceName: 'Chinese Grand Prix',
            date: '2024-04-21',
            time: '07:00:00Z',
            Circuit: {
                circuitName: 'Shanghai International Circuit',
                Location: { locality: 'Shanghai', country: 'China' }
            }
        },
        {
            round: '6',
            raceName: 'Miami Grand Prix',
            date: '2024-05-05',
            time: '19:30:00Z',
            Circuit: {
                circuitName: 'Miami International Autodrome',
                Location: { locality: 'Miami', country: 'USA' }
            }
        },
        {
            round: '7',
            raceName: 'Emilia Romagna Grand Prix',
            date: '2024-05-19',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Autodromo Enzo e Dino Ferrari',
                Location: { locality: 'Imola', country: 'Italy' }
            }
        },
        {
            round: '8',
            raceName: 'Monaco Grand Prix',
            date: '2024-05-26',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Circuit de Monaco',
                Location: { locality: 'Monte Carlo', country: 'Monaco' }
            }
        },
        {
            round: '9',
            raceName: 'Canadian Grand Prix',
            date: '2024-06-09',
            time: '18:00:00Z',
            Circuit: {
                circuitName: 'Circuit Gilles Villeneuve',
                Location: { locality: 'Montreal', country: 'Canada' }
            }
        },
        {
            round: '10',
            raceName: 'Spanish Grand Prix',
            date: '2024-06-23',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Circuit de Barcelona-Catalunya',
                Location: { locality: 'Barcelona', country: 'Spain' }
            }
        },
        {
            round: '11',
            raceName: 'Austrian Grand Prix',
            date: '2024-06-30',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Red Bull Ring',
                Location: { locality: 'Spielberg', country: 'Austria' }
            }
        },
        {
            round: '12',
            raceName: 'British Grand Prix',
            date: '2024-07-07',
            time: '14:00:00Z',
            Circuit: {
                circuitName: 'Silverstone Circuit',
                Location: { locality: 'Silverstone', country: 'UK' }
            }
        },
        {
            round: '13',
            raceName: 'Hungarian Grand Prix',
            date: '2024-07-21',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Hungaroring',
                Location: { locality: 'Budapest', country: 'Hungary' }
            }
        },
        {
            round: '14',
            raceName: 'Belgian Grand Prix',
            date: '2024-07-28',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Circuit de Spa-Francorchamps',
                Location: { locality: 'Spa', country: 'Belgium' }
            }
        },
        {
            round: '15',
            raceName: 'Dutch Grand Prix',
            date: '2024-08-25',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Circuit Zandvoort',
                Location: { locality: 'Zandvoort', country: 'Netherlands' }
            }
        },
        {
            round: '16',
            raceName: 'Italian Grand Prix',
            date: '2024-09-01',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Autodromo Nazionale di Monza',
                Location: { locality: 'Monza', country: 'Italy' }
            }
        },
        {
            round: '17',
            raceName: 'Azerbaijan Grand Prix',
            date: '2024-09-15',
            time: '11:00:00Z',
            Circuit: {
                circuitName: 'Baku City Circuit',
                Location: { locality: 'Baku', country: 'Azerbaijan' }
            }
        },
        {
            round: '18',
            raceName: 'Singapore Grand Prix',
            date: '2024-09-22',
            time: '12:00:00Z',
            Circuit: {
                circuitName: 'Marina Bay Street Circuit',
                Location: { locality: 'Singapore', country: 'Singapore' }
            }
        },
        {
            round: '19',
            raceName: 'United States Grand Prix',
            date: '2024-10-20',
            time: '19:00:00Z',
            Circuit: {
                circuitName: 'Circuit of the Americas',
                Location: { locality: 'Austin', country: 'USA' }
            }
        },
        {
            round: '20',
            raceName: 'Mexico City Grand Prix',
            date: '2024-10-27',
            time: '20:00:00Z',
            Circuit: {
                circuitName: 'Autódromo Hermanos Rodríguez',
                Location: { locality: 'Mexico City', country: 'Mexico' }
            }
        },
        {
            round: '21',
            raceName: 'São Paulo Grand Prix',
            date: '2024-11-03',
            time: '17:00:00Z',
            Circuit: {
                circuitName: 'Autódromo José Carlos Pace',
                Location: { locality: 'São Paulo', country: 'Brazil' }
            }
        },
        {
            round: '22',
            raceName: 'Las Vegas Grand Prix',
            date: '2024-11-23',
            time: '06:00:00Z',
            Circuit: {
                circuitName: 'Las Vegas Street Circuit',
                Location: { locality: 'Las Vegas', country: 'USA' }
            }
        },
        {
            round: '23',
            raceName: 'Qatar Grand Prix',
            date: '2024-12-01',
            time: '16:00:00Z',
            Circuit: {
                circuitName: 'Losail International Circuit',
                Location: { locality: 'Lusail', country: 'Qatar' }
            }
        },
        {
            round: '24',
            raceName: 'Abu Dhabi Grand Prix',
            date: '2024-12-08',
            time: '13:00:00Z',
            Circuit: {
                circuitName: 'Yas Marina Circuit',
                Location: { locality: 'Abu Dhabi', country: 'UAE' }
            }
        }
    ];
}

function updatePreviousRaces(races) {
    const racesGrid = document.getElementById('previous-races-grid');
    if (!racesGrid) return;
    
    // Get current date
    const now = new Date();
    
    // Filter to show ONLY PAST races
    const pastRaces = races.filter(race => {
        const raceDate = new Date(race.date);
        return raceDate < now; // Only past races
    });
    
    console.log(`📜 Filtered to ${pastRaces.length} past races from ${races.length} total`);
    
    // Clear existing races
    racesGrid.innerHTML = '';
    
    // Check if there are any past races
    if (pastRaces.length === 0) {
        racesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--gray-400);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🏁</div>
                <h3 style="color: var(--white); margin-bottom: 0.5rem;">No Previous Races</h3>
                <p>The season hasn't started yet!</p>
            </div>
        `;
        return;
    }
    
    // Sort past races in reverse order (most recent first)
    pastRaces.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Add ONLY PAST races
    pastRaces.forEach((race, index) => {
        const isMostRecent = index === 0; // First past race is the most recent
        
        const raceCard = document.createElement('div');
        raceCard.className = `race-card race-past ${isMostRecent ? 'race-recent' : ''}`;
        
        raceCard.innerHTML = `
            ${isMostRecent ? '<div class="past-badge">✓ LATEST RACE</div>' : '<div class="past-badge">✓ COMPLETED</div>'}
            <div class="race-flag">${getCountryFlag(race.Circuit.Location.country)}</div>
            <div class="race-info">
                <div class="race-round">ROUND ${race.round}</div>
                <h3>${race.raceName}</h3>
                <p class="race-circuit">${race.Circuit.circuitName}</p>
                <div class="race-date">
                    <span class="date-icon">📅</span>
                    <span>${formatRaceDate(race.date, race.time)}</span>
                </div>
                <div class="race-stats">
                    <div class="stat-item-small">
                        <span class="label">Location</span>
                        <span class="value">${race.Circuit.Location.locality}</span>
                    </div>
                    <div class="stat-item-small">
                        <span class="label">Round</span>
                        <span class="value">${race.round}/${races.length}</span>
                    </div>
                </div>
            </div>
        `;
        
        racesGrid.appendChild(raceCard);
    });
    
    // Update section title
    const sectionTitle = document.querySelector('.calendar-section .section-title');
    if (sectionTitle) {
        sectionTitle.innerHTML = `Previous Races 2024/2025 <span class="live-badge">🔴 LIVE</span>`;
    }
    
    console.log(`✅ Previous races updated with ${pastRaces.length} completed races!`);
}

function showNoPreviousRacesMessage() {
    const racesGrid = document.getElementById('previous-races-grid');
    if (racesGrid) {
        racesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--gray-400);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                <h3 style="color: var(--white); margin-bottom: 0.5rem;">Unable to Load Previous Races</h3>
                <p>Please check your internet connection or try again later.</p>
            </div>
        `;
    }
}

// Setup Calendar Toggle between Upcoming and Previous Races
function setupCalendarToggle() {
    const btnUpcoming = document.getElementById('btn-upcoming');
    const btnPrevious = document.getElementById('btn-previous');
    const racesGrid = document.getElementById('races-grid');
    const yearSelector = document.getElementById('year-selector');
    
    if (!btnUpcoming || !btnPrevious || !racesGrid) return;
    
    // Current view state
    let currentView = 'upcoming';
    
    // Toggle to Upcoming Races
    btnUpcoming.addEventListener('click', function() {
        if (currentView === 'upcoming') return;
        
        currentView = 'upcoming';
        btnUpcoming.classList.add('active');
        btnPrevious.classList.remove('active');
        
        // Hide year selector
        if (yearSelector) {
            yearSelector.style.display = 'none';
        }
        
        console.log('🔮 Switching to Upcoming Races view');
        renderRacesByView('upcoming');
    });
    
    // Toggle to Previous Races
    btnPrevious.addEventListener('click', function() {
        if (currentView === 'previous') return;
        
        currentView = 'previous';
        btnPrevious.classList.add('active');
        btnUpcoming.classList.remove('active');
        
        // Show year selector
        if (yearSelector) {
            yearSelector.style.display = 'block';
        }
        
        console.log('📜 Switching to Previous Races view');
        renderRacesByView('previous');
    });
    
    // Setup year selector
    setupYearSelector();
    
    // Setup modal close handlers
    setupRaceModal();
}

// Render races based on selected view
function renderRacesByView(view, yearData = null) {
    const racesGrid = document.getElementById('races-grid');
    if (!racesGrid) return;
    
    const now = new Date();
    let filteredRaces;
    
    if (view === 'upcoming') {
        // Future races from allRacesData
        if (!allRacesData || allRacesData.length === 0) return;
        filteredRaces = allRacesData.filter(race => new Date(race.date) >= now);
        console.log(`🔮 Showing ${filteredRaces.length} upcoming races`);
    } else {
        // Past races - use yearData if provided, otherwise use allRacesData
        const racesSource = yearData || allRacesData;
        if (!racesSource || racesSource.length === 0) return;
        
        filteredRaces = racesSource.filter(race => new Date(race.date) < now);
        // Sort past races in reverse order (most recent first)
        filteredRaces.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log(`📜 Showing ${filteredRaces.length} previous races`);
    }
    
    // Clear grid
    racesGrid.innerHTML = '';
    
    // Check if empty
    if (filteredRaces.length === 0) {
        racesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--gray-400);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">${view === 'upcoming' ? '🏁' : '📜'}</div>
                <h3 style="color: var(--white); margin-bottom: 0.5rem;">No ${view === 'upcoming' ? 'Upcoming' : 'Previous'} Races</h3>
                <p>${view === 'upcoming' ? 'The season calendar will be announced soon!' : 'The season hasn\'t started yet!'}</p>
            </div>
        `;
        return;
    }
    
    // Render race cards
    filteredRaces.forEach((race, index) => {
        const isNext = (view === 'upcoming' && index === 0);
        const isRecent = (view === 'previous' && index === 0);
        const isPast = (view === 'previous');
        
        const raceCard = document.createElement('div');
        raceCard.className = `race-card ${isNext ? 'race-next' : ''} ${isPast ? 'race-past' : ''} ${isRecent ? 'race-recent' : ''}`;
        
        raceCard.innerHTML = `
            ${isNext ? '<div class="next-badge">⚡ NEXT RACE</div>' : ''}
            ${isRecent ? '<div class="past-badge">✓ LATEST RACE</div>' : ''}
            ${isPast && !isRecent ? '<div class="past-badge">✓ COMPLETED</div>' : ''}
            <div class="race-flag">${getCountryFlag(race.Circuit.Location.country)}</div>
            <div class="race-info">
                <div class="race-round">ROUND ${race.round}</div>
                <h3>${race.raceName}</h3>
                <p class="race-circuit">${race.Circuit.circuitName}</p>
                <div class="race-date">
                    <span class="date-icon">📅</span>
                    <span>${formatRaceDate(race.date, race.time)}</span>
                </div>
                <div class="race-stats">
                    <div class="stat-item-small">
                        <span class="label">Location</span>
                        <span class="value">${race.Circuit.Location.locality}</span>
                    </div>
                    <div class="stat-item-small">
                        <span class="label">Round</span>
                        <span class="value">${race.round}/${allRacesData.length}</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add click handler to show race details
        raceCard.style.cursor = 'pointer';
        raceCard.addEventListener('click', () => {
            openRaceModal(race);
        });
        
        racesGrid.appendChild(raceCard);
    });
    
    console.log(`✅ Rendered ${filteredRaces.length} ${view} races`);
}

async function fetchDriverStats(driverId) {
    try {
        console.log(`🏎️ Fetching stats for ${driverId}...`);
        
        // Fetch career wins
        const winsResponse = await fetch(`${F1_API_BASE}/drivers/${driverId}/results/1.json?limit=200`);
        const winsData = await winsResponse.json();
        const wins = winsData.MRData.total;
        
        // Fetch career stats
        const statsResponse = await fetch(`${F1_API_BASE}/drivers/${driverId}.json`);
        const statsData = await statsResponse.json();
        
        console.log(`✅ Stats loaded for ${driverId}`);
        return {
            wins: parseInt(wins),
            driverId: driverId
        };
    } catch (error) {
        console.error(`❌ Error fetching stats for ${driverId}:`, error);
        return null;
    }
}

/* ======== UPDATE UI WITH LIVE DATA ======== */
function updateDriverStandings(standings) {
    const standingsTable = document.querySelector('.standings-card:first-child .standings-table');
    if (!standingsTable) return;
    
    // Clear existing data (except header)
    const rows = standingsTable.querySelectorAll('.standing-row:not(.header)');
    rows.forEach(row => row.remove());
    
    // Add live data
    standings.slice(0, 5).forEach((standing, index) => {
        const row = document.createElement('div');
        row.className = 'standing-row';
        
        // Add medal classes
        if (index === 0) row.classList.add('gold');
        else if (index === 1) row.classList.add('silver');
        else if (index === 2) row.classList.add('bronze');
        
        row.innerHTML = `
            <span class="pos">${standing.position}</span>
            <span class="driver-name">${standing.Driver.givenName} ${standing.Driver.familyName}</span>
            <span class="points">${standing.points}</span>
        `;
        
        standingsTable.appendChild(row);
    });
    
    // Add live indicator
    const header = document.querySelector('.standings-card:first-child h3');
    if (header && !header.querySelector('.live-badge')) {
        const liveBadge = document.createElement('span');
        liveBadge.className = 'live-badge';
        liveBadge.textContent = '🔴 LIVE';
        header.appendChild(liveBadge);
    }
}

function updateConstructorStandings(standings) {
    const standingsTable = document.querySelector('.standings-card:last-child .standings-table');
    if (!standingsTable) return;
    
    // Clear existing data (except header)
    const rows = standingsTable.querySelectorAll('.standing-row:not(.header)');
    rows.forEach(row => row.remove());
    
    // Add live data
    standings.slice(0, 5).forEach((standing, index) => {
        const row = document.createElement('div');
        row.className = 'standing-row';
        
        // Add medal classes
        if (index === 0) row.classList.add('gold');
        else if (index === 1) row.classList.add('silver');
        else if (index === 2) row.classList.add('bronze');
        
        row.innerHTML = `
            <span class="pos">${standing.position}</span>
            <span class="driver-name">${standing.Constructor.name}</span>
            <span class="points">${standing.points}</span>
        `;
        
        standingsTable.appendChild(row);
    });
    
    // Add live indicator
    const header = document.querySelector('.standings-card:last-child h3');
    if (header && !header.querySelector('.live-badge')) {
        const liveBadge = document.createElement('span');
        liveBadge.className = 'live-badge';
        liveBadge.textContent = '🔴 LIVE';
        header.appendChild(liveBadge);
    }
}

function updateRaceCalendar(races) {
    console.log('📊 updateRaceCalendar START - received', races ? races.length : 0, 'races');
    
    const racesGrid = document.getElementById('races-grid');
    if (!racesGrid) {
        console.error('❌ races-grid element not found!');
        return;
    }
    
    if (!races || races.length === 0) {
        console.error('❌ No races data provided!');
        racesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--primary-red);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">❌</div>
                <h3>No Race Data Available</h3>
            </div>
        `;
        return;
    }
    
    // Store all races globally for toggle functionality
    allRacesData = races;
    console.log('✅ Stored', allRacesData.length, 'races in allRacesData');
    
    // Update last refresh timestamp
    updateLastRefreshTime();
    
    // Render upcoming races by default (the toggle will handle switching views)
    console.log('📞 Calling renderRacesByView("upcoming")');
    renderRacesByView('upcoming');
    
    console.log(`✅ Calendar updated with ${races.length} total races!`);
}

/* ======== HELPER FUNCTIONS ======== */
function getCountryFlag(country) {
    const flags = {
        'Bahrain': '🇧🇭',
        'Saudi Arabia': '🇸🇦',
        'Australia': '🇦🇺',
        'Japan': '🇯🇵',
        'China': '🇨🇳',
        'USA': '🇺🇸',
        'Italy': '🇮🇹',
        'Monaco': '🇲🇨',
        'Spain': '🇪🇸',
        'Canada': '🇨🇦',
        'Austria': '🇦🇹',
        'UK': '🇬🇧',
        'Hungary': '🇭🇺',
        'Belgium': '🇧🇪',
        'Netherlands': '🇳🇱',
        'Singapore': '🇸🇬',
        'Mexico': '🇲🇽',
        'Brazil': '🇧🇷',
        'UAE': '🇦🇪',
        'Qatar': '🇶🇦',
        'United States': '🇺🇸',
        'United Kingdom': '🇬🇧',
        'Azerbaijan': '🇦🇿'
    };
    return flags[country] || '🏁';
}

function formatRaceDate(dateStr, timeStr) {
    const date = new Date(dateStr);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}


/* ======== POPULATE RACE SELECTOR ======== */
async function populateRaceSelector() {
    try {
        console.log('📋 Fetching 2024 race schedule...');
        const response = await fetch('https://api.jolpi.ca/ergast/f1/2024');
        
        if (response.ok) {
            const data = await response.json();
            const races = data.MRData.RaceTable.Races;
            
            const selector = document.getElementById('race-selector');
            if (selector) {
                // Clear existing options except first
                selector.innerHTML = '<option value="last">Latest Race</option>';
                
                // Add all races
                races.reverse().forEach((race, index) => {
                    const option = document.createElement('option');
                    option.value = race.round;
                    option.textContent = `Round ${race.round}: ${race.raceName}`;
                    selector.appendChild(option);
                });
                
                console.log(`✅ Loaded ${races.length} races into selector`);
            }
        }
    } catch (error) {
        console.error('❌ Failed to load race selector:', error.message);
    }
}

/* ======== POPULATE RACE SELECTOR ======== */
async function populateRaceSelector() {
    try {
        console.log('📋 Fetching 2024 race schedule for selector...');
        const response = await fetch('https://api.jolpi.ca/ergast/f1/2024');
        
        if (response.ok) {
            const data = await response.json();
            const races = data.MRData.RaceTable.Races;
            
            const selector = document.getElementById('race-selector');
            if (selector) {
                // Clear existing options except first
                selector.innerHTML = '<option value="last">Latest Race</option>';
                
                // Add all races in reverse order (most recent first)
                races.reverse().forEach((race, index) => {
                    const option = document.createElement('option');
                    option.value = race.round;
                    option.textContent = `Round ${race.round}: ${race.raceName}`;
                    selector.appendChild(option);
                });
                
                console.log(`✅ Loaded ${races.length} races into selector`);
            }
        }
    } catch (error) {
        console.error('❌ Failed to load race selector:', error.message);
    }
}

/* ======== FETCH SPECIFIC RACE RESULTS ======== */
async function fetchRaceResults(round = 'last') {
    const resultsTable = document.getElementById('results-table');
    const podiumContainer = document.getElementById('results-podium');
    
    if (resultsTable) resultsTable.innerHTML = '<div style="text-align: center; padding: 3rem; color: var(--gray-400);">🔄 Loading race results...</div>';
    if (podiumContainer) podiumContainer.innerHTML = '<div style="text-align: center; padding: 3rem; color: var(--gray-400);">🔄 Loading...</div>';
    
    try {
        console.log(`🏎️ Fetching race results for round ${round}...`);
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/2024/${round}/results`);
        
        if (response.ok) {
            const data = await response.json();
            if (data.MRData?.RaceTable?.Races && data.MRData.RaceTable.Races.length > 0) {
                console.log('✅ Race results loaded!', data);
                const results = data.MRData.RaceTable.Races[0];
                updateRaceResults(results);
                
                // Also update fastest laps and pit stops for this race
                fetchFastestLapsForRace(round);
                fetchPitStopsForRace(round);
                
                return results;
            }
        }
    } catch (error) {
        console.error('❌ Failed to load race results:', error.message);
    }
    
    if (resultsTable) {
        resultsTable.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--primary-red);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">❌</div>
                <div>Unable to Load Race Results</div>
            </div>
        `;
    }
    return null;
}

/* ======== FETCH ALL RACE RESULTS ======== */
async function fetchAllRaceResults() {
    const grid = document.getElementById('races-results-grid');
    if (!grid) return;
    
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--gray-400);"><div style="font-size: 3rem; margin-bottom: 1rem;">🏎️</div><h3 style="color: var(--white);">Loading All Races...</h3></div>';
    
    try {
        console.log('🏁 Fetching all 2024 race results...');
        const response = await fetch('https://api.jolpi.ca/ergast/f1/2024/results');
        
        if (response.ok) {
            const data = await response.json();
            const races = data.MRData.RaceTable.Races;
            
            if (races && races.length > 0) {
                console.log(`✅ Loaded ${races.length} races`);
                displayAllRaceResults(races.reverse()); // Most recent first
                return races;
            }
        }
    } catch (error) {
        console.error('❌ Failed to load races:', error);
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--primary-red);"><div style="font-size: 3rem;">❌</div><h3>Failed to Load Results</h3></div>`;
    }
}

function displayAllRaceResults(races) {
    const grid = document.getElementById('races-results-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    races.forEach((race, index) => {
        const raceCard = document.createElement('div');
        raceCard.className = 'race-result-card';
        
        const winner = race.Results[0];
        const podium = race.Results.slice(0, 3);
        
        raceCard.innerHTML = `
            <div class="race-result-header">
                <div class="race-result-flag">${getCountryFlag(race.Circuit.Location.country)}</div>
                <div class="race-result-info">
                    <div class="race-result-round">ROUND ${race.round}</div>
                    <h3 class="race-result-title">${race.raceName}</h3>
                    <p class="race-result-circuit">${race.Circuit.circuitName}</p>
                    <div class="race-result-date">${formatRaceDate(race.date, race.time)}</div>
                </div>
                <div class="race-result-winner">
                    <div class="winner-label">WINNER</div>
                    <div class="winner-name">🏆 ${winner.Driver.familyName}</div>
                    <div class="winner-team">${winner.Constructor.name}</div>
                </div>
            </div>
            <div class="race-result-podium">
                ${podium.map((driver, i) => `
                    <div class="podium-mini podium-${i+1}">
                        <div class="podium-mini-pos">${i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
                        <div class="podium-mini-driver">${driver.Driver.familyName}</div>
                        <div class="podium-mini-time">${driver.Time ? driver.Time.time : driver.status}</div>
                    </div>
                `).join('')}
            </div>
            <button class="view-full-results-btn" data-round="${race.round}">
                View Full Results →
            </button>
        `;
        
        grid.appendChild(raceCard);
        
        // Add click handler to view full results button
        const viewBtn = raceCard.querySelector('.view-full-results-btn');
        viewBtn.addEventListener('click', () => {
            showFullRaceResults(race);
        });
    });
}

function showFullRaceResults(race) {
    alert(`Full results for ${race.raceName} - Coming soon! You can see top 3: ${race.Results.slice(0,3).map(r => r.Driver.familyName).join(', ')}`);
    // You can expand this to show a modal with complete results
}

/* ======== FETCH LATEST RACE RESULTS ======== */
async function fetchLatestRaceResults() {
    return fetchRaceResults('last');
}

function updateRaceResults(raceData) {
    if (!raceData) return;
    
    const results = raceData.Results;
    const raceName = raceData.raceName;
    const circuitName = raceData.Circuit.circuitName;
    
    // Update race title
    const raceTitle = document.getElementById('race-title');
    const raceSubtitle = document.getElementById('race-subtitle');
    if (raceTitle) raceTitle.textContent = raceName;
    if (raceSubtitle) raceSubtitle.textContent = circuitName;
    
    // Create stunning 3D podium
    const podiumContainer = document.getElementById('results-podium');
    if (podiumContainer && results.length >= 3) {
        podiumContainer.innerHTML = `
            <div class="podium-display">
                <div class="podium-item podium-second">
                    <div class="podium-medal">🥈</div>
                    <div class="podium-position">P2</div>
                    <div class="podium-driver">${results[1].Driver.familyName}</div>
                    <div class="podium-team">${results[1].Constructor.name}</div>
                    <div class="podium-time">+${results[1].Time ? results[1].Time.time : '--'}</div>
                    <div class="podium-stand second">2</div>
                </div>
                <div class="podium-item podium-first">
                    <div class="podium-medal">🥇</div>
                    <div class="podium-position">P1</div>
                    <div class="podium-driver">${results[0].Driver.familyName}</div>
                    <div class="podium-team">${results[0].Constructor.name}</div>
                    <div class="podium-time">${results[0].Time ? results[0].Time.time : 'WINNER'}</div>
                    <div class="podium-stand first">1</div>
                </div>
                <div class="podium-item podium-third">
                    <div class="podium-medal">🥉</div>
                    <div class="podium-position">P3</div>
                    <div class="podium-driver">${results[2].Driver.familyName}</div>
                    <div class="podium-team">${results[2].Constructor.name}</div>
                    <div class="podium-time">+${results[2].Time ? results[2].Time.time : '--'}</div>
                    <div class="podium-stand third">3</div>
                </div>
            </div>
        `;
    }
    
    // Create enhanced results table
    const resultsTable = document.getElementById('results-table');
    if (!resultsTable) return;
    
    resultsTable.innerHTML = '';
    
    // Add header
    resultsTable.innerHTML = `
        <div class="result-row header">
            <div class="result-pos">POS</div>
            <div class="result-driver">DRIVER</div>
            <div class="result-team">TEAM</div>
            <div class="result-time">TIME/STATUS</div>
            <div class="result-points">PTS</div>
        </div>
    `;
    
    // Add only top 10 results with enhanced styling
    const top10Results = results.slice(0, 10);
    
    top10Results.forEach((result, index) => {
        const row = document.createElement('div');
        row.className = 'result-row';
        
        // Add podium class for top 3
        if (index < 3) {
            row.classList.add(`podium-${index + 1}`);
        }
        
        // Check for fastest lap
        const hasFastestLap = result.FastestLap?.rank === '1';
        
        let medal = '';
        if (index === 0) medal = '🥇';
        else if (index === 1) medal = '🥈';
        else if (index === 2) medal = '🥉';
        
        // Get driver image URL from official F1 media or use fallback
        const driverId = result.Driver.driverId;
        const driverImageUrl = `https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${new Date().getFullYear()}Drivers/${driverId}.png.transform/1col/image.png`;
        
        row.innerHTML = `
            <div class="result-pos">
                <div class="pos-content">
                    ${medal ? `<span class="position-medal">${medal}</span>` : ''}
                    <span class="position-number">P${result.position}</span>
                </div>
            </div>
            <div class="result-driver">
                <div class="driver-info-container">
                    <img src="${driverImageUrl}" 
                         alt="${result.Driver.familyName}" 
                         class="driver-avatar"
                         onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${result.Driver.givenName}+${result.Driver.familyName}&size=80&background=e10600&color=fff&bold=true&font-size=0.4';" />
                    <div class="driver-text">
                        <span class="driver-name">${result.Driver.givenName} ${result.Driver.familyName}</span>
                        ${hasFastestLap ? '<span class="fastest-lap-badge">⚡ FASTEST LAP</span>' : ''}
                    </div>
                </div>
            </div>
            <div class="result-team">${result.Constructor.name}</div>
            <div class="result-time">${result.Time ? result.Time.time : result.status}</div>
            <div class="result-points">
                <span class="points-value">${result.points}</span>
            </div>
        `;
        
        resultsTable.appendChild(row);
    });
}

/* ======== FETCH QUALIFYING RESULTS ======== */
async function fetchQualifyingResults() {
    try {
        console.log('🏎️ Fetching qualifying results...');
        const response = await fetch(`${F1_API_BASE}/current/last/qualifying.json`);
        const data = await response.json();
        const qualifying = data.MRData.RaceTable.Races[0];
        
        console.log('✅ Qualifying results loaded!', qualifying);
        updateQualifyingResults(qualifying);
        return qualifying;
    } catch (error) {
        console.error('❌ Error fetching qualifying:', error);
        return null;
    }
}

function updateQualifyingResults(qualifyingData) {
    if (!qualifyingData) return;
    
    const qualifyingGrid = document.getElementById('qualifying-results');
    if (!qualifyingGrid) return;
    
    qualifyingGrid.innerHTML = '';
    
    qualifyingData.QualifyingResults.slice(0, 10).forEach(result => {
        const card = document.createElement('div');
        card.className = 'qualifying-card';
        
        let timeDisplay = result.Q3 || result.Q2 || result.Q1 || '-';
        
        card.innerHTML = `
            <div class="q-position">${result.position}</div>
            <div class="q-driver">${result.Driver.givenName} ${result.Driver.familyName}</div>
            <div class="q-team">${result.Constructor.name}</div>
            <div class="q-time">${timeDisplay}</div>
        `;
        
        qualifyingGrid.appendChild(card);
    });
}

/* ======== FETCH DRIVER DETAILS ======== */
async function fetchDriverDetails() {
    try {
        console.log('🏎️ Fetching driver details...');
        const response = await fetch(`${F1_API_BASE}/current/drivers.json`);
        const data = await response.json();
        const drivers = data.MRData.DriverTable.Drivers;
        
        console.log('✅ Driver details loaded!', drivers);
        updateDriverDetails(drivers);
        return drivers;
    } catch (error) {
        console.error('❌ Error fetching driver details:', error);
        return null;
    }
}

function updateDriverDetails(drivers) {
    if (!drivers) return;
    
    const driverInfoGrid = document.getElementById('driver-info-grid');
    if (!driverInfoGrid) return;
    
    driverInfoGrid.innerHTML = '';
    
    drivers.slice(0, 10).forEach(driver => {
        const card = document.createElement('div');
        card.className = 'driver-info-card';
        
        card.innerHTML = `
            <div class="driver-info-header">
                <div class="driver-number">#${driver.permanentNumber || '?'}</div>
                <div class="driver-flag">${getCountryFlag(driver.nationality)}</div>
            </div>
            <div class="driver-info-name">${driver.givenName} ${driver.familyName}</div>
            <div class="driver-info-details">
                <div class="detail-item">
                    <span class="label">Code:</span>
                    <span class="value">${driver.code || '-'}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Nationality:</span>
                    <span class="value">${driver.nationality}</span>
                </div>
                <div class="detail-item">
                    <span class="label">DOB:</span>
                    <span class="value">${driver.dateOfBirth || '-'}</span>
                </div>
            </div>
        `;
        
        driverInfoGrid.appendChild(card);
    });
}

/* ======== FETCH TEAM PERFORMANCE ======== */
async function fetchTeamPerformance() {
    try {
        console.log('🏎️ Fetching team performance...');
        const response = await fetch(`${F1_API_BASE}/current/constructors.json`);
        const data = await response.json();
        const teams = data.MRData.ConstructorTable.Constructors;
        
        console.log('✅ Team data loaded!', teams);
        updateTeamPerformance(teams);
        return teams;
    } catch (error) {
        console.error('❌ Error fetching teams:', error);
        return null;
    }
}

function updateTeamPerformance(teams) {
    if (!teams) return;
    
    const teamsGrid = document.getElementById('teams-performance');
    if (!teamsGrid) return;
    
    teamsGrid.innerHTML = '';
    
    teams.forEach(team => {
        const card = document.createElement('div');
        card.className = 'team-card';
        
        card.innerHTML = `
            <div class="team-logo">${team.name.charAt(0)}</div>
            <div class="team-name">${team.name}</div>
            <div class="team-nationality">${team.nationality}</div>
        `;
        
        teamsGrid.appendChild(card);
    });
}

/* ======== FETCH FASTEST LAPS FOR SPECIFIC RACE ======== */
async function fetchFastestLapsForRace(round = 'last') {
    const container = document.getElementById('fastest-laps-container');
    if (container) container.innerHTML = '<div style="text-align: center; padding: 3rem; color: var(--gray-400); grid-column: 1/-1;">🔄 Loading fastest laps...</div>';
    
    try {
        console.log(`⚡ Fetching fastest laps for round ${round}...`);
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/2024/${round}/results`);
        
        if (response.ok) {
            const data = await response.json();
            if (data.MRData?.RaceTable?.Races && data.MRData.RaceTable.Races.length > 0) {
                const results = data.MRData.RaceTable.Races[0].Results;
                const fastestLapData = results
                    .filter(r => r.FastestLap)
                    .sort((a, b) => parseInt(a.FastestLap.rank) - parseInt(b.FastestLap.rank))
                    .slice(0, 5);
                
                console.log('✅ Fastest laps loaded!', fastestLapData);
                updateFastestLaps(fastestLapData, data.MRData.RaceTable.Races[0]);
                return fastestLapData;
            }
        }
    } catch (error) {
        console.error('❌ Failed to load fastest laps:', error.message);
    }
    
    if (container) {
        container.innerHTML = '<div style="text-align: center; padding: 3rem; color: var(--primary-red); grid-column: 1/-1;">❌ Failed to load fastest laps data</div>';
    }
    return null;
}

/* ======== FETCH FASTEST LAPS (LATEST) ======== */
async function fetchFastestLaps() {
    return fetchFastestLapsForRace('last');
}

function updateFastestLaps(lapsData, raceData) {
    if (!lapsData || lapsData.length === 0) return;
    
    const fastestLapsContainer = document.getElementById('fastest-laps-container');
    if (!fastestLapsContainer) return;
    
    // Get circuit info from the race data
    const circuitName = raceData?.Circuit?.circuitName || 'Unknown Circuit';
    const raceName = raceData?.raceName || 'Grand Prix';
    
    fastestLapsContainer.innerHTML = '';
    
    lapsData.forEach((result, index) => {
        const card = document.createElement('div');
        card.className = 'fastest-lap-card';
        
        let medal = '';
        if (index === 0) medal = '🥇';
        else if (index === 1) medal = '🥈';
        else if (index === 2) medal = '🥉';
        
        card.innerHTML = `
            <div class="lap-header">
                <div class="lap-rank-badge">
                    <span class="lap-medal">${medal}</span>
                    <span class="lap-rank">#${index + 1}</span>
                </div>
            </div>
            <div class="lap-driver-info">
                <div class="lap-driver-name">${result.Driver.givenName} ${result.Driver.familyName}</div>
                <div class="lap-team">${result.Constructor.name}</div>
            </div>
            <div class="lap-stats">
                <div class="lap-stat">
                    <span class="lap-stat-label">⏱️ TIME</span>
                    <span class="lap-stat-value">${result.FastestLap.Time.time}</span>
                </div>
                <div class="lap-stat">
                    <span class="lap-stat-label">⚡ SPEED</span>
                    <span class="lap-stat-value">${result.FastestLap.AverageSpeed.speed} ${result.FastestLap.AverageSpeed.units}</span>
                </div>
                <div class="lap-stat">
                    <span class="lap-stat-label">🏁 LAP</span>
                    <span class="lap-stat-value">${result.FastestLap.lap}</span>
                </div>
            </div>
        `;
        
        fastestLapsContainer.appendChild(card);
    });
}

/* ======== FETCH PIT STOPS FOR SPECIFIC RACE ======== */
async function fetchPitStopsForRace(round = 'last') {
    const container = document.getElementById('pitstops-grid');
    if (container) container.innerHTML = '<div style="text-align: center; padding: 3rem; color: var(--gray-400); grid-column: 1/-1;">🔄 Loading pit stops...</div>';
    
    try {
        console.log(`🔧 Fetching pit stops for round ${round}...`);
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/2024/${round}/pitstops`);
        
        if (response.ok) {
            const data = await response.json();
            if (data.MRData?.RaceTable?.Races && data.MRData.RaceTable.Races.length > 0) {
                const pitStops = data.MRData.RaceTable.Races[0].PitStops;
                console.log('✅ Pit stops loaded!', pitStops);
                updatePitStops(pitStops);
                return pitStops;
            }
        }
    } catch (error) {
        console.error('❌ Failed to load pit stops:', error.message);
    }
    
    if (container) {
        container.innerHTML = '<div style="text-align: center; padding: 3rem; color: var(--primary-red); grid-column: 1/-1;">❌ Failed to load pit stop data</div>';
    }
    return null;
}

/* ======== FETCH PIT STOPS (LATEST) ======== */
async function fetchPitStops() {
    return fetchPitStopsForRace('last');
}

function updatePitStops(pitStops) {
    if (!pitStops || pitStops.length === 0) return;
    
    const pitstopsGrid = document.getElementById('pitstops-grid');
    if (!pitstopsGrid) return;
    
    // Sort by duration and get top 10 fastest
    const sortedStops = pitStops
        .sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration))
        .slice(0, 10);
    
    pitstopsGrid.innerHTML = '';
    
    sortedStops.forEach((stop, index) => {
        const card = document.createElement('div');
        card.className = 'pitstop-card';
        
        // Add highlight for fastest stop
        if (index === 0) {
            card.classList.add('fastest-stop');
        }
        
        let medal = '';
        if (index === 0) medal = '🥇';
        else if (index === 1) medal = '🥈';
        else if (index === 2) medal = '🥉';
        
        card.innerHTML = `
            <div class="pitstop-header">
                <span class="pitstop-rank">${medal || `#${index + 1}`}</span>
                <span class="pitstop-lap">LAP ${stop.lap}</span>
            </div>
            <div class="pitstop-driver">${stop.driverId.toUpperCase()}</div>
            <div class="pitstop-duration">
                <span class="duration-label">PIT TIME</span>
                <span class="duration-value">${stop.duration}s</span>
            </div>
            <div class="pitstop-stop-number">
                <span class="stop-label">STOP</span>
                <span class="stop-value">#${stop.stop}</span>
            </div>
        `;
        
        pitstopsGrid.appendChild(card);
    });
}

/* ======== FETCH SEASON STATISTICS ======== */
async function fetchSeasonStats() {
    try {
        console.log('🏎️ Fetching season statistics...');
        
        // Fetch multiple data points
        const [racesResp, standingsResp] = await Promise.all([
            fetch(`${F1_API_BASE}/current.json`),
            fetch(`${F1_API_BASE}/current/driverStandings.json`)
        ]);
        
        const racesData = await racesResp.json();
        const standingsData = await standingsResp.json();
        
        const races = racesData.MRData.RaceTable.Races;
        const standings = standingsData.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        
        // Calculate stats
        const now = new Date();
        const racesCompleted = races.filter(r => new Date(r.date) < now).length;
        const totalDrivers = standings.length;
        
        // Update UI
        document.getElementById('races-completed').textContent = racesCompleted;
        document.getElementById('total-drivers').textContent = totalDrivers;
        
        console.log('✅ Season stats loaded!');
    } catch (error) {
        console.error('❌ Error fetching season stats:', error);
    }
}

/* ======== FETCH CIRCUITS ======== */
async function fetchCircuits() {
    try {
        console.log('🏎️ Fetching circuit information...');
        const response = await fetch(`${F1_API_BASE}/current/circuits.json`);
        const data = await response.json();
        const circuits = data.MRData.CircuitTable.Circuits;
        
        console.log('✅ Circuits loaded!', circuits);
        updateCircuits(circuits);
        return circuits;
    } catch (error) {
        console.error('❌ Error fetching circuits:', error);
        return null;
    }
}

function updateCircuits(circuits) {
    if (!circuits) return;
    
    const circuitsGrid = document.getElementById('circuits-info');
    if (!circuitsGrid) return;
    
    circuitsGrid.innerHTML = '';
    
    circuits.forEach(circuit => {
        const card = document.createElement('div');
        card.className = 'circuit-card';
        
        card.innerHTML = `
            <div class="circuit-flag">${getCountryFlag(circuit.Location.country)}</div>
            <div class="circuit-name">${circuit.circuitName}</div>
            <div class="circuit-location">${circuit.Location.locality}, ${circuit.Location.country}</div>
        `;
        
        circuitsGrid.appendChild(card);
    });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    /* ======== OPENING ANIMATION (Only Once Per Session) ======== */
    const openingAnimation = document.getElementById('opening-animation');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    console.log('🏁 Current page:', currentPage);
    
    // Show opening animation only on homepage and only once per session
    if (openingAnimation) {
        const hasSeenAnimation = sessionStorage.getItem('f1-animation-seen');
        
        if ((currentPage === 'index.html' || currentPage === '') && !hasSeenAnimation) {
            // First visit to homepage - show animation
            console.log('🎬 Playing opening animation...');
            sessionStorage.setItem('f1-animation-seen', 'true');
            
            // Remove animation after 3.6 seconds (enhanced animation)
            setTimeout(function() {
                console.log('✅ Ending animation');
                openingAnimation.style.opacity = '0';
                setTimeout(function() {
                    if (openingAnimation && openingAnimation.parentNode) {
                        openingAnimation.parentNode.removeChild(openingAnimation);
                        console.log('✅ Animation removed');
                    }
                }, 600);
            }, 3600);
        } else {
            // Already seen or not homepage - hide immediately
            if (openingAnimation && openingAnimation.parentNode) {
                openingAnimation.parentNode.removeChild(openingAnimation);
            }
            console.log('⏭️ Animation skipped');
        }
    }
    
    /* ======== LOAD LIVE F1 DATA - PAGE SPECIFIC ======== */
    console.log('🏁 F1 PITWALL - Loading F1 Data...');
    
    // Load data based on current page
    let dataPromises = [];
    
    if (currentPage === 'standings.html') {
        dataPromises = [fetchDriverStandings(), fetchConstructorStandings()];
    } else if (currentPage === 'calendar.html') {
        dataPromises = [fetchRaceSchedule()];
        // Setup calendar toggle functionality
        setupCalendarToggle();
        
        // Auto-refresh calendar every 10 minutes to catch race status changes
        setInterval(() => {
            console.log('🔄 Auto-refreshing race calendar...');
            fetchRaceSchedule().then(() => {
                console.log('✅ Calendar auto-refresh complete');
            });
        }, 600000); // 10 minutes
    } else if (currentPage === 'race-results.html') {
        // Populate race selector dropdown
        populateRaceSelector();
        
        // Load latest race by default
        dataPromises = [fetchLatestRaceResults(), fetchFastestLaps(), fetchPitStops()];
        
        // Setup race selector event listener - auto-load on change
        const raceSelector = document.getElementById('race-selector');
        
        if (raceSelector) {
            raceSelector.addEventListener('change', () => {
                const selectedRound = raceSelector.value;
                console.log(`🏁 Loading race round: ${selectedRound}`);
                fetchRaceResults(selectedRound);
            });
        }
    } else if (currentPage === 'qualifying.html') {
        dataPromises = [fetchQualifyingResults()];
    } else if (currentPage === 'drivers-info.html') {
        dataPromises = [fetchDriverDetails(), fetchSeasonStats()];
    } else if (currentPage === 'teams.html') {
        dataPromises = [fetchTeamPerformance(), fetchCircuits()];
    } else if (currentPage === 'comparison.html') {
        // Comparison page doesn't need initial data load
        dataPromises = [];
    } else {
        // Home page or other pages - load minimal data
        console.log('🏠 Home page - No API calls needed');
        dataPromises = [];
    }
    
    // Fetch data for current page
    if (dataPromises.length > 0) {
        console.log(`🔄 Fetching ${dataPromises.length} data source(s)...`);
        
        Promise.all(dataPromises)
            .then((results) => {
                console.log('✅ F1 Data Loaded Successfully for ' + currentPage, results);
                showLiveDataNotification();
            })
            .catch(error => {
                console.error('❌ Error loading F1 data:', error);
                alert('Failed to load F1 data. Please check your internet connection.');
            });
        
        // Auto-refresh data every 5 minutes (only for pages with live data)
        setInterval(() => {
            console.log('🔄 Refreshing F1 data for ' + currentPage);
            if (currentPage === 'standings.html') {
                fetchDriverStandings();
                fetchConstructorStandings();
            } else if (currentPage === 'calendar.html') {
                fetchRaceSchedule();
            } else if (currentPage === 'previous-races.html') {
                fetchPreviousRaces();
            } else if (currentPage === 'race-results.html') {
                fetchLatestRaceResults();
                fetchFastestLaps();
                fetchPitStops();
            } else if (currentPage === 'qualifying.html') {
                fetchQualifyingResults();
            } else if (currentPage === 'drivers-info.html') {
                fetchDriverDetails();
                fetchSeasonStats();
            } else if (currentPage === 'teams.html') {
                fetchTeamPerformance();
                fetchCircuits();
            }
        }, 300000); // 5 minutes
    }
    
    /* ======== MOBILE MENU TOGGLE ======== */
    const mobileMenu = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileMenu.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinkItems = document.querySelectorAll('.nav-link');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                const spans = mobileMenu.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    /* ======== NAVBAR SCROLL EFFECT ======== */
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    /* ======== SMOOTH SCROLL FOR ANCHOR LINKS ======== */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    /* ======== ACTIVE NAV LINK ON SCROLL ======== */
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (navLink) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    /* ======== CARD ENTRANCE ANIMATION ======== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe driver cards
    const driverCards = document.querySelectorAll('.driver-card');
    driverCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    /* ======== PARALLAX EFFECT ON HERO ======== */
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }
    
    /* ======== PERFORMANCE BARS ANIMATION ======== */
    const performanceBars = document.querySelectorAll('.bar-fill');
    
    const barObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
    if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                
        setTimeout(() => {
                    bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    bar.style.width = width;
                }, 100);
                
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    performanceBars.forEach(bar => {
        barObserver.observe(bar);
    });
    
    /* ======== DRIVER COMPARISON FEATURE ======== */
    const compareBtn = document.getElementById('compare-btn');
    const driver1Select = document.getElementById('driver1-select');
    const driver2Select = document.getElementById('driver2-select');
    const comparisonResults = document.getElementById('comparison-results');
    
    if (compareBtn) {
        compareBtn.addEventListener('click', function() {
            const driver1 = driver1Select.value;
            const driver2 = driver2Select.value;
            
            if (!driver1 || !driver2) {
                alert('Please select both drivers to compare!');
        return;
    }
    
            if (driver1 === driver2) {
                alert('Please select two different drivers!');
                return;
            }
            
            // Get driver data
            const d1 = driversData[driver1];
            const d2 = driversData[driver2];
            
            // Populate driver 1 card
            const driver1Card = document.getElementById('driver1-card');
            driver1Card.querySelector('.comparison-img').src = d1.image;
            driver1Card.querySelector('.comparison-name').textContent = d1.name;
            driver1Card.querySelector('.comparison-team').textContent = d1.team;
            driver1Card.querySelectorAll('.stat-value')[0].textContent = d1.wins;
            driver1Card.querySelectorAll('.stat-value')[1].textContent = d1.podiums;
            driver1Card.querySelectorAll('.stat-value')[2].textContent = d1.poles;
            driver1Card.querySelectorAll('.stat-value')[3].textContent = d1.championships;
            driver1Card.querySelectorAll('.stat-value')[4].textContent = d1.points;
            
            // Populate driver 2 card
            const driver2Card = document.getElementById('driver2-card');
            driver2Card.querySelector('.comparison-img').src = d2.image;
            driver2Card.querySelector('.comparison-name').textContent = d2.name;
            driver2Card.querySelector('.comparison-team').textContent = d2.team;
            driver2Card.querySelectorAll('.stat-value')[0].textContent = d2.wins;
            driver2Card.querySelectorAll('.stat-value')[1].textContent = d2.podiums;
            driver2Card.querySelectorAll('.stat-value')[2].textContent = d2.poles;
            driver2Card.querySelectorAll('.stat-value')[3].textContent = d2.championships;
            driver2Card.querySelectorAll('.stat-value')[4].textContent = d2.points;
            
            // Calculate winner
            const d1Score = d1.wins * 5 + d1.podiums * 2 + d1.poles * 3 + d1.championships * 100;
            const d2Score = d2.wins * 5 + d2.podiums * 2 + d2.poles * 3 + d2.championships * 100;
            
            let winnerText = '';
            let winnerReason = '';
            
            // Highlight winning stats
            driver1Card.querySelectorAll('.stat-row').forEach(row => row.classList.remove('winner'));
            driver2Card.querySelectorAll('.stat-row').forEach(row => row.classList.remove('winner'));
            
            // Highlight individual stat winners
            if (d1.wins > d2.wins) driver1Card.querySelectorAll('.stat-row')[0].classList.add('winner');
            else if (d2.wins > d1.wins) driver2Card.querySelectorAll('.stat-row')[0].classList.add('winner');
            
            if (d1.podiums > d2.podiums) driver1Card.querySelectorAll('.stat-row')[1].classList.add('winner');
            else if (d2.podiums > d1.podiums) driver2Card.querySelectorAll('.stat-row')[1].classList.add('winner');
            
            if (d1.poles > d2.poles) driver1Card.querySelectorAll('.stat-row')[2].classList.add('winner');
            else if (d2.poles > d1.poles) driver2Card.querySelectorAll('.stat-row')[2].classList.add('winner');
            
            if (d1.championships > d2.championships) driver1Card.querySelectorAll('.stat-row')[3].classList.add('winner');
            else if (d2.championships > d1.championships) driver2Card.querySelectorAll('.stat-row')[3].classList.add('winner');
            
            if (d1.points > d2.points) driver1Card.querySelectorAll('.stat-row')[4].classList.add('winner');
            else if (d2.points > d1.points) driver2Card.querySelectorAll('.stat-row')[4].classList.add('winner');
            
            if (d1Score > d2Score) {
                winnerText = `🏆 ${d1.name} Wins!`;
                winnerReason = `With ${d1.wins} race wins, ${d1.podiums} podiums, and ${d1.championships} championships, ${d1.name} dominates this battle!`;
            } else if (d2Score > d1Score) {
                winnerText = `🏆 ${d2.name} Wins!`;
                winnerReason = `With ${d2.wins} race wins, ${d2.podiums} podiums, and ${d2.championships} championships, ${d2.name} dominates this battle!`;
    } else {
                winnerText = `🤝 It's a Tie!`;
                winnerReason = `Both drivers have equally impressive careers!`;
            }
            
            document.getElementById('winner-text').textContent = winnerText;
            document.getElementById('winner-reason').textContent = winnerReason;
            
            // Show results with animation
            comparisonResults.style.display = 'grid';
            comparisonResults.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
    
    /* ======== LIVE DATA NOTIFICATION ======== */
    function showLiveDataNotification() {
        const notification = document.createElement('div');
        notification.className = 'live-notification';
        notification.innerHTML = `
            <span class="notification-icon">🔴</span>
            <span class="notification-text">Live F1 Data Connected!</span>
        `;
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 500);
        
        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }
    
    /* ======== CONSOLE WELCOME MESSAGE ======== */
    console.log('%c🏎️ F1 PITWALL', 'color: #E10600; font-size: 24px; font-weight: bold;');
    console.log('%c🔴 LIVE DATA ENABLED', 'color: #00FF00; font-size: 16px; font-weight: bold;');
    console.log('%cWelcome to the most advanced F1 hub!', 'color: #FFFFFF; font-size: 14px;');
    console.log('%cConnected to Ergast F1 API - Real-time data', 'color: #FFD700; font-size: 12px;');
    console.log('%cBuilt with passion for Formula 1', 'color: #9E9E9E; font-size: 12px;');
    
    /* ======== MARK PROFILE VISIT (for returning users) ======== */
    if (document.querySelector('.profile-page')) {
        sessionStorage.setItem('visited-profile', 'true');
    }
    
    /* ======== SMOOTH SCROLL ENHANCEMENTS ======== */
    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* ======== SCROLL PROGRESS INDICATOR ======== */
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--primary-red), var(--gold));
        z-index: 10001;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(225, 6, 0, 0.8);
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    /* ======== KEYBOARD NAVIGATION ACCESSIBILITY ======== */
    document.addEventListener('keydown', function(e) {
        // Press 'H' to go home
        if (e.key === 'h' || e.key === 'H') {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                window.location.href = 'index.html';
            }
        }
    });
    
    /* ======== LOADING OPTIMIZATION ======== */
    // Add loaded class to body when everything is ready
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    /* ======== ADD HOVER SOUND EFFECT (Optional) ======== */
    // Uncomment if you want to add sound effects
    /*
    const cards = document.querySelectorAll('.driver-card, .car-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add your sound effect here
            // const audio = new Audio('assets/hover-sound.mp3');
            // audio.volume = 0.2;
            // audio.play();
        });
    });
    */
    
    /* ======== LAZY LOADING IMAGES ======== */
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
    if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
});

/* ======== UPDATE LAST REFRESH TIME ======== */
function updateLastRefreshTime() {
    const lastUpdated = document.getElementById('last-updated');
    if (!lastUpdated) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    
    lastUpdated.innerHTML = `
        <span style="color: var(--primary-red);">●</span> 
        Last updated: ${timeString} | 
        <span style="color: var(--gray-500);">⟳ Auto-refresh every 10 minutes</span>
    `;
}

/* ======== YEAR SELECTOR ======== */
function setupYearSelector() {
    const yearSlider = document.getElementById('year-slider');
    const selectedYearDisplay = document.getElementById('selected-year');
    const yearPrevBtn = document.getElementById('year-prev');
    const yearNextBtn = document.getElementById('year-next');
    
    if (!yearSlider || !selectedYearDisplay) return;
    
    let currentYear = 2024;
    
    // Update year display
    function updateYearDisplay(year) {
        selectedYearDisplay.textContent = year;
        yearSlider.value = year;
        currentYear = year;
    }
    
    // Fetch races for selected year
    async function loadYearRaces(year) {
        console.log(`📅 Loading races for ${year}...`);
        
        const racesGrid = document.getElementById('races-grid');
        if (racesGrid) {
            racesGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--gray-400);">
                    <div class="loading-spinner" style="margin: 0 auto 1rem;"></div>
                    <h3 style="color: var(--white); margin-bottom: 0.5rem;">Loading ${year} Season...</h3>
                    <p>Fetching race data from F1 API</p>
                </div>
            `;
        }
        
        try {
            // Try multiple API endpoints
            const apiEndpoints = [
                `https://api.jolpi.ca/ergast/f1/${year}.json`,
                `https://api.allorigins.win/get?url=${encodeURIComponent('https://ergast.com/api/f1/' + year + '.json')}`
            ];
            
            let data = null;
            for (const url of apiEndpoints) {
                try {
                    const response = await fetch(url);
                    if (response.ok) {
                        const jsonData = await response.json();
                        // Handle AllOrigins wrapper
                        if (jsonData.contents) {
                            data = JSON.parse(jsonData.contents);
                        } else {
                            data = jsonData;
                        }
                        break;
                    }
                } catch (err) {
                    console.warn(`Failed to fetch from ${url}:`, err.message);
                    continue;
                }
            }
            
            if (!data) {
                throw new Error('All API endpoints failed');
            }
            
            const races = data.MRData.RaceTable.Races;
            
            if (!races || races.length === 0) {
                throw new Error('No races found for this year');
            }
            
            console.log(`✅ Loaded ${races.length} races from ${year}`);
            renderRacesByView('previous', races);
            
        } catch (error) {
            console.error('❌ Error loading year races:', error);
            if (racesGrid) {
                racesGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--gray-400);">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                        <h3 style="color: var(--white); margin-bottom: 0.5rem;">No Data for ${year}</h3>
                        <p>Race data for this season is not available.</p>
                    </div>
                `;
            }
        }
    }
    
    // Slider change event
    yearSlider.addEventListener('input', function() {
        updateYearDisplay(parseInt(this.value));
    });
    
    yearSlider.addEventListener('change', function() {
        const year = parseInt(this.value);
        loadYearRaces(year);
    });
    
    // Previous year button
    if (yearPrevBtn) {
        yearPrevBtn.addEventListener('click', function() {
            if (currentYear > 1950) {
                const newYear = currentYear - 1;
                updateYearDisplay(newYear);
                loadYearRaces(newYear);
            }
        });
    }
    
    // Next year button
    if (yearNextBtn) {
        yearNextBtn.addEventListener('click', function() {
            if (currentYear < 2024) {
                const newYear = currentYear + 1;
                updateYearDisplay(newYear);
                loadYearRaces(newYear);
            }
        });
    }
}

/* ======== RACE DETAILS MODAL ======== */
function setupRaceModal() {
    const modal = document.getElementById('race-modal');
    const closeBtn = document.getElementById('close-modal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (!modal || !closeBtn) return;
    
    // Close modal handlers
    closeBtn.addEventListener('click', closeRaceModal);
    overlay?.addEventListener('click', closeRaceModal);
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeRaceModal();
        }
    });
}

function openRaceModal(race) {
    console.log('🏁 Opening race modal for:', race.raceName);
    
    const modal = document.getElementById('race-modal');
    if (!modal) return;
    
    // Update modal header
    document.getElementById('modal-flag').textContent = getCountryFlag(race.Circuit.Location.country);
    document.getElementById('modal-title').textContent = race.raceName;
    document.getElementById('modal-circuit').textContent = race.Circuit.circuitName;
    document.getElementById('modal-date').textContent = formatRaceDate(race.date, race.time);
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Load race data
    loadRaceDetails(race);
}

function closeRaceModal() {
    const modal = document.getElementById('race-modal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    console.log('✅ Modal closed');
}

async function loadRaceDetails(race) {
    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;
    
    // Show loading
    modalBody.innerHTML = `
        <div style="text-align: center; padding: 3rem;">
            <div class="loading-spinner" style="margin: 0 auto 1rem;"></div>
            <p style="color: var(--gray-400);">Loading race data...</p>
        </div>
    `;
    
    const year = race.date.split('-')[0];
    const round = race.round;
    const raceDate = new Date(race.date);
    const now = new Date();
    const isPastRace = raceDate < now;
    
    try {
        let html = '';
        
        // Circuit Information
        html += `
            <div class="modal-section">
                <h3 class="modal-section-title">📍 Circuit Information</h3>
                <div class="modal-info-grid">
                    <div class="modal-info-item">
                        <div class="modal-info-label">Circuit</div>
                        <div class="modal-info-value">${race.Circuit.circuitName}</div>
                    </div>
                    <div class="modal-info-item">
                        <div class="modal-info-label">Location</div>
                        <div class="modal-info-value">${race.Circuit.Location.locality}, ${race.Circuit.Location.country}</div>
                    </div>
                    <div class="modal-info-item">
                        <div class="modal-info-label">Round</div>
                        <div class="modal-info-value">${race.round} / 24</div>
                    </div>
                    <div class="modal-info-item">
                        <div class="modal-info-label">Date</div>
                        <div class="modal-info-value">${new Date(race.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                </div>
            </div>
        `;
        
        if (isPastRace) {
            // Fetch race results
            console.log(`📊 Fetching results for ${year} round ${round}`);
            
            try {
                const response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/${round}/results.json`);
                if (response.ok) {
                    const data = await response.json();
                    const results = data.MRData.RaceTable.Races[0]?.Results;
                    
                    if (results && results.length > 0) {
                        // Add podium section
                        const podium = results.slice(0, 3);
                        html += `
                            <div class="modal-section">
                                <h3 class="modal-section-title">🏆 Podium</h3>
                                <div class="podium-display">
                                    ${podium[1] ? `
                                    <div class="podium-item podium-second">
                                        <div class="podium-medal">🥈</div>
                                        <div class="podium-position">P2</div>
                                        <div class="podium-driver">${podium[1].Driver.familyName}</div>
                                        <div class="podium-team">${podium[1].Constructor.name}</div>
                                        <div class="podium-stand second">2</div>
                                    </div>
                                    ` : ''}
                                    ${podium[0] ? `
                                    <div class="podium-item podium-first">
                                        <div class="podium-medal">🥇</div>
                                        <div class="podium-position">P1</div>
                                        <div class="podium-driver">${podium[0].Driver.familyName}</div>
                                        <div class="podium-team">${podium[0].Constructor.name}</div>
                                        <div class="podium-stand first">1</div>
                                    </div>
                                    ` : ''}
                                    ${podium[2] ? `
                                    <div class="podium-item podium-third">
                                        <div class="podium-medal">🥉</div>
                                        <div class="podium-position">P3</div>
                                        <div class="podium-driver">${podium[2].Driver.familyName}</div>
                                        <div class="podium-team">${podium[2].Constructor.name}</div>
                                        <div class="podium-stand third">3</div>
                                    </div>
                                    ` : ''}
                                </div>
                            </div>
                        `;
                        
                        html += `
                            <div class="modal-section">
                                <h3 class="modal-section-title">📊 Full Results</h3>
                                <div class="modal-results-table">
                                    <div class="modal-result-row header">
                                        <div class="modal-position">POS</div>
                                        <div class="modal-driver">DRIVER</div>
                                        <div class="modal-points">TIME/STATUS</div>
                                    </div>
                        `;
                        
                        results.slice(0, 10).forEach(result => {
                            const positionClass = result.position <= 3 ? 'podium-' + result.position : '';
                            const positionNum = parseInt(result.position);
                            let medal = '';
                            if (positionNum === 1) medal = '🥇';
                            else if (positionNum === 2) medal = '🥈';
                            else if (positionNum === 3) medal = '🥉';
                            
                            // Get fastest lap indicator
                            const hasFastestLap = result.FastestLap?.rank === '1';
                            
                            html += `
                                <div class="modal-result-row ${positionClass}">
                                    <div class="modal-position">
                                        ${medal ? `<span class="position-medal">${medal}</span>` : ''}
                                        ${result.position}
                                    </div>
                                    <div>
                                        <div class="modal-driver">${result.Driver.givenName} ${result.Driver.familyName}</div>
                                        <div class="modal-team">
                                            <span>${result.Constructor.name}</span>
                                            ${result.points > 0 ? `<span class="team-badge">${result.points} PTS</span>` : ''}
                                        </div>
                                        ${hasFastestLap ? '<div class="fastest-lap"><span class="fastest-lap-icon">⚡</span>Fastest Lap</div>' : ''}
                                    </div>
                                    <div class="modal-points">${result.Time?.time || result.status}</div>
                                </div>
                            `;
                        });
                        
                        html += `
                                </div>
                            </div>
                        `;
                    }
                }
            } catch (err) {
                console.warn('❌ Could not fetch race results:', err.message);
            }
            
            // Fetch qualifying results
            try {
                const response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/${round}/qualifying.json`);
                if (response.ok) {
                    const data = await response.json();
                    const qualifying = data.MRData.RaceTable.Races[0]?.QualifyingResults;
                    
                    if (qualifying && qualifying.length > 0) {
                        html += `
                            <div class="modal-section">
                                <h3 class="modal-section-title">⏱️ Qualifying Results</h3>
                                <div class="modal-results-table">
                                    <div class="modal-result-row header">
                                        <div class="modal-position">POS</div>
                                        <div class="modal-driver">DRIVER</div>
                                        <div class="modal-points">Q3 TIME</div>
                                    </div>
                        `;
                        
                        qualifying.slice(0, 10).forEach(result => {
                            const positionClass = result.position <= 3 ? 'podium-' + result.position : '';
                            const positionNum = parseInt(result.position);
                            let medal = '';
                            if (positionNum === 1) medal = '🥇';
                            else if (positionNum === 2) medal = '🥈';
                            else if (positionNum === 3) medal = '🥉';
                            
                            // Determine which session time to show
                            let qTime = result.Q3 || result.Q2 || result.Q1 || '-';
                            let qSession = result.Q3 ? 'Q3' : result.Q2 ? 'Q2' : 'Q1';
                            
                            html += `
                                <div class="modal-result-row ${positionClass}">
                                    <div class="modal-position">
                                        ${medal ? `<span class="position-medal">${medal}</span>` : ''}
                                        ${result.position}
                                    </div>
                                    <div>
                                        <div class="modal-driver">${result.Driver.givenName} ${result.Driver.familyName}</div>
                                        <div class="modal-team">
                                            <span>${result.Constructor.name}</span>
                                            ${result.Q3 ? '<span class="team-badge">Q3</span>' : result.Q2 ? '<span class="team-badge">Q2</span>' : '<span class="team-badge">Q1</span>'}
                                        </div>
                                    </div>
                                    <div class="modal-points">${qTime}</div>
                                </div>
                            `;
                        });
                        
                        html += `
                                </div>
                            </div>
                        `;
                    }
                }
            } catch (err) {
                console.warn('❌ Could not fetch qualifying results:', err.message);
            }
        } else {
            // Upcoming race - show preview
            html += `
                <div class="modal-no-data">
                    <div class="modal-no-data-icon">🔮</div>
                    <h3 style="color: var(--white); margin-bottom: 1rem;">Upcoming Race</h3>
                    <p>Race data will be available after the event has concluded.</p>
                    <p style="margin-top: 1rem; color: var(--primary-red); font-weight: 700;">
                        ${Math.ceil((raceDate - now) / (1000 * 60 * 60 * 24))} days until race day!
                    </p>
                </div>
            `;
        }
        
        modalBody.innerHTML = html;
        console.log('✅ Race details loaded');
        
    } catch (error) {
        console.error('❌ Error loading race details:', error);
        modalBody.innerHTML = `
            <div class="modal-no-data">
                <div class="modal-no-data-icon">⚠️</div>
                <h3 style="color: var(--white); margin-bottom: 1rem;">Unable to Load Data</h3>
                <p>There was an error fetching race information. Please try again later.</p>
            </div>
        `;
    }
}

/* ======== PERFORMANCE MONITORING ======== */
// Monitor page load performance
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`%cPage Load Time: ${pageLoadTime}ms`, 'color: #00A8E8; font-size: 12px;');
        }, 0);
    });
}
