import React from 'react';
import DriverProfile from './DriverProfile';

const CarlosSainz: React.FC = () => {
  const driverData = {
    name: 'Carlos Sainz',
    number: '55',
    team: 'Scuderia Ferrari',
    nationality: 'Spain',
    flag: '🇪🇸',
    image: '/assets/carlos sainz.png',
    badge: 'THE SMOOTH OPERATOR',
    wins: 3,
    podiums: 25,
    poles: 5,
    championships: 0,
    gpStarts: 197,
    fastestLaps: 5,
    age: 30,
    careerYears: '2015 - 2024',
    season2024: {
      wins: 2,
      winRate: 8,
      poles: 2,
      poleRate: 8,
      podiums: 10,
      podiumRate: 42,
      points: 244,
      pointsRate: 47
    },
    biography: {
      intro: "Carlos Sainz Jr., son of rally legend Carlos Sainz, has carved out his own legendary status in Formula 1. Known as 'The Smooth Operator,' Sainz combines consistency with impressive race-winning pace, making him one of the grid's most complete drivers.",
      achievement: "After proving himself at Toro Rosso, Renault, and McLaren, Sainz earned his dream move to Ferrari. There, he has flourished, claiming multiple race victories including an emotional win at Silverstone and a stunning victory at Singapore. His ability to challenge and often match teammate Charles Leclerc demonstrates his elite credentials.",
      current: "In 2024, Sainz continues to be a vital part of Ferrari's championship ambitions. His technical feedback and development work have been crucial to the team's progress. With his contract situation resolved, Sainz remains focused on delivering results and potentially securing his first championship title with the Prancing Horse."
    },
    carLink: '/cars/ferrari',
    carName: 'Ferrari SF-24',
    engine: 'Ferrari 066/13'
  };

  return <DriverProfile driver={driverData} />;
};

export default CarlosSainz;

