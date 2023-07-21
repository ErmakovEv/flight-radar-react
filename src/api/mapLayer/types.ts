export default interface ILayerRes {
  id?: number;
  name: string;
  mapLayerCoord: Array<Array<number>> | Array<Array<Array<string>>>;
}

export interface ILayerReq {
  id: number;
  name: string;
  mapLayerCoord: Array<Array<Array<string>>>;
}
