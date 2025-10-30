import React from 'react';
import DriverProfile from './DriverProfile';

const MaxVerstappen: React.FC = () => {
  const driverData = {
    name: 'Max Verstappen',
    number: '1',
    team: 'Red Bull Racing',
    nationality: 'Netherlands',
    flag: '🇳🇱',
    image: '/assets/players1.png',
    badge: '3× WORLD CHAMPION',
    wins: 62,
    podiums: 111,
    poles: 40,
    championships: 3,
    gpStarts: 195,
    fastestLaps: 33,
    age: 27,
    careerYears: '2015 - 2024',
    season2024: {
      wins: 9,
      winRate: 38,
      poles: 9,
      poleRate: 38,
      podiums: 18,
      podiumRate: 75,
      points: 437,
      pointsRate: 85
    },
    biography: {
      intro: "Max Verstappen burst onto the Formula 1 scene in 2015 as the youngest driver ever to compete in the championship. From his very first race, it was clear that this young Dutchman possessed extraordinary talent and fearlessness that would reshape the sport's future.",
      achievement: "His meteoric rise culminated in an unforgettable 2021 championship battle with Lewis Hamilton, where Verstappen claimed his first world title in one of the most dramatic season finales in F1 history. He followed this with dominant championship victories in 2022 and 2023, breaking numerous records along the way, including the most wins in a single season.",
      current: "In 2024, Verstappen continues to showcase why he's considered one of the greatest drivers of his generation. His precision, race craft, and ability to extract maximum performance from his Red Bull RB20 have made him a formidable force on every circuit. Beyond the statistics, it's his unwavering commitment to excellence and his ability to perform under pressure that truly sets him apart."
    },
    carLink: '/cars/red-bull',
    carName: 'Red Bull RB20',
    engine: 'Red Bull Powertrains RBPTH002'
  };

  return <DriverProfile driver={driverData} />;
};

export default MaxVerstappen;

