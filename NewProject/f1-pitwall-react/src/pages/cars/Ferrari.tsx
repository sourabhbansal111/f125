import React from 'react';
import CarDetail from './CarDetail';

const Ferrari: React.FC = () => {
  const carData = {
    name: 'Ferrari SF-24',
    team: 'Scuderia Ferrari',
    badge: '2024 SEASON',
    engine: 'Ferrari 066/13 1.6L V6 Turbo-Hybrid',
    ers: 'Ferrari',
    weight: '798 kg minimum (with driver)',
    performanceNote: 'The SF-24 represents Ferrari\'s latest evolution in their quest to return to championship glory. With refined aerodynamics and improved power unit efficiency, the SF-24 shows strong race pace and consistency. The Prancing Horse continues to push the boundaries of innovation while maintaining their legendary racing heritage.'
  };

  return <CarDetail car={carData} />;
};

export default Ferrari;

