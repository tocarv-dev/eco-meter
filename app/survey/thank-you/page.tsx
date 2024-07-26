'use client';

import Image from 'next/image';
// Icons
import thankYouIcon from '@/images/icon-thank-you.svg';

export default function ThankYouPage() {
  return (
    <section className="flex flex-col justify-center bg-white lg:bg-transparent items-center px-6 lg:px-[100px] py-20 lg:pt-12 lg:pb-4 w-full h-full rounded-lg lg:rounded-none shadow-lg lg:shadow-none">
      {/* <section className="flex flex-col px-6 lg:px-[100px] pt-7 lg:pt-12 pb-8 lg:pb-4 w-full h-full bg-white lg:bg-transparent rounded-lg lg:rounded-none shadow-lg lg:shadow-none"> */}
      <Image src={thankYouIcon} alt="" className="w-[125px] lg:w-[250px] lg:h-auto" />
      <h1 className="text-2xl lg:text-[32px] font-bold text-dark-green mt-6">
        Obrigado!
      </h1>
      <p className="text-cool-gray text-center mt-2">
        Monitoriza a sua pegada de carbono calculando-a regularmente para que a possa melhorar. Podes-te registar 
        no nosso site para consultar os teus cálculos e ver o progresso nesta joranda para um COOLER WORLD!
      </p>
    </section>
  );
}
