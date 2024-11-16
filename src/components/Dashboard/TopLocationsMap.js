import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const customIcon = new L.Icon({
  iconUrl: '/assets/marker.png',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
});

const TopLocationsMap = ({ locations }) => {
  const bounds = L.latLngBounds(locations.map(location => location.coordinates));

  return (
    <div className="bg-light-background dark:bg-dark-background shadow-md rounded-lg p-6 m-4">
      <h2 className="text-2xl font-bold mb-4">Top Locations This Month</h2>
      <MapContainer bounds={bounds} style={{ height: '350px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {locations.map((location, index) => (
          <Marker key={index} position={location.coordinates} icon={customIcon}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TopLocationsMap;

