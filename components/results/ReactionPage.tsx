'use client';

import { useRouter } from 'next/navigation'
import clsx from 'clsx';

// Icons
import ResultActions from './ResultActions';
import Link from 'next/link';

import { RiEmotionLaughFill } from "react-icons/ri";
import { RiEmotionFill } from "react-icons/ri";
import { RiEmotionNormalFill } from "react-icons/ri";
import { RiEmotionUnhappyFill } from "react-icons/ri";
import { RiEmotionSadFill } from "react-icons/ri";
import Image from "next/image";
import { useState } from 'react';

interface ReactionPageProps {
  id: string,
}

export default function ReactionPageClient({ id }: ReactionPageProps) {
  const router = useRouter();
  const [selected, setSelected] = useState('');

  const nextPage = () => {
    if(!selected) return;
    router.push(`/results/${id}/tips`);
  }

  const handleSelect = (event: any) => {
    setSelected(event.target.value)
  }

  const reactions: {
    [key: string]: {
      name: 'glad' | 'happy' | 'good' | 'satisfied' | 'worried' | 'sad' ;
      icon: any;
      displayName: string
    };
  } = {
    glad: { name: 'glad', icon: RiEmotionLaughFill, displayName: "Motivado(a)"},
    happy: { name: 'happy', icon: RiEmotionFill, displayName: "Inspirado(a)"},
    satisfied: { name: 'satisfied', icon: RiEmotionNormalFill, displayName: "Envergonhado(a)"},
    worried: { name: 'worried', icon: RiEmotionUnhappyFill, displayName: "Preocupado(a)"},
    sad: { name: 'sad', icon: RiEmotionSadFill, displayName: "Chocado(a)"},
  };

  const Reactions = Object.values(reactions).map((reaction) => {
    const Icon = reaction.icon;
    return (
    <label
      key={reaction.name}
      className={clsx(
        'flex flex-col gap-x-4 items-center justify-center',
        'cursor-pointer px-4 py-4 lg:pt-5 border',
        'w-32 rounded-md transition-colors duration-300',
        selected === reaction.name
          ? 'border-dark-green bg-faint-green'
          : 'border-light-gray bg-transparent hover:border-mid-green hover:bg-white-green'
      )}
    >
      <Icon size="4em" className="fill-dark-green"/>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <span className="mt-4 text-sm font-semibold text-deep-green text-center">
            { reaction.displayName }
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-cool-gray">
            { " " }
          </span>
        </div>
        <input
          onClick={handleSelect}
          value={reaction.name}
          className="hidden"
        />
      </div>
    </label>
    )
  });

  return (
    <section className="flex flex-col justify-center items-center px-6 lg:px-[100px] py-20 lg:pt-12 lg:pb-4 w-full h-full">
        <div className="flex mt-5 lg:mt-6">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 sm:grid-cols-3">{Reactions}</div>
        </div>
        { selected && 
            <p className="mb-4 mt-4 text-base text-center text-deep-green font-medium tracking-wide">
              Para muitos de nós, a pegada de carbono é maior do que gostaríamos. A mudança social pode parecer assustadora, mas podemos fazer muito para mudar a trajetória atual. Pronto(a) para tentar?
            </p>
        }
      <ResultActions>
      { selected && 
      <div className="flex flex-row gap-x-4">
        <button
          type="button"
          className="mt-6 bg-dark-green transition duration-300 hover:opacity-80 text-magnolia px-[17px] lg:px-8 py-[10px] ml-auto lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
          onClick={nextPage}
        >
          Sim...
        </button>
        <button
        type="button"
        className="mt-6 ml-3 bg-dark-green transition duration-300 hover:opacity-80 text-magnolia px-[17px] lg:px-8 py-[10px] ml-auto lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
        onClick={nextPage}
        >
          Claro que sim! 
        </button>
        </div>
        ||
        <Link
        href={`/results/${id}/footprint`}
        className="text-cool-gray transition duration-300 hover:text-dark-green font-medium lg:font-bold text-sm lg:text-base mt-4 mr-4"
      >
        Anterior
      </Link>
      }
    </ResultActions>
    </section>
  );
}