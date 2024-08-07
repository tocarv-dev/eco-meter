'use client';

import clsx from 'clsx';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Icons
import FormWrapper from '@/components/survey/FormWrapper';
import FormActions from '@/components/survey/FormActions';

export default function ResidencePage() {
  const router = useRouter();
  const { register, trigger, formState, watch, setValue } = useAppFormContext();
  
  const { isValid, errors } = formState;

  const usesGas = watch('useGas');
  const usesWood = watch('useWood');

  const validateStep = async () => {
    await trigger();
    if (isValid) {
      setValue('page', 3);

      router.push('/survey/transportation');
    }
  };

  const gastypes: {
    [key: string]: {
      name: 'propane' | 'bottle' | 'natural';
      displayName: string;
    };
  } = {
    propane: { name: 'propane', displayName: 'Propano' },
    bottle: { name: 'bottle', displayName: "Botija" },
    natural: { name: 'natural', displayName: "Natural" },
  };

  const GasOptions = Object.values(gastypes).map((g) => (
    <option value={g.name} key={g.name} > 
      {g.displayName}
    </option>
  ));

  const toggleUseGas = () => {
    if (usesGas === true) {
      setValue('useGas', false);
    } else {
      setValue('useGas', true);
    }
  };

  const toggleUseWood = () => {
    if (usesWood === true) {
      setValue('useWood', false);
    } else {
      setValue('useWood', true);
    }
  };

  return (
    <FormWrapper
      heading="Habitação"
      description="A habitação contribui significativamente para a sua pegada de carbono de acordo com a sua eficiência energética."
    >
      <div className="flex flex-col mt-6">
        <label className="flex flex-col">
          <div className="flex justify-between">
            <span className="text-xs text-deep-green lg:text-sm font-medium tracking-wide">
              Quantas pessoas moram em sua casa?
            </span>
            {errors.residents && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                { errors.residents.message}
              </span>
            )}
          </div>
          <input
            type="number"
            placeholder="2"
            className={clsx(
              'border',
              errors.residents
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-1 px-3 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] h-9 lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('residents', { valueAsNumber: true, required: 'Este campo é obrigatório', })}
            onBlur={() => trigger('residents')}
            min={1}
            autoComplete="residents"
          />
        </label>
        <label className="flex flex-col mt-3">
          <div className="flex justify-between">
            <span className="text-xs text-deep-green lg:text-sm font-medium tracking-wide">
              Qual o seu gasto mensal em electricidade?
            </span>
            {errors.electricitySpend && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                { errors.electricitySpend.message }
              </span>
            )}
          </div>
          <input
            type="number"
            placeholder="30"
            className={clsx(
              'border',
              errors.electricitySpend
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-1 px-3 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] h-9 lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('electricitySpend', { valueAsNumber: true, required: 'Este campo é obrigatório', })}
            onBlur={() => trigger('electricitySpend')}
            min={1}
            autoComplete="electricitySpend"
          />
        </label>
        <div className="flex justify-start items-center gap-6 bg-alabaster mt-6 lg:mt-8 rounded-lg p-3 lg:p-4 bg-white-green">
          <label>
            <span className={clsx( 'text-sm lg:text-base font-bold transition duration-300',) }>
              Utilizam gás em casa?
            </span>
          </label>

          <span className="text-xs text-deep-green lg:text-sm font-light">
            Não
          </span>
          <button
            className={clsx(
              'h-[20px] w-[40px] rounded-full p-1 object-left',
              usesGas === true ? 'justify-end bg-dark-green' : 'justify-start bg-cool-gray'
            )}
            onClick= {toggleUseGas}
            type="button"
          >
            <div className={clsx('h-full rounded-full aspect-square bg-white')} />
          </button>
          <span className="text-xs text-deep-green lg:text-sm font-light">
            Sim
          </span>

        </div>
        <label className={clsx('grid grid-cols-2 gap-2' , usesGas === true ? '' : 'hidden')} >
          <div className="col-span-2 justify-between">
            <span className="text-xs text-deep-green lg:text-sm font-medium tracking-wide">
              Que tipo de gás que utilizam e quanto gastam mensalmente?
            </span>
          </div>
          <select 
            className={clsx(
              'border',
              errors.gasType
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-1 px-3 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] h-9 lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            { ...register('gasType', {  required: usesGas ? 'Este campo é obrigatório' : false, }) }
            onChange={(e) => setValue('gasType', e.target.value)}
            onBlur={() => trigger('gasType')}
            autoComplete="gasType"
          >
            {GasOptions}
          </select>
          <input
            type="number"
            placeholder="30"
            className={clsx(
              'border',
              errors.gasSpend
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-1 px-3 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] h-9 lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('gasSpend', { valueAsNumber: true, required: usesGas ? 'Este campo é obrigatório' : false, })}
            onBlur={() => trigger('gasSpend')}
            min={1}
            autoComplete="gasSpend"
          />
        </label>
        <div className="flex justify-start items-center gap-6 bg-alabaster mt-6 lg:mt-8 rounded-lg p-3 lg:p-4 bg-white-green">
          <label>
            <span className={clsx(' text-sm lg:text-base font-bold transition duration-300',) }>
              Utilizam lenha em casa?
            </span>
          </label>
          <span className="text-xs text-deep-green lg:text-sm font-light">
            Não
          </span>
          <button
            className={clsx(
              'h-[20px] w-[40px] rounded-full p-1 object-left',
              usesWood === true ? 'justify-end bg-dark-green' : 'justify-start bg-cool-gray'
            )}
            onClick= {toggleUseWood}
            type="button"
          >
            <div className={clsx('h-full rounded-full aspect-square bg-white')} />
          </button>
          <span className="text-xs text-deep-green lg:text-sm font-light">
            Sim
          </span>
        </div>

      </div>
      {/* <div className="mt-auto flex justify-between items-center"> */}
      <FormActions>
        <Link
          href="/survey/info"
          className="text-cool-gray transition duration-300 hover:text-dark-green font-medium lg:font-bold text-sm lg:text-base"
          onClick={(e) => setValue('page', 1)}
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