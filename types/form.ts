export interface FormValues {
  userid: String,
  gender: string;
  age: number;
  municipality: string;
  transports: {
    [index: string]: {
      option: string;
      distance: number;
    }
  };
  veganMeals: number;
  redMeatMeals: number;
  whiteMeatMeals: number;
  unsortedBags: number;
  paperBags: number;
  plasticBags: number;
  glassBags: number;
  organicBags: number;
  residents: number;
  electricitySpend: number;
  useGas: boolean;
  gasType: string;
  gasSpend: number;
  useWood: boolean;
  profile: 'profile_a' | 'profile_b' | 'profile_c';
}