export interface FormValues {
  page: number;
  userid: String,
  gender: string;
  age: number;
  municipality: string;

  selectedTransports: string[];
  transports: {
    [index: string]: {
      option: string;
      distance: number;
    }
  };

  useFlights: boolean;

  hourFlights: number;
  shortFlights: number;
  mediumFlights: number;
  longFlights: number;

  meals: number[];
  veganMeals: number;
  redMeatMeals: number;
  whiteMeatMeals: number;

  recycleBags: {
    [index: string]: {
      option: string;
      value: number;
    }
  };
  unsortedBags: number;

  residents: number;
  electricitySpend: number;
  useGas: boolean;
  recycle: boolean;
  gasType: string;
  gasSpend: number;

  useWood: boolean;
  
  profile: 'profile_a' | 'profile_b' | 'profile_c' | 'profile_d'| 'profile_e';
}