// Mapa
////////////////////

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configuración de iconos de Leaflet
const Leaf = L as any
delete Leaf.Icon.Default.prototype._getIconUrl;
Leaf.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapComponentProps {
  lat: number;
  lng: number;
}

const Mapa: React.FC<MapComponentProps> = ({ lat, lng }) => {

    console.log("Actualizando mapa a " + lat + " y " + lng);
    
  return (
    <MapContainer center={[lat, lng]} zoom={12} style={{ height: '250px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]}>
        <Popup>Aquí están las coordenadas.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Mapa;
