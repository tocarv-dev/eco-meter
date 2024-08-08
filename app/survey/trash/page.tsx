'use client';

import clsx from 'clsx';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import paperImage from '@/images/trash/paper.png';
import glassImage from '@/images/trash/glass.png';
import plasticImage from '@/images/trash/plastic.png';
import organicImage from '@/images/trash/organic.png';
import unsortedImage from '@/images/trash/unsorted.png';

// Icons
import { RxCross1 } from "react-icons/rx";

import FormWrapper from '@/components/survey/FormWrapper';
import FormActions from '@/components/survey/FormActions';
import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { FaPlus } from 'react-icons/fa6';

export default function TrashPage() {
  const router = useRouter();
  const { register, trigger, formState, watch, setValue, unregister } = useAppFormContext();
  const { isValid, errors } = formState;

  const [selectedValue, setSelectedValue] = useState<string>('paper');

  const setSelectedOption = (event: any) => {
    if(!selectedValue) return;

    console.log(selectedValue)
    register(`recycleBags.${selectedValue}.option`, { value: selectedValue });
    trigger('recycleBags')
  }

  const recycle = watch('recycle');
  const recycleBags = watch('recycleBags');

  const toogleRecycle = () => {
    if (recycle === true) {
      setValue('recycle', false);
    } else {
      setValue('recycle', true);
    }
  };

  const recycleOptions: {
    [key: string]: {
      name: 'paper' | 'glass' | 'plastic' | 'organic';
      displayName: string;
      imgSrc: StaticImageData;
      cssColor: string;
    };
  } = {
    paper: { name: 'paper', displayName: 'Papel', imgSrc: paperImage, cssColor: "paper-color" },
    glass: { name: 'glass', displayName: 'Vidro', imgSrc: glassImage, cssColor: "glass-color" },
    plastic: { name: 'plastic', displayName: 'Plástico', imgSrc: plasticImage, cssColor: "plastic-color" },
    organic: { name: 'organic', displayName: 'Orgânico', imgSrc: organicImage, cssColor: "organic-color" }
  };

  const RecycleOptions = Object.values(recycleOptions).map((item) => (
    <option value={item.name} key={item.name} > 
      {item.displayName}
    </option>
  ));

  const validateStep = async () => {
    await trigger();
    if (isValid) {
      setValue('page', 6);

      router.push('/survey/profile');
    }
  };

  return (
    <FormWrapper
      heading="Resíduos"
      description="A forma como lida com o lixo, desde a separação até à redução de desperdícios, pode reduzir significativamente o impacto ambiental"
    >
      <div className="w-full">
        <div className="flex flex-col w-full gap-4">
          <label className={clsx('flex flex-col mt-2')}>
            <div className="flex justify-between">
              <span className={clsx( 'text-xs text-deep-green lg:text-sm font-medium tracking-wide',) }>
                Quantos sacos produz de lixo indeferenciado em sua casa?
              </span>
                {errors.unsortedBags && (
                  <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                    { errors.unsortedBags.message }
                  </span>
                )}
            </div>
            <input
              type="number"
              placeholder="2"
              className={clsx(
                'border',
                errors.unsortedBags
                  ? 'border-strawberry-red'
                  : 'border-light-gray focus:border-purplish-blue',
                'py-1 px-3 rounded-[4px] lg:rounded-lg mt-1',
                'text-[15px] h-9 lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
                'focus:outline-none'
              )}
              {...register('unsortedBags', { valueAsNumber: true, required: 'Este campo é obrigatório' })}
              onBlur={() => trigger('unsortedBags')}
              min={1}
              autoComplete="unsortedBags"
            />
          </label>

          <div className="flex justify-start items-center gap-6 bg-alabaster mt-4 lg:mt-2 rounded-lg p-3 lg:p-4 bg-white-green">
            <label>
              <span className={clsx( 'text-sm lg:text-base font-bold transition duration-300',) }>
                Faz separação de resíduos?
              </span>
            </label>
            <span className="text-xs text-deep-green lg:text-sm font-light">
              Não
            </span>
            <button
            className={clsx(
              'h-[20px] w-[40px] rounded-full p-1 object-left',
              recycle === true ? 'justify-end bg-dark-green' : 'justify-start bg-cool-gray'
            )}
            onClick= {toogleRecycle}
            type="button"
          >
            <div className={clsx('h-full rounded-full aspect-square bg-white')} />
          </button>
            <span className="text-xs text-deep-green lg:text-sm font-light">
              Sim
            </span>
          </div>

          <label className={clsx('flex flex-col mt-2', recycle === true ? '' : 'hidden')}>
            <div className="flex justify-between">
              <span className="text-xs text-deep-green lg:text-sm font-medium tracking-wide">
                Especifique quais?
              </span>
              {errors.recycleBags && (
                <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                  {  }
                </span>
              )}
            </div>
            <div className="flex items-start">
              <select 
                className={clsx(
                  'border',
                  errors.recycleBags
                    ? 'border-strawberry-red'
                    : 'border-light-gray focus:border-purplish-blue',
                  'py-1 px-3 rounded-[4px] lg:rounded-lg mt-1',
                  'text-[15px] h-9 lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
                  'focus:outline-none w-full lg:w-64'
                )}
                onChange={(e) => setSelectedValue(e.target.value)}
                autoComplete="recycleBags"
              >
                {RecycleOptions}
              </select>
              <Button isIconOnly onClick={setSelectedOption} variant="bordered" className="ml-2 text-dark-green border-dark-green h-9 w-7 mt-1" aria-label="Add Option">
                <FaPlus />
              </Button>
            </div>
          </label>
        
          <div className="grid grid-cols-4 gap-y-2">
            { Object.keys(recycleBags || {}).length !== 0 && Object.values(recycleBags).map((s, index) => (
              <div className={clsx('justify-self-center capitalize', recycle === true ? '' : 'hidden')} key={index}>
                <span className="text-xs text-deep-green font-normal flex flex-row items-end">
                  <Image src={recycleOptions[s.option].imgSrc} alt="" className="mx-1 h-6 w-6" />
                  { recycleOptions[s.option].displayName }
                </span>
                <div className="flex flex-row">
                  <input
                    key={ s.option }
                    type="number"
                    placeholder="15"
                    className={clsx(
                      'border',
                      errors.recycleBags
                        ? 'border-strawberry-red'
                        : 'border-light-gray focus:border-purplish-blue',
                        'py-1 lg:py-2 px-2 lg:px-2 rounded-[4px] lg:rounded-lg mt-1',
                        'w-10 lg:w-20 h-9 text-[15px] text-deep-green placeholder:text-cool-gray font-medium',
                        'focus:outline-none'
                    )}
                    {...register(`recycleBags.${s.option}.value`, { valueAsNumber: true, required: 'Este campo é obrigatório', })}
                    onBlur={() => trigger('recycleBags')}
                    min={1}
                    autoComplete="recycleBags"
                  />
                  <button className="inline-block align-middle vertical-align ml-1" onClick={() => { unregister(`recycleBags.${s.option}`) }}>
                    <RxCross1 size={"1.3em"} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-fill justify-end text-xs">sacos de 20 litros por semana</div>
        </div>
      </div>
      <FormActions>
        <Link
          href="/survey/food"
          className="text-cool-gray transition duration-300 hover:text-dark-green font-medium lg:font-bold text-sm lg:text-base"
          onClick={(e) => setValue('page', 4)}
        >
          Anterior
        </Link>
        <button
          type="button"
          className="bg-dark-green transition duration-300 hover:opacity-80 text-magnolia ml-auto px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
          onClick={validateStep}
        >
          Próximo
        </button>
      </FormActions>
    </FormWrapper>
  );
}
