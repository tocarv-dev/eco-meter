export interface FormValues {
  gender: string;
  age: number;
  municipality: string;
  transports: string;
  veganMeals: number;
  redMeatMeals: number;
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