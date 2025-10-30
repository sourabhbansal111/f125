import React from 'react';
import DriverProfile from './DriverProfile';

const SergioPerez: React.FC = () => {
  const driverData = {
    name: 'Sergio Pérez',
    number: '11',
    team: 'Red Bull Racing',
    nationality: 'Mexico',
    flag: '🇲🇽',
    image: '/assets/Sergio Pérez.png',
    badge: 'MEXICAN MINISTER OF DEFENSE',
    wins: 6,
    podiums: 39,
    poles: 3,
    championships: 0,
    gpStarts: 275,
    fastestLaps: 11,
    age: 34,
    careerYears: '2011 - 2024',
    season2024: {
      wins: 0,
      winRate: 0,
      poles: 0,
      poleRate: 0,
      podiums: 8,
      podiumRate: 33,
      points: 152,
      pointsRate: 29
    },
    biography: {
      intro: "Sergio 'Checo' Pérez has established himself as one of Formula 1's most experienced and capable drivers. Known for his exceptional tire management and defensive driving skills, Pérez has earned the nickname 'Mexican Minister of Defense' for his ability to hold off rivals.",
      achievement: "Throughout his career, Pérez has proven his worth with memorable victories and crucial podium finishes. His partnership with Max Verstappen at Red Bull Racing has been instrumental in the team's constructor championship successes, providing vital points and strategic support.",
      current: "In 2024, Pérez continues to play a crucial role in Red Bull's championship campaigns. His experience and racecraft remain invaluable assets to the team. As Mexico's most successful F1 driver, Pérez carries the hopes and dreams of an entire nation every time he takes to the track."
    },
    carLink: '/cars/red-bull',
    carName: 'Red Bull RB20',
    engine: 'Red Bull Powertrains RBPTH002'
  };

  return <DriverProfile driver={driverData} />;
};

export default SergioPerez;

