'use client';

import clsx from 'clsx';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Icons
import { RxCross1 } from "react-icons/rx";

import FormWrapper from '@/components/survey/FormWrapper';
import FormActions from '@/components/survey/FormActions';

export default function TrashPage() {
  const router = useRouter();
  const { register, trigger, formState, watch, setValue, unregister } = useAppFormContext();
  const { isValid, errors } = formState;

  const recycle = watch('recycle'),
  recycleBags = watch('recycleBags');

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
    };
  } = {
    paper: { name: 'paper', displayName: 'Papel' },
    glass: { name: 'glass', displayName: 'Vidro' },
    plastic: { name: 'plastic', displayName: 'Plástico' },
    organic: { name: 'organic', displayName: 'Orgânico'}
  };

  const RecycleOptions = Object.values(recycleOptions).map((item) => (
    <option value={item.name} key={item.name} > 
      {item.displayName}
    </option>
  ));

  const validateStep = async () => {
    await trigger();
    if (isValid) {
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
          <span className={clsx( 'capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide',) }>
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
              Fazes separação de resíduos?
            </span>
          </label>
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
        </div>

        <label className={clsx('flex flex-col mt-2', recycle === true ? '' : 'hidden')}>
          <div className="flex justify-between">
            <span className="capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide">
              Quais dos seguintes resíduos faz separação?
            </span>
            {errors.recycleBags && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                {  }
              </span>
            )}
          </div>
          <select 
            className={clsx(
              'border',
              errors.recycleBags
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-1 px-3 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] h-9 lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            onChange={(e) => {register(`recycleBags.${e.target.value}.option`, { value: e.target.value }); trigger('recycleBags')}}
            onBlur={() => trigger('recycleBags')}
            autoComplete="recycleBags"
          >
            {RecycleOptions}
          </select>
        </label>
      
      <div className="grid grid-cols-2 gap-4">
          { Object.keys(recycleBags || {}).length !== 0 && Object.values(recycleBags).map((s, index) => (
          <div className={clsx('flex flex-col', recycle === true ? '' : 'hidden')} key={index}>
            <span className="capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide">
              Quantos sacos de { s.option} { recycleOptions[s.option].displayName } produz?
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
                    'w-40 lg:w-40 h-9 text-[15px] text-deep-green placeholder:text-cool-gray font-medium',
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
      </div>
      </div>
      <FormActions>
        <Link
          href="/survey/food"
          className="text-cool-gray transition duration-300 hover:text-dark-green font-medium lg:font-bold text-sm lg:text-base"
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
