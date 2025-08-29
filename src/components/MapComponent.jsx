// File: src/components/MapComponent.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icons (otherwise broken in many setups)
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

export default function MapComponent() {
  return (
    <MapContainer
      center={[25.276987, 55.296249]}
      zoom={12}
      style={{ height: '400px', width: '100%', borderRadius: '12px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <Marker position={[25.276987, 55.296249]}>
        <Popup>📍 Dubai Center</Popup>
      </Marker>
    </MapContainer>
  );
}
