import React from 'react';
import DriverProfile from './DriverProfile';

const LandoNorris: React.FC = () => {
  const driverData = {
    name: 'Lando Norris',
    number: '4',
    team: 'McLaren Racing',
    nationality: 'Great Britain',
    flag: '🇬🇧',
    image: '/assets/player3.jpg',
    badge: 'RISING STAR',
    wins: 3,
    podiums: 23,
    poles: 5,
    championships: 0,
    gpStarts: 118,
    fastestLaps: 8,
    age: 25,
    careerYears: '2019 - 2024',
    season2024: {
      wins: 3,
      winRate: 13,
      poles: 4,
      poleRate: 17,
      podiums: 16,
      podiumRate: 67,
      points: 374,
      pointsRate: 72
    },
    biography: {
      intro: "Lando Norris has emerged as one of Formula 1's brightest young talents. Since joining McLaren in 2019, the British driver has consistently impressed with his speed, racecraft, and engaging personality that has won hearts around the world.",
      achievement: "The 2024 season has marked Norris's breakthrough into F1's elite tier. His first career victory showcased his maturity and ability to deliver under pressure. Now a regular podium finisher and pole position contender, Norris has established himself as a genuine championship threat.",
      current: "Behind the wheel of the McLaren MCL38, Norris combines blistering one-lap pace with exceptional race management. His partnership with McLaren continues to flourish, and with the team's resurgence, Norris is positioned to challenge for his first World Championship. His dedication to improvement and natural talent make him one of the sport's most exciting prospects."
    },
    carLink: '/cars/mclaren',
    carName: 'McLaren MCL38',
    engine: 'Mercedes-AMG F1 M15 E Performance'
  };

  return <DriverProfile driver={driverData} />;
};

export default LandoNorris;

