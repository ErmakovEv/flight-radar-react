const HOST = `https://serverflightradar.onrender.com`;

const Endpoints = {
  AUTH: {
    LOGIN: `${HOST}/api/user/login`,
    REFRECH: `${HOST}/api/user/refresh`,
    LOGOUT: `${HOST}/api/user/logout`,
    PROFILE: `${HOST}/api/setting/get-config`,
    ALLPROFILES: `${HOST}/api/user/`,
    SETPROFILE: `${HOST}/api/setting/`,
    REGISTRATION: `${HOST}/api/user/reg`,
  },
  PROXY: {
    FLIGHTS: `${HOST}/api/proxy/flights`,
    ALLAIRPORTS: `${HOST}/api/proxy/all-airports`,
    AIRPORT: `${HOST}/api/proxy/airport`,
    FLIGHTSTATUS: `${HOST}/api/proxy/flight-status`,
    SHEDULE: `${HOST}/api/proxy/shedule`,
  },
  MAPLAYER: {
    LAYER: `${HOST}/api/layer`,
    DELLAYERS: `${HOST}/api/layer/del`,
  },
};

export default Endpoints;
