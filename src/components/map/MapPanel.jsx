// File: src/components/appHome/MapPanel.jsx
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './MapPanel.module.css';

const MapPanel = ({ schools, isOpen }) => {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || !schools.length) return;

    const map = L.map(mapRef.current, {
      center: [25.2, 55.25],
      zoom: 11,
      scrollWheelZoom: false,
    });

    leafletMapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    schools.forEach((school) => {
      try {
        const { latitude, longitude } = JSON.parse(school.geolocation);
        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup(`<b>${school.name}</b><br>${school.location}`);
      } catch (err) {
        console.warn('Invalid geolocation for school:', school.name);
      }
    });

    // Enable scroll zoom only on hover
    const container = mapRef.current;
    const enableScroll = () => map.scrollWheelZoom.enable();
    const disableScroll = () => map.scrollWheelZoom.disable();

    container.addEventListener('mouseenter', enableScroll);
    container.addEventListener('mouseleave', disableScroll);

    // Cleanup on unmount
    return () => {
      container.removeEventListener('mouseenter', enableScroll);
      container.removeEventListener('mouseleave', disableScroll);
      map.remove();
    };
  }, [schools]);

  return (
    <div className={`${styles.mapPanel} ${isOpen ? styles.open : ''}`}>
      <div ref={mapRef} className={styles.mapContainer}></div>
    </div>
  );
};

export default MapPanel;
