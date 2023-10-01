export interface CityModel {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: DistrictModel[];
}

export interface DistrictModel {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
  wards: WardModel[];
}

export interface WardModel {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  district_code: number;
}