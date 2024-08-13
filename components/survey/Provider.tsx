'use client';

import useAppForm from '@/lib/hooks/useAppForm';
import { SubmitHandler, FormProvider } from 'react-hook-form';
// Types
import { FormValues } from '@/types/form';
import { useRouter } from 'next/navigation';

import { saveForm, setFormCookies } from '@/app/actions/save-form';

export default function Provider({ children }: FormProviderProps) {
  const route = useRouter();

  const methods = useAppForm({
    page: 1,
    gender: '',
    municipality: '',
    useGas: false,
    gasType: '',
    useWood: false,
    residents: undefined,
    electricitySpend: undefined,
    transports: {},
    meals: [2, 12],
    recycle: false,
    recycleBags: {},
    profile: undefined,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const isValid = !!( // !! - Assegurar que o resultado é boolean
      data.gender &&
      data.age &&
      data.municipality &&
      data.residents &&
      data.electricitySpend &&
      data.meals &&
      data.unsortedBags && 
      data.profile
    );

    if (isValid) {
      let saveData = data;
      
      saveData.userid = '1';

      saveData.whiteMeatMeals = data.meals[1] - data.meals[0] 
      saveData.veganMeals = (14 - data.meals[1])
      saveData.redMeatMeals = data.meals[0]

      saveForm(saveData).then(id => {
        console.log(id);
        setFormCookies(id);
        route.push(`/results/${id}/profile?form=true`);
      })
    } else {
      if(!data.gender || !data.age || !data.municipality) {
        route.replace('/survey/info');
      } else if(!data.residents || !data.electricitySpend) {
        route.replace('/survey/home');
      } else if(!data.meals) {
        route.replace('/survey/food');
      } else if(!data.unsortedBags) {
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
