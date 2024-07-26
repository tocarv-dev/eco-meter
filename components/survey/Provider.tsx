'use client';

import useAppForm from '@/lib/hooks/useAppForm';
import { SubmitHandler, FormProvider } from 'react-hook-form';
// Types
import { FormValues } from '@/types/form';
import { useRouter } from 'next/navigation';

import { saveForm } from '@/app/actions/save-form';

export default function Provider({ children }: FormProviderProps) {
  const route = useRouter();

  const methods = useAppForm({
    gender: '',
    municipality: '',
    useGas: false,
    gasType: '',
    useWood: false,
    residents: undefined,
    electricitySpend: undefined,
    redMeatMeals: undefined,
    veganMeals: undefined,
    unsortedBags: undefined,
    paperBags: undefined,
    plasticBags: undefined,
    glassBags: undefined,
    organicBags: undefined, 
    profile: undefined
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const isValid = !!(
      data.gender &&
      data.age &&
      data.municipality &&
      data.residents &&
      data.electricitySpend &&
      data.whiteMeatMeals &&
      data.redMeatMeals &&
      data.veganMeals &&
      data.unsortedBags &&
      data.paperBags &&
      data.plasticBags &&
      data.glassBags &&
      data.organicBags &&
      data.profile
    );

    if (isValid) {
      let saveData = data;
      
      saveData.userid = '1';

      saveForm(saveData);

      route.push('/survey/thank-you');
    } else {
      if(!data.gender || !data.age || !data.municipality) {
        route.replace('/survey/info');
      } else if(!data.residents || !data.electricitySpend) {
        route.replace('/survey/home');
      } else if(!data.whiteMeatMeals || !data.redMeatMeals || !data.veganMeals) {
        route.replace('/survey/food');
      } else if(!data.unsortedBags || !data.paperBags || !data.plasticBags || !data.organicBags) {
        route.replace('/survey/trash');
      } else if(!data.profile) {
        route.replace('/survey/profile');
      } else {
        route.replace('/survey/transportation');
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex w-full">
        {children}
      </form>
    </FormProvider>
  );
}

interface FormProviderProps {
  children: React.ReactNode;
}
