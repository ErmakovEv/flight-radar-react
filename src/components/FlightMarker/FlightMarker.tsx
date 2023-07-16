import { useMap, Marker, Tooltip, Polyline } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import { IMarkerData } from '../Map/Map.type';

type FlightMarkerProps = {
  aircraft: [string, IMarkerData];
  handler: (id: string) => void;
  icon: DivIcon;
};

function FlightMarker({ aircraft, handler, icon }: FlightMarkerProps) {
  const map = useMap();

  return (
    <div>
      <Marker
        position={[aircraft[1].data[1] || 0, aircraft[1].data[2] || 0]}
        eventHandlers={{
          click: () => {
            if (!aircraft[1].isSelected)
              map.setView([aircraft[1].data[1] || 0, aircraft[1].data[2] || 0]);
            handler(aircraft[0]);
          },
        }}
        icon={icon}
      >
        <Tooltip>{aircraft[1].data[0]}</Tooltip>
      </Marker>
      {aircraft[1].trail ? <Polyline positions={aircraft[1].trail} /> : null}
    </div>
  );
}

export default FlightMarker;
