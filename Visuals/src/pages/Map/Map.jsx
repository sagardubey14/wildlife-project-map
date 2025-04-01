import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import FileUploadComponent from './FileUploadComponent';
import L from 'leaflet';
import io from 'socket.io-client';


const blueIcon = L.icon({
  className: 'blue-icon',
  iconUrl:'/Marker/blueicon.png',
  iconSize: [25, 25],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

const redIcon = L.icon({
  className: 'red-icon',
  iconUrl:'/Marker/redicon.png',
  iconSize: [25, 25],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

const greenIcon = L.icon({
  className: 'green-icon',
  iconUrl:'/Marker/greenicon.png',
  iconSize: [25, 25],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

const locations = [
  { id: 1, lat: 19.1988, lng: 72.9207, name: "Data Source 1" },
  { id: 2, lat: 19.2346, lng: 72.8747, name: "Data Source 2" },
  { id: 3, lat: 19.1649, lng: 72.9054, name: "Data Source 3" },
  { id: 4, lat: 19.2554, lng: 72.9149, name: "Data Source 4" },
];


const Map = ({position}) => {

  const [status, setStatus ] = useState({
    1:{
      msg:"on stand by",
      type: "blue",
      loading:false,
    },
    2:{
      msg:"on stand by",
      type: "blue",
      loading:false,
    },
    3:{
      msg:"on stand by",
      type: "blue",
      loading:false,
    },
    4:{
      msg:"on stand by",
      type: "blue",
      loading:false,
    },
  });
  
  const [clickedMark, setClickedMark] = useState(null);
  const [socketInstance, setSocketInstance] = useState(null)

  const updateStatus = (dataArray) => {
    setStatus((prevStatus) => {
      
      const updatedStatus = { ...prevStatus };
  
      dataArray.forEach((entry) => {
        const { datasource, animal, time } = entry;
        updatedStatus[datasource] = {
          ...updatedStatus[datasource],
          msg: `Last seen ${animal} at ${time}`,
          type: "green",
        };
      });
  
      return updatedStatus;
    });
  };

  useEffect(()=>{
    const socket = io('https://socket-for-review.onrender.com',{
      query: {
        user:'map',
      }
    });
    setSocketInstance(socket)
    return(()=>{
      socket.disconnect();
    })
  },[])

  useEffect(()=>{
    if(!socketInstance) return;
    socketInstance.emit('start_interval');
    socketInstance.on('random_data',data=>{
      console.log(data);
      updateStatus(data)
    })
  },[socketInstance]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
  };

  return (
    <MapContainer center={position} zoom={13} style={{ height: '95vh', width:'100vw' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((location)=>(
        <Marker 
          key={location.id} 
          eventHandlers={{ click: (e) => {
            setClickedMark(location.id)
            console.log('marker clicked', e)
          } }}
          position={[location.lat, location.lng]}
          icon={
            status[location.id].type === 'blue' ? blueIcon : 
            status[location.id].type === 'red' ? redIcon : 
            greenIcon
          }
        >
        <Popup>
        <div>
            <FileUploadComponent 
              status={status} 
              clickedMark={clickedMark}
              setStatus={setStatus}
              socketInstance={socketInstance} 
              locations={locations}/>
              
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