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
      data.meals &&
      /*
      data.unsortedBags &&
      data.paperBags &&
      data.plasticBags &&
      data.glassBags &&
      data.organicBags &&
      */
      data.profile
    );
    /*
          (data.recycle && (
          data.unsortedBags &&
          data.paperBags &&
          data.plasticBags &&
          data.glassBags &&
          data.organicBags
        )
      ) &&
    */
    if (isValid) {
      let saveData = data;
      
      saveData.userid = '1';

      saveData.whiteMeatMeals = data.meals[1] - data.meals[0] 
      saveData.redMeatMeals = (14 - data.meals[1])
      saveData.veganMeals = data.meals[0]

      saveForm(saveData).then(id => {
        console.log(id);
        setFormCookies(id);
      })

      route.push('/survey/thank-you');
    } else {
      if(!data.gender || !data.age || !data.municipality) {
        route.replace('/survey/info');
      } else if(!data.residents || !data.electricitySpend) {
        route.replace('/survey/home');
      } else if(!data.meals) {
        route.replace('/survey/food');
      } else if(data.recycle && (!data.unsortedBags || !data.paperBags || !data.plasticBags || !data.organicBags)) {
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
