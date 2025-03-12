import React from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import FileUploadComponent from './FileUploadComponent';
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";


const Map = ({position, locations}) => {
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    // alert(`Clicked at: ${lat}, ${lng}`);
  };

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100vh', width:'100vw' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((location)=>(
        <Marker key={location.id} 
        eventHandlers={{ click: (e) => console.log('marker clicked', e) }}
        position={[location.lat, location.lng]}>
        <Popup>
        <div>
            <FileUploadComponent msg={"on stand by"}/>
        </div>
        </Popup>
        </Marker>
      ))}
      <MapEventsHandler handleMapClick={handleMapClick} />
      <style>
        {`
        .leaflet-popup-content {
            margin: 0 !important;
            padding: 0 !important;
          }
        `}
      </style>
    </MapContainer>
  );
};

const MapEventsHandler = ({ handleMapClick }) => {
  useMapEvents({
    click: (e) => handleMapClick(e),
  });
  return null;
};

export default Map;