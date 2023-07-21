import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { Button } from '@mui/material';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useState } from 'react';
import { DrawEvents } from 'leaflet';
import { setLayer } from '../../api/mapLayer/requests';

export default function MapLayerCreater() {
  const [mapLayer, setMapLayer] = useState<Array<Array<number>>>([]);

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
      name: 'test2',
      mapLayerCoord: mapLayer,
    };
    const data = await setLayer(testLayer);
    console.log('response', data);
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
        <Button
          style={{ position: 'fixed', zIndex: 1000, bottom: '5%', left: '50%' }}
          variant="outlined"
          onClick={() => buttonHandler()}
        >
          Test
        </Button>
      </FeatureGroup>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
