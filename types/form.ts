export interface FormValues {
  gender: string;
  age: number;
  municipality: string;
  plan: 'arcade' | 'advanced' | 'pro';
  billing: 'monthly' | 'yearly';
  addons: {
    online: boolean;
    storage: boolean;
    profile: boolean;
  };
}
