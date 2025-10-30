import React from 'react';
import DriverProfile from './DriverProfile';

const OscarPiastri: React.FC = () => {
  const driverData = {
    name: 'Oscar Piastri',
    number: '81',
    team: 'McLaren Racing',
    nationality: 'Australia',
    flag: '🇦🇺',
    image: '/assets/player5.jpg',
    badge: 'ROOKIE SENSATION',
    wins: 2,
    podiums: 10,
    poles: 0,
    championships: 0,
    gpStarts: 42,
    fastestLaps: 3,
    age: 23,
    careerYears: '2023 - 2024',
    season2024: {
      wins: 2,
      winRate: 8,
      poles: 0,
      poleRate: 0,
      podiums: 8,
      podiumRate: 33,
      points: 292,
      pointsRate: 56
    },
    biography: {
      intro: "Oscar Piastri represents the new generation of Formula 1 talent. The Australian driver dominated junior formulae with championships in Formula Renault, Formula 3, and Formula 2, earning his place in F1 through undeniable merit and exceptional performances.",
      achievement: "In just his second season in Formula 1, Piastri has already claimed multiple race victories, proving that his junior career success was no fluke. His composure under pressure and ability to learn quickly have impressed both fans and experts alike.",
      current: "Partnering with Lando Norris at McLaren, Piastri is part of one of F1's most exciting driver lineups. His mature approach to racing, combined with raw speed, makes him a driver to watch for years to come. As McLaren returns to competitiveness, Piastri is perfectly positioned to challenge for championships in the near future."
    },
    carLink: '/cars/mclaren',
    carName: 'McLaren MCL38',
    engine: 'Mercedes-AMG F1 M15 E Performance'
  };

  return <DriverProfile driver={driverData} />;
};

export default OscarPiastri;

