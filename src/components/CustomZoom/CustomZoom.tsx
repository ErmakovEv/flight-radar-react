import { useMap } from 'react-leaflet';
import { SpeedDial, Box, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { LatLngExpression } from 'leaflet';
import NavigationIcon from '@mui/icons-material/Navigation';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FlightIcon from '@mui/icons-material/Flight';
import './CustomZoom.css';

function CustomZoom({ home }: { home: number[] }) {
  const map = useMap();

  const actions = [
    {
      icon: (
        <NavigationIcon
          onClick={() => {
            map.setView(home as LatLngExpression);
          }}
          sx={{ color: 'primary.main' }}
        />
      ),
      name: 'Home',
    },
    {
      icon: (
        <RemoveCircleIcon
          sx={{ color: 'primary.main' }}
          onClick={() => map.zoomOut()}
        />
      ),
      name: 'Zoom Out',
    },
    {
      icon: (
        <AddCircleIcon
          sx={{ color: 'primary.main' }}
          onClick={() => map.zoomIn()}
        />
      ),
      name: 'Zoom In',
    },
  ];

  return (
    <div className="custom-zoom-container">
      <Box
        sx={{
          height: 320,
          transform: 'translateZ(0px)',
          flexGrow: 1,
          color: 'primary.main',
        }}
      >
        <SpeedDial
          FabProps={{
            className: 'SpeedDial',
            color: 'inherit',
            sx: {
              bgcolor: 'background.default',
            },
          }}
          ariaLabel="SpeedDial openIcon example"
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
          icon={<SpeedDialIcon openIcon={<FlightIcon />} />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              sx={{ color: 'secondary.dark' }}
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>
    </div>
  );
}

export default CustomZoom;
