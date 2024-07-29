'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

// Components
import Image from 'next/image';
import Step from './Step';
// Images
import bgSidebarDesktop from '@/images/bg-sidebar-desktop.svg';
import bgSidebarMobile from '@/images/bg-sidebar-mobile.svg';

export default function SurveySidebar() {

  const segment = useSelectedLayoutSegment() as
    | 'info'
    | 'home'
    | 'transportation'
    | 'food'
    | 'trash'
    | 'profile';

  const steps: {
    number: number;
    segment: 'info' | 'home' | 'transportation' | 'food' | 'trash' | 'profile';
    heading: string;
  }[] = [
    {
      number: 1,
      segment: 'info',
      heading: 'Informação',
    },
    {
      number: 2,
      segment: 'home',
      heading: 'Habitação',
    },
    {
      number: 3,
      segment: 'transportation',
      heading: 'Transporte',
    },
    {
      number: 4,
      segment: 'food',
      heading: 'Alimentação',
    },
    {
      number: 5,
      segment: 'trash',
      heading: 'Resíduos',
    },
    {
      number: 6,
      segment: 'profile',
      heading: 'Perfil',
    },
  ];

  const Steps = steps.map((step) => (
    
    <Step
    key={step.number}
    step={step}
    segment={segment}
    />
  ));

  return (
    <div className="relative shrink-0">
      <div className="lg:absolute lg:inset-0 lg:px-8 py-8 lg:py-10 flex flex-row justify-center lg:justify-stretch lg:flex-col gap-4 lg:gap-6">
        {Steps}
      </div>
      <Image
        src={bgSidebarDesktop}
        alt=""
        priority
        className="hidden lg:block -z-10"
      />
      <Image
        src={bgSidebarMobile}
        alt=""
        priority
        className="lg:hidden w-full h-full fixed top-0 inset-x-0 -z-10 max-h-[172px] object-cover object-center"
      />
    </div>
  );
}
