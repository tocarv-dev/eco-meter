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
import { FaCheck } from "react-icons/fa6";

export default function Step({ step, segment }: StepProps) {

  const { getValues } = useAppFormContext();

  const page:number = getValues('page');

  let disabled:boolean = false,
  checked:boolean = false;

  if(page > step.number) checked = true;

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
              :
            checked
              ? 'bg-transparent text-light-green'
              : 'bg-transparent text-white border-white',
            'font-bold text-sm flex justify-center items-center'
          )}
        >
          { step.number === 1 && (checked ? <FaCheck size="1.4em" /> : <RiUser5Line size="1.5em" /> )}
          { step.number === 2 && (checked ? <FaCheck size="1.4em" /> : <TbHomeHeart size="1.5em" /> )}
          { step.number === 3 && (checked ? <FaCheck size="1.4em" /> : <IoCarOutline size="1.5em" /> )}
          { step.number === 4 && (checked ? <FaCheck size="1.4em" /> : <MdOutlineRestaurant size="1.5em" /> )}
          { step.number === 5 && (checked ? <FaCheck size="1.4em" /> : <FiTrash2 size="1.5em" /> )}
          { step.number === 6 && (checked ? <FaCheck size="1.4em" /> : <GiGreenhouse size="1.5em" /> )}
        </button>
        <div className="hidden lg:flex flex-col uppercase">
          <h3 className={clsx('font-normal text-[13px] text-cool-gray' )}>
            Passo {step.number}
          </h3>
          <h2
            className={clsx(
              'font-bold text-[14px] tracking-[0.1em]',
              checked ? 'text-light-green' : 'text-white'
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