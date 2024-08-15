'use client';

import { useRouter } from 'next/navigation'
import clsx from 'clsx';

// Icons
import ResultActions from './ResultActions';
import Link from 'next/link';

import { handleReaction } from '@/app/actions/handleReaction';

import { RiEmotionLaughFill } from "react-icons/ri";
import { RiEmotionFill } from "react-icons/ri";
import { RiEmotionNormalFill } from "react-icons/ri";
import { RiEmotionUnhappyFill } from "react-icons/ri";
import { RiEmotionSadFill } from "react-icons/ri";
import Image from "next/image";
import { useState, startTransition } from 'react';

import { useForm, SubmitHandler } from "react-hook-form"

interface Form {
  reaction: string
}

interface ReactionPageProps {
  id: string,
}

export default function ReactionPageClient({ id }: ReactionPageProps) {
  const router = useRouter();
  const [selected, setSelected] = useState('');

  const { register, handleSubmit, setValue, trigger,  watch } = useForm<Form>({
    defaultValues: {
      reaction: ''
    }
  });
  const onSubmit:SubmitHandler<Form> = async (data) => {
    const isValid = !!(data.reaction)

    if(isValid) {
      startTransition(() => {
        handleReaction(id, data.reaction).then((a) => {
          console.log(a);
          router.push(`/results/${id}/tips`);
        });
      });
    } else {
      return;
    }
  }

  const watchReaction = watch('reaction');

  const nextPage = () => {
    if(!selected) return;
    router.push(`/results/${id}/tips`);
  }

  const handleSelect = (value: string) => {
    setSelected(value);
    setValue('reaction', value);
    trigger('reaction');
  };

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
        watchReaction === reaction.name
          ? 'border-dark-green bg-faint-green'
          : 'border-light-gray bg-transparent hover:border-mid-green hover:bg-white-green'
      )}
      onClick={() => handleSelect(reaction.name)}
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
          value={reaction.name}
          className="hidden"
          {...register("reaction")}
        />
      </div>
    </label>
    )
  });

  return (
    <section className="flex flex-col justify-center items-center px-6 lg:px-[100px] py-20 lg:pt-12 lg:pb-4 w-full h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex -mt-6 lg:-mt-2">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 sm:grid-cols-3">{Reactions}</div>
        </div>
        { selected && 
            <p className="mb-4 mt-6 text-base text-center text-deep-green font-medium tracking-wide">
              Para muitos de nós, a pegada de carbono é maior do que gostaríamos. A mudança social pode parecer assustadora, mas podemos fazer muito para mudar a trajetória atual. Pronto(a) para tentar?
            </p>
        }
      <ResultActions>
      { selected && 
      <div className="flex flex-row mx-auto gap-x-4">
        <button
          type="submit"
          className="mt-6 bg-dark-green transition duration-300 hover:opacity-80 text-magnolia px-[17px] lg:px-8 py-[10px] ml-auto lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
          onClick={nextPage}
        >
          Sim...
        </button>
        <button
        type="submit"
        className="mt-6 ml-3 bg-dark-green transition duration-300 hover:opacity-80 text-magnolia px-[17px] lg:px-8 py-[10px] ml-auto lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
        onClick={nextPage}
        >
          Claro que sim!
        </button>
        </div>
        ||
        <Link
        href={`/results/${id}/overview`}
        className="text-cool-gray transition duration-300 hover:text-dark-green font-medium lg:font-bold text-sm lg:text-base mt-4 mr-4"
      >
        Anterior
      </Link>
      }
    </ResultActions>
      </form>
    </section>
  );
}