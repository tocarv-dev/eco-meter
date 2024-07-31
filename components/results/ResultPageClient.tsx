// app/result/[id]/ResultPageClient.tsx
'use client';

import Image from 'next/image';
import thankYouIcon from '@/images/icon-thank-you.svg';
import { Surveys } from '@/types/surveys';

import { } from '@/lib/calc/calcs';

interface ResultPageClientProps {
  survey: Surveys,
}

export default function ResultPageClient({ survey }: ResultPageClientProps) {
  
    
  return (
    <section className="flex flex-col justify-center bg-white lg:bg-transparent items-center px-6 lg:px-[100px] py-20 lg:pt-12 lg:pb-4 w-full h-full rounded-lg lg:rounded-none shadow-lg lg:shadow-none">
      <Image src={thankYouIcon} alt="" className="w-[125px] lg:w-[250px] lg:h-auto" />
      <h1 className="text-2xl lg:text-[32px] font-bold text-dark-green mt-6">
        Obrigado!
      </h1>
      <p>{survey.id}</p>
      <p className="text-cool-gray text-center mt-2">
        Quer monitorizar o histórico da sua pegada de carbono? Registe-se no nosso site para poder aceder
        ao seu espaço pessoal, onde poderá consultar os seus cálculos históricos e ver o progresso nesta 
        joranda para um COOLER WORLD! 
      </p>
    </section>
  );
}
