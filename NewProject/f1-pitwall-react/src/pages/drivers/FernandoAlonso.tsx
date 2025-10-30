import React from 'react';
import DriverProfile from './DriverProfile';

const FernandoAlonso: React.FC = () => {
  const driverData = {
    name: 'Fernando Alonso',
    number: '14',
    team: 'Aston Martin Aramco',
    nationality: 'Spain',
    flag: '🇪🇸',
    image: '/assets/fernando alonso.png',
    badge: '2× WORLD CHAMPION',
    wins: 32,
    podiums: 106,
    poles: 22,
    championships: 2,
    gpStarts: 394,
    fastestLaps: 26,
    age: 43,
    careerYears: '2001 - 2024',
    season2024: {
      wins: 0,
      winRate: 0,
      poles: 0,
      poleRate: 0,
      podiums: 9,
      podiumRate: 38,
      points: 70,
      pointsRate: 13
    },
    biography: {
      intro: "Fernando Alonso is a living legend of Formula 1. A two-time World Champion who has raced across four different decades, Alonso's longevity and sustained competitiveness are unmatched. His racecraft, speed, and tactical brilliance have made him one of the sport's all-time greats.",
      achievement: "After winning back-to-back championships in 2005 and 2006 with Renault, Alonso has continued to showcase his exceptional abilities through stints at McLaren and Ferrari. His performances often transcended the capabilities of his machinery, earning legendary status among fans and peers alike.",
      current: "In 2024, racing for Aston Martin, Alonso continues to defy Father Time. His podium finishes and consistent point-scoring prove that age is just a number when combined with exceptional talent and dedication. Alonso's presence elevates Aston Martin's entire operation, and his hunger for a third World Championship burns as bright as ever."
    },
    carLink: '/cars/aston-martin',
    carName: 'Aston Martin AMR24',
    engine: 'Mercedes-AMG F1 M15 E Performance'
  };

  return <DriverProfile driver={driverData} />;
};

export default FernandoAlonso;

