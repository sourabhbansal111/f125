import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import OpeningAnimation from './components/OpeningAnimation';
import Home from './pages/Home';
import RaceResults from './pages/RaceResults';
import Calendar from './pages/Calendar';
import Standings from './pages/Standings';
import DriversInfo from './pages/DriversInfo';
import Teams from './pages/Teams';
import Comparison from './pages/Comparison';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Driver Pages
import MaxVerstappen from './pages/drivers/MaxVerstappen';
import LewisHamilton from './pages/drivers/LewisHamilton';
import LandoNorris from './pages/drivers/LandoNorris';
import CharlesLeclerc from './pages/drivers/CharlesLeclerc';
import OscarPiastri from './pages/drivers/OscarPiastri';
import SergioPerez from './pages/drivers/SergioPerez';
import CarlosSainz from './pages/drivers/CarlosSainz';
import GeorgeRussell from './pages/drivers/GeorgeRussell';
import FernandoAlonso from './pages/drivers/FernandoAlonso';

// Car Pages
import RedBull from './pages/cars/RedBull';
import Ferrari from './pages/cars/Ferrari';
import McLaren from './pages/cars/McLaren';
import Mercedes from './pages/cars/Mercedes';
import AstonMartin from './pages/cars/AstonMartin';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <OpeningAnimation />
          <Header />
          <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/race-results" element={<RaceResults />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/drivers-info" element={<DriversInfo />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/comparison" element={<Comparison />} />
          
          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Driver Profile Pages */}
          <Route path="/drivers/max-verstappen" element={<MaxVerstappen />} />
          <Route path="/drivers/lewis-hamilton" element={<LewisHamilton />} />
          <Route path="/drivers/lando-norris" element={<LandoNorris />} />
          <Route path="/drivers/charles-leclerc" element={<CharlesLeclerc />} />
          <Route path="/drivers/oscar-piastri" element={<OscarPiastri />} />
          <Route path="/drivers/sergio-perez" element={<SergioPerez />} />
          <Route path="/drivers/carlos-sainz" element={<CarlosSainz />} />
          <Route path="/drivers/george-russell" element={<GeorgeRussell />} />
          <Route path="/drivers/fernando-alonso" element={<FernandoAlonso />} />
          
          {/* Car Detail Pages */}
          <Route path="/cars/red-bull" element={<RedBull />} />
          <Route path="/cars/ferrari" element={<Ferrari />} />
          <Route path="/cars/mclaren" element={<McLaren />} />
          <Route path="/cars/mercedes" element={<Mercedes />} />
          <Route path="/cars/aston-martin" element={<AstonMartin />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
