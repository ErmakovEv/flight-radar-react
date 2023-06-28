import L from 'leaflet';
import aircraftIcons from './airplane_icons.json';
import yellowSprite from '../img/t-sprite_c-yellow_w-30_s-yes.png';
import redSprite from '../img/t-sprite_c-red_w-30_s-yes.png';

interface IMarkerFrame {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface IMarkerFrames {
  [key: string]: IMarkerFrame;
}

interface IMarkerData {
  rotates: boolean;
  aliases: string[];
  frames: IMarkerFrames[];
}

const getIconDataByAircraft = (
  aircraftType: string,
  aircraftTrack: number
): IMarkerFrame => {
  const DEFAULT_ICAO = 'B738';
  const iconGroups = aircraftIcons.icons;
  const iconIcaos = Object.keys(iconGroups);
  let iconData: Partial<IMarkerData> = iconGroups[DEFAULT_ICAO];
  let frame: IMarkerFrame = {
    x: 0,
    y: 470,
    w: 27,
    h: 27,
  };

  // Match by ICAO
  if (iconIcaos.indexOf(aircraftType) !== -1) {
    iconData = iconGroups[aircraftType as keyof typeof iconGroups];
  } else {
    for (let i = 0; i < iconIcaos.length; i += 1) {
      const iconIcao: string = iconIcaos[i];
      const currentIcon: IMarkerData =
        iconGroups[iconIcao as keyof typeof iconGroups];
      if (currentIcon.aliases.indexOf(aircraftType) !== -1) {
        iconData = currentIcon;
      }
    }
  }

  // Match frame of sprite
  if (iconData.rotates) {
    if (iconData?.frames) {
      let currentAngle = 0;
      const minAngle = Math.floor(aircraftTrack / 15) * 15;
      if (aircraftTrack > minAngle + 7) {
        currentAngle = minAngle + 15;
      } else {
        currentAngle = minAngle;
      }
      if (currentAngle === 360) currentAngle = 0;
      frame = iconData?.frames[0][currentAngle.toString()];
    }
  }
  return frame;
};

const getIcon = (
  aircraftType: string,
  aircraftTrack: number,
  isSelected: boolean
) => {
  const frame = getIconDataByAircraft(aircraftType, aircraftTrack);
  return L.divIcon({
    html: `<div class="aircraft-icon" style="width:${
      frame.w ? frame.w : 0
    }px;height:${frame.h ? frame.h : 0}px;background:url(${
      isSelected ? redSprite : yellowSprite
    }) -${frame.x ? frame.x : 0}px -${frame.y ? frame.y : 0}px;"></div>`,
    iconSize: [frame.w ? frame.w : 0, frame.h ? frame.h : 0],
    popupAnchor: [0, frame.h / -2 || 0],
  });
};

export default getIcon;
