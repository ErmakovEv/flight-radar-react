export interface ILoginReq {
  email: string;
  password: string;
}

export interface ILoginRes {
  accessToken: string;
}

export interface IProfileRes {
  email: string;
  role: string;
  mapType?: number;
  geoPos?: string;
}

export interface ISettingsRes {
  mapType: number;
  pos: string;
}
