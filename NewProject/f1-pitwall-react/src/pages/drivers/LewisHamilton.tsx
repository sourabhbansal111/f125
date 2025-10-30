import React from 'react';
import DriverProfile from './DriverProfile';

const LewisHamilton: React.FC = () => {
  const driverData = {
    name: 'Lewis Hamilton',
    number: '44',
    team: 'Mercedes-AMG Petronas',
    nationality: 'Great Britain',
    flag: '🇬🇧',
    image: '/assets/player2.jpg',
    badge: '7× WORLD CHAMPION',
    wins: 105,
    podiums: 201,
    poles: 104,
    championships: 7,
    gpStarts: 344,
    fastestLaps: 67,
    age: 39,
    careerYears: '2007 - 2024',
    season2024: {
      wins: 2,
      winRate: 8,
      poles: 1,
      poleRate: 4,
      podiums: 5,
      podiumRate: 21,
      points: 223,
      pointsRate: 42
    },
    biography: {
      intro: "Lewis Hamilton stands as one of the greatest Formula 1 drivers of all time. Since his spectacular debut season in 2007, Hamilton has redefined excellence in motorsport, combining raw speed with strategic brilliance and unwavering determination.",
      achievement: "With seven World Championships equaling Michael Schumacher's record, Hamilton has shattered nearly every major F1 record. He holds the records for most wins (105), most pole positions (104), and most podium finishes (201). His consistency and longevity at the highest level are unprecedented.",
      current: "In 2024, racing for Mercedes, Hamilton continues to showcase the skill and racecraft that have made him a legend. Beyond racing, his advocacy for diversity, sustainability, and social justice has transformed him into a global icon, using his platform to drive positive change in motorsport and beyond."
    },
    carLink: '/cars/mercedes',
    carName: 'Mercedes W15',
    engine: 'Mercedes-AMG F1 M15 E Performance'
  };

  return <DriverProfile driver={driverData} />;
};

export default LewisHamilton;

