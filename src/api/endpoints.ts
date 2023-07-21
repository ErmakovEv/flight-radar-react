const Endpoints = {
  AUTH: {
    LOGIN: 'http://127.0.0.1:3000/api/user/login',
    REFRECH: 'http://127.0.0.1:3000/api/user/refresh',
    LOGOUT: 'http://127.0.0.1:3000/api/user/logout',
    PROFILE: 'http://127.0.0.1:3000/api/setting/get-config',
    SETPROFILE: 'http://127.0.0.1:3000/api/setting/',
  },
  PROXY: {
    FLIGHTS: 'http://127.0.0.1:3000/api/proxy/flights',
    ALLAIRPORTS: 'http://127.0.0.1:3000/api/proxy/all-airports',
    AIRPORT: 'http://127.0.0.1:3000/api/proxy/airport',
    FLIGHTSTATUS: 'http://127.0.0.1:3000/api/proxy/flight-status',
    SHEDULE: 'http://127.0.0.1:3000/api/proxy/shedule',
  },
  MAPLAYER: {
    LAYER: 'http://127.0.0.1:3000/api/layer',
  },
};

export default Endpoints;
