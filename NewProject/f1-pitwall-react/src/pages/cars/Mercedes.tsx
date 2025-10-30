import React from 'react';
import CarDetail from './CarDetail';

const Mercedes: React.FC = () => {
  const carData = {
    name: 'Mercedes W15',
    team: 'Mercedes-AMG Petronas',
    badge: '2024 SEASON',
    engine: 'Mercedes-AMG F1 M15 E Performance 1.6L V6 Turbo-Hybrid',
    ers: 'Mercedes-AMG High Performance Powertrains',
    weight: '798 kg minimum (with driver)',
    performanceNote: 'The W15 represents Mercedes\' evolution from the ground-effect era challenges. With a refined aerodynamic concept and improved mechanical grip, the Silver Arrow shows competitive pace across various circuit types. Mercedes\' engineering excellence and relentless development push make the W15 a strong contender as the season progresses.'
  };

  return <CarDetail car={carData} />;
};

export default Mercedes;

