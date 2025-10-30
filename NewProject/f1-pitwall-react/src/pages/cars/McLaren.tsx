import React from 'react';
import CarDetail from './CarDetail';

const McLaren: React.FC = () => {
  const carData = {
    name: 'McLaren MCL38',
    team: 'McLaren Racing',
    badge: '2024 SEASON',
    engine: 'Mercedes-AMG F1 M15 E Performance 1.6L V6 Turbo-Hybrid',
    ers: 'Mercedes-AMG High Performance Powertrains',
    weight: '798 kg minimum (with driver)',
    performanceNote: 'The MCL38 marks McLaren\'s resurgence to the front of the grid. Featuring an innovative floor design and optimized cooling package, the car excels in high-speed corners and shows exceptional tire management. McLaren\'s attention to detail has produced a package that challenges for victories and podiums consistently.'
  };

  return <CarDetail car={carData} />;
};

export default McLaren;

