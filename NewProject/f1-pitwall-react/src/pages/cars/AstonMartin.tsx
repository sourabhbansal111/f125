import React from 'react';
import CarDetail from './CarDetail';

const AstonMartin: React.FC = () => {
  const carData = {
    name: 'Aston Martin AMR24',
    team: 'Aston Martin Aramco',
    badge: '2024 SEASON',
    engine: 'Mercedes-AMG F1 M15 E Performance 1.6L V6 Turbo-Hybrid',
    ers: 'Mercedes-AMG High Performance Powertrains',
    weight: '798 kg minimum (with driver)',
    performanceNote: 'The AMR24 builds upon Aston Martin\'s impressive 2023 campaign. With refined aerodynamics and improved race pace, the car demonstrates strong competitiveness in the midfield battle. Aston Martin\'s aggressive development program and partnership with Mercedes power continues to yield impressive results as they establish themselves as consistent point scorers.'
  };

  return <CarDetail car={carData} />;
};

export default AstonMartin;

