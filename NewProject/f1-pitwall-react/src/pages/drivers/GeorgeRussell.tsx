import React from 'react';
import DriverProfile from './DriverProfile';

const GeorgeRussell: React.FC = () => {
  const driverData = {
    name: 'George Russell',
    number: '63',
    team: 'Mercedes-AMG Petronas',
    nationality: 'Great Britain',
    flag: '🇬🇧',
    image: '/assets/George Russell.png',
    badge: 'FUTURE CHAMPION',
    wins: 2,
    podiums: 13,
    poles: 3,
    championships: 0,
    gpStarts: 114,
    fastestLaps: 7,
    age: 26,
    careerYears: '2019 - 2024',
    season2024: {
      wins: 2,
      winRate: 8,
      poles: 2,
      poleRate: 8,
      podiums: 8,
      podiumRate: 33,
      points: 245,
      pointsRate: 47
    },
    biography: {
      intro: "George Russell represents Mercedes' future. After serving an apprenticeship at Williams, Russell joined the Silver Arrows in 2022, stepping into the massive shoes left by Valtteri Bottas. His smooth driving style and analytical approach have made him a perfect fit for Mercedes.",
      achievement: "Russell's victory in Brazil 2022 for his first F1 win was followed by more success, proving he has what it takes to win at the highest level. His qualifying performances have been particularly impressive, often putting the car higher than expected on the grid.",
      current: "In 2024, Russell continues to lead Mercedes' charge back to the front of the grid. Partnering with Lewis Hamilton provides the perfect learning environment as he develops into a future World Champion. His technical knowledge, combined with his on-track speed, makes him one of F1's most promising talents."
    },
    carLink: '/cars/mercedes',
    carName: 'Mercedes W15',
    engine: 'Mercedes-AMG F1 M15 E Performance'
  };

  return <DriverProfile driver={driverData} />;
};

export default GeorgeRussell;

