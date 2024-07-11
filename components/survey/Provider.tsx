'use client';

import useAppForm from '@/lib/hooks/useAppForm';
import { SubmitHandler, FormProvider } from 'react-hook-form';
// Types
import { FormValues } from '@/types/form';
import { useRouter } from 'next/navigation';

export default function Provider({ children }: FormProviderProps) {
  const route = useRouter();

  const methods = useAppForm({
    gender: '',
    age: 25,
    municipality: '',
    residents: 2,
    electricitySpend: 30,
    useGas: false,
    gasType: '',
    gasSpend: 30,
    useWood: false,
    plan: 'arcade',
    billing: 'monthly',
    addons: {
      online: false,
      storage: false,
      profile: false,
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const isValid = !!(data.gender && data.age && data.municipality);

    if (isValid) {
      route.push('/survey/thank-you');
    } else {
      route.replace('/survey/info');
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
