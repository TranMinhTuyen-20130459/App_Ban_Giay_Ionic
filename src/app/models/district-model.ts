export interface CityData {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    phone_code: number;
    districts: DistrictData[];
  }
 export interface DistrictData {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    province_code: number;
    wards: Ward[];
  }
  
  export interface Ward {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    district_code: number;
  }