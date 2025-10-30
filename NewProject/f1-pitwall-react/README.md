# F1 PITWALL - React Application

🏎️ **Complete Formula 1 Live Data & Championship Tracker**

A professional, feature-rich Formula 1 data platform built with React and TypeScript. This is a complete conversion of the original HTML site with ALL functionality preserved.

## ✨ Features

### 📊 **Live Race Data**
- Real-time race results with full classification
- Fastest lap analytics
- Pit stop statistics and analytics
- Race selector to view any 2024 race

### 📅 **Race Calendar**
- Complete 2024/2025 F1 season schedule
- Toggle between upcoming and previous races
- Interactive race cards with circuit information

### 🏆 **Championship Standings**
- Live driver standings
- Constructor championships
- Real-time API integration

### 👥 **Driver Profiles** (9 Complete Profiles)
1. Max Verstappen - Red Bull Racing
2. Lewis Hamilton - Mercedes-AMG Petronas
3. Lando Norris - McLaren Racing
4. Charles Leclerc - Scuderia Ferrari
5. Oscar Piastri - McLaren Racing
6. Sergio Pérez - Red Bull Racing
7. Carlos Sainz - Scuderia Ferrari
8. George Russell - Mercedes-AMG Petronas
9. Fernando Alonso - Aston Martin Aramco

Each profile includes:
- Career highlights and statistics
- 2024 season performance metrics
- Complete biography
- Current car specifications
- 3D image animations

### 🏎️ **Car Detail Pages** (5 Teams)
1. Red Bull RB20
2. Ferrari SF-24
3. McLaren MCL38
4. Mercedes W15
5. Aston Martin AMR24

Each car page features:
- Technical specifications
- Interactive 3D helmet model
- Performance analysis
- Complete engine and chassis details

### 🎨 **Design Features**
- Opening animation (plays once per session)
- Smooth scroll animations
- Interactive 3D models
- Responsive design
- Custom scrollbars
- Glass-morphism effects
- Dynamic gradients and animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd f1-pitwall-react

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx           # Main navigation
│   ├── Footer.tsx           # Site footer with links
│   └── OpeningAnimation.tsx # Session-based intro animation
├── pages/
│   ├── Home.tsx            # Homepage with driver grid
│   ├── RaceResults.tsx     # Live race results & analytics
│   ├── Calendar.tsx        # Race schedule
│   ├── Standings.tsx       # Championship standings
│   ├── DriversInfo.tsx     # All drivers grid
│   ├── Teams.tsx           # Teams overview
│   ├── Qualifying.tsx      # Qualifying results
│   ├── Comparison.tsx      # Driver comparison
│   ├── drivers/            # Individual driver profiles
│   │   ├── DriverProfile.tsx    # Reusable profile component
│   │   ├── MaxVerstappen.tsx
│   │   ├── LewisHamilton.tsx
│   │   └── ... (9 total)
│   └── cars/               # Car detail pages
│       ├── CarDetail.tsx        # Reusable car component
│       ├── RedBull.tsx
│       ├── Ferrari.tsx
│       └── ... (5 total)
├── styles.css              # Complete original CSS
├── App.tsx                 # Main app with routing
└── index.tsx               # Entry point
```

## 🔧 Technologies

- **React 18** - UI Framework
- **TypeScript** - Type safety
- **React Router** - Navigation
- **Axios** - API requests (ready for integration)
- **Model Viewer** - 3D model rendering
- **CSS3** - Advanced animations and effects

## 🌐 API Integration

The app integrates with multiple F1 data APIs:
- **Ergast F1 API** - Race results, standings, schedule
- **Jolpica F1 API** - Alternative data source
- **OpenF1 API** - Real-time data

## 📱 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Driver grid and site intro |
| `/race-results` | Race Results | Live race data with analytics |
| `/calendar` | Calendar | Full season schedule |
| `/standings` | Standings | Championship tables |
| `/drivers-info` | Drivers Info | All drivers overview |
| `/teams` | Teams | Team information |
| `/qualifying` | Qualifying | Qualifying results |
| `/comparison` | Comparison | Driver comparison tool |
| `/drivers/:name` | Driver Profile | Individual driver pages (9 drivers) |
| `/cars/:team` | Car Details | Team car specs (5 teams) |

## 🎯 Features Implemented

✅ Opening animation (sessionStorage-based)  
✅ Smooth scroll effects  
✅ API integration for live data  
✅ Race selector with auto-load  
✅ Driver avatar images  
✅ 3D model viewer  
✅ Responsive design  
✅ Newsletter signup form  
✅ Social media links  
✅ Complete footer  
✅ All navigation links  
✅ Professional UI/UX  

## 🔄 Data Accuracy

All driver statistics, career data, and car specifications are accurate as of the 2024 F1 season and match the original HTML site exactly.

## 📝 Notes

- Opening animation plays once per browser session
- All images and assets are served from `/public/assets/`
- The site is fully responsive across all devices
- All original HTML functionality has been preserved
- CSS is identical to the original HTML version

## 🏁 Development

This React conversion maintains 100% feature parity with the original HTML site while adding the benefits of:
- Component reusability
- Type safety with TypeScript
- Better code organization
- Easier maintenance and updates
- Modern development workflow

---

**Built with ❤️ for F1 fans worldwide** 🏎️🏁
