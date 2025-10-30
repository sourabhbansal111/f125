import React, { useEffect } from 'react';
import './CarDetail.css';

interface CarData {
  name: string;
  team: string;
  badge: string;
  engine: string;
  ers: string;
  weight: string;
  performanceNote: string;
}

interface CarDetailProps {
  car: CarData;
}

const CarDetail: React.FC<CarDetailProps> = ({ car }) => {
  useEffect(() => {
    // Load model-viewer script
    const script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
    script.type = 'module';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="car-details-page">
      <div className="car-info">
        <div className="car-badge">{car.badge}</div>
        <h1 className="car-title">{car.name}</h1>
        <div className="team-logo">🏎️ {car.team}</div>
        
        <div className="specs-section">
          <h2 className="specs-title">
            <span className="title-icon">⚙️</span>
            Technical Specifications
          </h2>
          <div className="specs-grid">
            <div className="spec-card">
              <div className="spec-icon">🏗️</div>
              <div className="spec-label">Chassis</div>
              <div className="spec-value">Carbon fibre composite monocoque</div>
            </div>
            <div className="spec-card">
              <div className="spec-icon">🔥</div>
              <div className="spec-label">Engine</div>
              <div className="spec-value">{car.engine}</div>
            </div>
            <div className="spec-card">
              <div className="spec-icon">⚡</div>
              <div className="spec-label">ERS</div>
              <div className="spec-value">{car.ers}</div>
            </div>
            <div className="spec-card">
              <div className="spec-icon">🔩</div>
              <div className="spec-label">Suspension</div>
              <div className="spec-value">Push-rod (F) / Pull-rod (R)</div>
            </div>
            <div className="spec-card">
              <div className="spec-icon">⚖️</div>
              <div className="spec-label">Weight</div>
              <div className="spec-value">{car.weight}</div>
            </div>
            <div className="spec-card">
              <div className="spec-icon">🛞</div>
              <div className="spec-label">Tires</div>
              <div className="spec-value">Pirelli P Zero / Cinturato</div>
            </div>
          </div>
        </div>

        <div className="performance-section">
          <h2 className="specs-title">
            <span className="title-icon">🏁</span>
            Performance Notes
          </h2>
          <p className="performance-text">{car.performanceNote}</p>
        </div>
      </div>

      <div className="car-3d-viewer">
        <div className="viewer-header">
          <div className="viewer-badge">INTERACTIVE 3D MODEL</div>
          <h3 className="viewer-title">F1 Racing Helmet</h3>
          <p className="viewer-subtitle">Explore Every Detail in 360°</p>
        </div>
        
        {/* @ts-ignore */}
        <model-viewer 
          src="https://modelviewer.dev/shared-assets/models/glTF-Sample-Assets/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb"
          alt="F1 Racing Helmet"
          camera-controls
          auto-rotate
          auto-rotate-delay="0"
          rotation-per-second="30deg"
          shadow-intensity="1"
          environment-image="neutral"
          exposure="1"
          camera-orbit="auto auto auto"
          min-camera-orbit="auto auto auto"
          max-camera-orbit="auto auto auto"
          style={{
            width: '100%',
            height: '500px',
            background: 'transparent',
            display: 'block'
          }}>
        {/* @ts-ignore */}
        </model-viewer>
        
        <div className="viewer-controls">
          <div className="control-item">
            <span className="control-icon">🖱️</span>
            <span className="control-text">Drag to Rotate</span>
          </div>
          <div className="control-item">
            <span className="control-icon">🔍</span>
            <span className="control-text">Scroll to Zoom</span>
          </div>
          <div className="control-item">
            <span className="control-icon">🔄</span>
            <span className="control-text">Auto-Rotating</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;

