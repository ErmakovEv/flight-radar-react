import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { Button, TextField, Paper } from '@mui/material';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useState } from 'react';
import { DrawEvents } from 'leaflet';
import { setLayer } from '../../api/mapLayer/requests';
import CustomSnuckbar from '../CustomSnackbar/CustomSnackbar';

export default function MapLayerCreater() {
  const [mapLayer, setMapLayer] = useState<Array<Array<number>>>([]);
  const [nameLayer, setNameLayer] = useState<string>('');

  const [responseMessage, setResponseMessage] = useState<{
    type: 'info' | 'success' | 'error';
    message: string;
  }>({
    type: 'success',
    message: '',
  });
  const [openSnuckbar, setOpenSnuckbar] = useState(false);

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
    try {
      await setLayer(testLayer);
      setNameLayer('');
      setResponseMessage({
        type: 'success',
        message: `Все ок! Создан слой ${testLayer.name}`,
      });
      setOpenSnuckbar(true);
    } catch (error) {
      setResponseMessage({ type: 'error', message: 'Все плохо' });
      setOpenSnuckbar(true);
    }
  };

  return (
    <>
      {openSnuckbar ? (
        <CustomSnuckbar
          type={responseMessage.type}
          message={responseMessage.message}
          handleClose={() => setOpenSnuckbar(false)}
          isOpen={openSnuckbar}
        />
      ) : null}
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
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'background.default',
            position: 'fixed',
            bottom: '1%',
            left: '60%',
            width: '20%',
            transform: 'translate(-50%, -50%)',
            p: 1,
            zIndex: 1000,
          }}
          className="menu"
        >
          <div>
            <TextField
              id="outlined-basic"
              label="Layer name"
              variant="standard"
              onChange={(e) => setNameLayer(e.target.value)}
              value={nameLayer}
              sx={{ mb: 3 }}
            />
          </div>
          <div>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                color: 'black',
                backgroundColor: 'secondary.main',
              }}
              onClick={buttonHandler}
            >
              Create
            </Button>
          </div>
        </Paper>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
}
