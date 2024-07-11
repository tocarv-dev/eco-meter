export interface FormValues {
  gender: string;
  age: number;
  municipality: string;
  residents: number;
  electricitySpend: number;
  useGas: boolean;
  gasType: string;
  gasSpend: number;
  useWood: boolean;
  plan: 'arcade' | 'advanced' | 'pro';
  billing: 'monthly' | 'yearly';
  addons: {
    online: boolean;
    storage: boolean;
    profile: boolean;
  };
}
