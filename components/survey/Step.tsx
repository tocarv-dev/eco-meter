'use client';

import useAppFormContext from '@/lib/hooks/useAppFormContext';
import clsx from 'clsx';

// Components
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TbHomeHeart } from "react-icons/tb";
import { RiUser5Line } from "react-icons/ri";
import { IoCarOutline} from "react-icons/io5";
import { MdOutlineRestaurant } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { GiGreenhouse } from "react-icons/gi";

export default function Step({ step, segment }: StepProps) {
  // const router = useRouter();

  // const { formState } = useAppFormContext();
  // const { isValid } = formState;

  // const validateStep = async (href: string) => {
  //   if (isValid) {
  //     router.push(href);
  //   }
  // };

  let disabled = false;

/*  let icons = (step: number) => {
    switch(step) {
      case 1: 
        <Home size={20}/>
      break;

      default: 
        step;
    }
  }*/

  return (
    <Link
    href={`/survey/${step.segment}`}
    className={disabled ? 'pointer-events-none': ''} 
    aria-disabled={disabled} 
    tabIndex={disabled ? -1 : undefined}
    >
      {/* <button type="button" onClick={() => validateStep(`/${step}`)}> */}
      <div className="flex items-center gap-4">
        <button
          className={clsx(
            'w-[33px] h-[33px] rounded-full border',
            'transition-colors duration-300',
            step.segment === segment
              ? 'bg-faint-green text-deep-green border-transparent'
              : 'bg-transparent text-white border-white',
            'font-bold text-sm flex justify-center items-center'
          )}
        >
          { step.number === 1 && <RiUser5Line size="1.5em" /> }
          { step.number === 2 && <TbHomeHeart size="1.5em" />}
          { step.number === 3 && <IoCarOutline size="1.5em" />}
          { step.number === 4 && <MdOutlineRestaurant size="1.5em" /> }
          { step.number === 5 && <FiTrash2 size="1.5em" /> }
          { step.number === 6 && <GiGreenhouse size="1.5em" /> }
        </button>
        <div className="hidden lg:flex flex-col uppercase">
          <h3 className={clsx('font-normal text-[13px] text-cool-gray')}>
            Passo {step.number}
          </h3>
          <h2
            className={clsx(
              'font-bold text-white text-[14px] tracking-[0.1em]'
            )}
          >
            {step.heading}
          </h2>
        </div>
      </div>
      {/* </button> */}
    </Link>
  );
}

interface StepProps {
  step: {
    number: number;
    segment: 'info' | 'home' | 'transportation' | 'food' | 'trash' | 'profile';
    heading: string;
  };
  segment: 'info' | 'home' | 'transportation' | 'food' | 'trash' | 'profile';
}