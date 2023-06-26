export type IFlightInfo = {
  [key: string]: IFlightInfoData | number;
  full_count: number;
  version: number;
};

export type IFlightInfoData = [
  string,
  number,
  number,
  number,
  number,
  number,
  string,
  string,
  string,
  string,
  number,
  string,
  string,
  string,
  number,
  number,
  string,
  number,
  string,
  string?
];
