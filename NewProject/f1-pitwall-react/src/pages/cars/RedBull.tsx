import React from 'react';
import CarDetail from './CarDetail';

const RedBull: React.FC = () => {
  const carData = {
    name: 'Red Bull RB20',
    team: 'Red Bull Racing',
    badge: '2024 SEASON',
    engine: 'Red Bull Powertrains RBPTH002 1.6L V6 Turbo-Hybrid',
    ers: 'Red Bull Powertrains',
    weight: '798 kg minimum (with driver)',
    performanceNote: 'The RB20 is an evolution of the dominant RB19, featuring innovative sidepod and cooling solutions. Its primary strength lies in its exceptional aerodynamic efficiency and low-degradation on long runs, making it a formidable competitor in both qualifying and race conditions.'
  };

  return <CarDetail car={carData} />;
};

export default RedBull;

