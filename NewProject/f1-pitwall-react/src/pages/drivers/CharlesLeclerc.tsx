import React from 'react';
import DriverProfile from './DriverProfile';

const CharlesLeclerc: React.FC = () => {
  const driverData = {
    name: 'Charles Leclerc',
    number: '16',
    team: 'Scuderia Ferrari',
    nationality: 'Monaco',
    flag: '🇲🇨',
    image: '/assets/player4.jpg',
    badge: 'IL PREDESTINATO',
    wins: 6,
    podiums: 36,
    poles: 26,
    championships: 0,
    gpStarts: 138,
    fastestLaps: 9,
    age: 27,
    careerYears: '2018 - 2024',
    season2024: {
      wins: 3,
      winRate: 13,
      poles: 5,
      poleRate: 21,
      podiums: 13,
      podiumRate: 54,
      points: 319,
      pointsRate: 62
    },
    biography: {
      intro: "Charles Leclerc is the pride of Monaco and the future of Scuderia Ferrari. Known as 'Il Predestinato' (The Chosen One), Leclerc has lived up to the immense expectations placed upon him since joining the legendary Italian team.",
      achievement: "With exceptional qualifying pace that has earned him the nickname 'Qualifying King,' Leclerc has proven himself as one of F1's fastest drivers. His ability to extract maximum performance on a single lap is matched by few, and his racecraft continues to evolve with each season.",
      current: "In 2024, Leclerc continues his quest to bring Ferrari back to championship glory. His commitment to the Scuderia, combined with his raw speed and growing maturity, makes him a cornerstone of Ferrari's future. The Monegasque's dream of winning the World Championship in Ferrari red drives him forward."
    },
    carLink: '/cars/ferrari',
    carName: 'Ferrari SF-24',
    engine: 'Ferrari 066/13'
  };

  return <DriverProfile driver={driverData} />;
};

export default CharlesLeclerc;

