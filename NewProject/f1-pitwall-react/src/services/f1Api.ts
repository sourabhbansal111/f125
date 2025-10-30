import axios from 'axios';

const BASE_URL = 'https://api.jolpi.ca/ergast/f1';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

// Fallback to multiple APIs
const API_ENDPOINTS = [
  'https://api.jolpi.ca/ergast/f1',
  `${CORS_PROXY}http://ergast.com/api/f1`,
];

export const f1Api = {
  // Get latest race results
  async getLatestRaceResults() {
    const year = 2024;
    const round = 'last';
    
    for (const baseUrl of API_ENDPOINTS) {
      try {
        const response = await axios.get(
          `${baseUrl}/${year}/${round}/results.json`,
          { timeout: 10000 }
        );
        return response.data.MRData.RaceTable.Races[0];
      } catch (error) {
        console.warn(`Failed to fetch from ${baseUrl}`, error);
        continue;
      }
    }
    throw new Error('All API endpoints failed');
  },

  // Get race results for a specific round
  async getRaceResults(year: number, round: number) {
    try {
      const response = await axios.get(
        `${BASE_URL}/${year}/${round}/results.json`,
        { timeout: 10000 }
      );
      return response.data.MRData.RaceTable.Races[0];
    } catch (error) {
      console.error('Error fetching race results:', error);
      throw error;
    }
  },

  // Get race schedule for a season
  async getRaceSchedule(year: number = 2024) {
    try {
      const response = await axios.get(
        `${BASE_URL}/${year}.json`,
        { timeout: 10000 }
      );
      return response.data.MRData.RaceTable.Races;
    } catch (error) {
      console.error('Error fetching race schedule:', error);
      // Return hardcoded 2024 schedule as fallback
      return get2024Schedule();
    }
  },

  // Get driver standings
  async getDriverStandings(year: number = 2024) {
    try {
      const response = await axios.get(
        `${BASE_URL}/${year}/driverStandings.json`,
        { timeout: 10000 }
      );
      return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    } catch (error) {
      console.error('Error fetching driver standings:', error);
      throw error;
    }
  },

  // Get constructor standings
  async getConstructorStandings(year: number = 2024) {
    try {
      const response = await axios.get(
        `${BASE_URL}/${year}/constructorStandings.json`,
        { timeout: 10000 }
      );
      return response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    } catch (error) {
      console.error('Error fetching constructor standings:', error);
      throw error;
    }
  },

  // Get fastest laps for a race
  async getFastestLaps(year: number, round: number) {
    try {
      const response = await axios.get(
        `${BASE_URL}/${year}/${round}/fastest/1/results.json`,
        { timeout: 10000 }
      );
      return response.data.MRData.RaceTable.Races[0];
    } catch (error) {
      console.error('Error fetching fastest laps:', error);
      throw error;
    }
  },

  // Get qualifying results
  async getQualifyingResults(year: number, round: number) {
    try {
      const response = await axios.get(
        `${BASE_URL}/${year}/${round}/qualifying.json`,
        { timeout: 10000 }
      );
      return response.data.MRData.RaceTable.Races[0];
    } catch (error) {
      console.error('Error fetching qualifying results:', error);
      throw error;
    }
  },
};

// Hardcoded 2024 F1 Schedule as fallback
function get2024Schedule() {
  return [
    { season: "2024", round: "1", raceName: "Bahrain Grand Prix", Circuit: { circuitName: "Bahrain International Circuit", Location: { locality: "Sakhir", country: "Bahrain" } }, date: "2024-03-02" },
    { season: "2024", round: "2", raceName: "Saudi Arabian Grand Prix", Circuit: { circuitName: "Jeddah Corniche Circuit", Location: { locality: "Jeddah", country: "Saudi Arabia" } }, date: "2024-03-09" },
    { season: "2024", round: "3", raceName: "Australian Grand Prix", Circuit: { circuitName: "Albert Park Circuit", Location: { locality: "Melbourne", country: "Australia" } }, date: "2024-03-24" },
    { season: "2024", round: "4", raceName: "Japanese Grand Prix", Circuit: { circuitName: "Suzuka Circuit", Location: { locality: "Suzuka", country: "Japan" } }, date: "2024-04-07" },
    { season: "2024", round: "5", raceName: "Chinese Grand Prix", Circuit: { circuitName: "Shanghai International Circuit", Location: { locality: "Shanghai", country: "China" } }, date: "2024-04-21" },
    { season: "2024", round: "6", raceName: "Miami Grand Prix", Circuit: { circuitName: "Miami International Autodrome", Location: { locality: "Miami", country: "USA" } }, date: "2024-05-05" },
    { season: "2024", round: "7", raceName: "Emilia Romagna Grand Prix", Circuit: { circuitName: "Autodromo Enzo e Dino Ferrari", Location: { locality: "Imola", country: "Italy" } }, date: "2024-05-19" },
    { season: "2024", round: "8", raceName: "Monaco Grand Prix", Circuit: { circuitName: "Circuit de Monaco", Location: { locality: "Monte-Carlo", country: "Monaco" } }, date: "2024-05-26" },
    { season: "2024", round: "9", raceName: "Canadian Grand Prix", Circuit: { circuitName: "Circuit Gilles Villeneuve", Location: { locality: "Montreal", country: "Canada" } }, date: "2024-06-09" },
    { season: "2024", round: "10", raceName: "Spanish Grand Prix", Circuit: { circuitName: "Circuit de Barcelona-Catalunya", Location: { locality: "Barcelona", country: "Spain" } }, date: "2024-06-23" },
    { season: "2024", round: "11", raceName: "Austrian Grand Prix", Circuit: { circuitName: "Red Bull Ring", Location: { locality: "Spielberg", country: "Austria" } }, date: "2024-06-30" },
    { season: "2024", round: "12", raceName: "British Grand Prix", Circuit: { circuitName: "Silverstone Circuit", Location: { locality: "Silverstone", country: "UK" } }, date: "2024-07-07" },
    { season: "2024", round: "13", raceName: "Hungarian Grand Prix", Circuit: { circuitName: "Hungaroring", Location: { locality: "Budapest", country: "Hungary" } }, date: "2024-07-21" },
    { season: "2024", round: "14", raceName: "Belgian Grand Prix", Circuit: { circuitName: "Circuit de Spa-Francorchamps", Location: { locality: "Spa", country: "Belgium" } }, date: "2024-07-28" },
    { season: "2024", round: "15", raceName: "Dutch Grand Prix", Circuit: { circuitName: "Circuit Zandvoort", Location: { locality: "Zandvoort", country: "Netherlands" } }, date: "2024-08-25" },
    { season: "2024", round: "16", raceName: "Italian Grand Prix", Circuit: { circuitName: "Autodromo Nazionale di Monza", Location: { locality: "Monza", country: "Italy" } }, date: "2024-09-01" },
    { season: "2024", round: "17", raceName: "Azerbaijan Grand Prix", Circuit: { circuitName: "Baku City Circuit", Location: { locality: "Baku", country: "Azerbaijan" } }, date: "2024-09-15" },
    { season: "2024", round: "18", raceName: "Singapore Grand Prix", Circuit: { circuitName: "Marina Bay Street Circuit", Location: { locality: "Singapore", country: "Singapore" } }, date: "2024-09-22" },
    { season: "2024", round: "19", raceName: "United States Grand Prix", Circuit: { circuitName: "Circuit of the Americas", Location: { locality: "Austin", country: "USA" } }, date: "2024-10-20" },
    { season: "2024", round: "20", raceName: "Mexico City Grand Prix", Circuit: { circuitName: "Autódromo Hermanos Rodríguez", Location: { locality: "Mexico City", country: "Mexico" } }, date: "2024-10-27" },
    { season: "2024", round: "21", raceName: "São Paulo Grand Prix", Circuit: { circuitName: "Autódromo José Carlos Pace", Location: { locality: "São Paulo", country: "Brazil" } }, date: "2024-11-03" },
    { season: "2024", round: "22", raceName: "Las Vegas Grand Prix", Circuit: { circuitName: "Las Vegas Street Circuit", Location: { locality: "Las Vegas", country: "USA" } }, date: "2024-11-23" },
    { season: "2024", round: "23", raceName: "Qatar Grand Prix", Circuit: { circuitName: "Lusail International Circuit", Location: { locality: "Lusail", country: "Qatar" } }, date: "2024-12-01" },
    { season: "2024", round: "24", raceName: "Abu Dhabi Grand Prix", Circuit: { circuitName: "Yas Marina Circuit", Location: { locality: "Abu Dhabi", country: "UAE" } }, date: "2024-12-08" },
  ];
}

export default f1Api;

