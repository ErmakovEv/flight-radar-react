import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { Button, TextField, Paper } from '@mui/material';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useState } from 'react';
import { DrawEvents } from 'leaflet';
import { setLayer } from '../../api/mapLayer/requests';

export default function MapLayerCreater() {
  const [mapLayer, setMapLayer] = useState<Array<Array<number>>>([]);
  const [nameLayer, setNameLayer] = useState<string>('');

  const onCreateDraw = (e: DrawEvents.Created) => {
    const { layer } = e;
    const polygon = layer.toGeoJSON();
    setMapLayer(polygon.geometry.coordinates);
  };
  const onEditedDraw = (e: DrawEvents.Edited) => {
    console.log(e);
  };
  const onDeletedDraw = (e: DrawEvents.Deleted) => {
    console.log(e);
  };

  const buttonHandler = async () => {
    const testLayer = {
      name: nameLayer,
      mapLayerCoord: mapLayer,
    };
    await setLayer(testLayer);
    setNameLayer('');
  };

  return (
    <MapContainer
      center={[59.799774, 30.273036]}
      zoom={12}
      scrollWheelZoom={false}
      // zoomControl={false}
    >
      <FeatureGroup>
        <EditControl
          position="bottomleft"
          onCreated={onCreateDraw}
          onEdited={onEditedDraw}
          onDeleted={onDeletedDraw}
          draw={{
            rectangle: false,
            polyline: false,
            circle: false,
            circlemarker: false,
            marker: false,
          }}
        />
      </FeatureGroup>
      <Paper
        sx={{
          maxWidth: '100%',
          display: 'flex',
          backgroundColor: 'var(--main-bg-color)',
          position: 'fixed',
          bottom: '5%',
          left: '60%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
        }}
        className="menu"
      >
        <TextField
          id="outlined-basic"
          label="Layer name"
          variant="standard"
          onChange={(e) => setNameLayer(e.target.value)}
          value={nameLayer}
        />
        <Button onClick={() => buttonHandler()}>Create</Button>
      </Paper>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
