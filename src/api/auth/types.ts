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

export interface IUserRes {
  id: number;
  email: string;
  role: string;
  profile?: {
    createdAt: string;
    updatedAt: string;
    geoPos: string;
    id: number;
    mapType: number;
    userId: number;
  };
}

export interface IRegReq {
  email: string;
  password: string;
  role: string;
}
