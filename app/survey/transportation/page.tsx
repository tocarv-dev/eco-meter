'use client';

import clsx from 'clsx';
import { useState } from 'react';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RxCross1 } from "react-icons/rx";

import FormWrapper from '@/components/survey/FormWrapper';
import FormActions from '@/components/survey/FormActions';

export default function TransportationPage() {
  const router = useRouter();
  const { register, unregister, trigger, formState, watch, setValue } = useAppFormContext();
  const { isValid, errors } = formState;

  const transports = watch('transports'),
  flights = watch('useFlights')

  const toogleFlights = () => {
    if (flights === true) {
      setValue('useFlights', false);
    } else {
      setValue('useFlights', true);
    }
  };

  const transportOptions: {
    [key: string]: {
      name: 'dieselCar' | 'gasCar' | 'hybridCar' | 'gplCar' | 'electricCar' | 'motorcycle' | 'taxi' | 'train' | 'urbanBus' | 'coachBus' | 'subway' | 'tram' | 'ferryFoot' | 'ferryCar';
      displayName: string;
    };
  } = {
    dieselCar: { name: 'dieselCar', displayName: 'Carro a propano' },
    gasCar: { name: 'gasCar', displayName: 'Carro a gasolina' },
    hybridCar: { name: 'hybridCar', displayName: 'Carro híbrido' },
    gplCar: { name: 'gplCar', displayName: 'Carro a GPL' },
    electricCar: { name: 'electricCar', displayName: 'Carro elétrico' },
    motorcycle: { name: 'motorcycle', displayName: 'Moto / Motorizada' },
    taxi: { name: 'taxi', displayName: 'Taxi' },
    train: { name: 'train', displayName: 'Comboio' },
    urbanBus: { name: 'urbanBus', displayName: 'Autocarro Urbano' },
    coachBus: { name: 'coachBus', displayName: 'Autocarro Coach' },
    subway: { name: 'subway', displayName: 'Metro' }, 
    tram: { name: 'tram', displayName: 'Carris' },
    ferryFoot: { name: 'ferryFoot', displayName: 'Ferry (peão)'},
    ferryCar: { name: 'ferryCar', displayName: 'Ferry (condutor)'}
  };

  const Transports = Object.values(transportOptions).map((item) => (
    <option value={item.name} key={item.name} > 
      {item.displayName}
    </option>
  ));

  const validateStep = async () => {
    await trigger();
    if (isValid) {
      router.push('/survey/food');
    }
  };

  return (
    <FormWrapper
      heading="Transportes"
      description="Os transportes têm um grande impacto na sua pegada de carbono, influenciando as suas emissões de CO2 diariamente"
    >
      <div className="flex flex-col w-full gap-4 mt-6">
        
      <label className="flex flex-col mt-4">
          <div className="flex justify-between">
            <span className="capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide">
              transportes
            </span>
            {errors.transports && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                {  }
              </span>
            )}
          </div>
          <select 
            className={clsx(
              'border',
              errors.transports
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            onChange={(e) => register(`transports.${e.target.value}.option`, { value: e.target.value })}
            onBlur={() => trigger('transports')}
            autoComplete="transports"
          >
            {Transports}
          </select>
        </label>
        <div className="flex flex-wrap">
          { Object.keys(transports || {}).length !== 0 && Object.values(transports).map((s, index) => (
            <div className="flex flex-col w-36" key={index}>
              <span className="capitalize text-xs text-deep-green lg:text-sm font-medium">
                { transportOptions[s.option].displayName }
              </span>
              <div>
                <input
                key={ s.option }
                type="number"
                placeholder="15"
                className={clsx(
                  'border',
                  errors.transports
                    ? 'border-strawberry-red'
                    : 'border-light-gray focus:border-purplish-blue',
                  'w-4/5 py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
                  'text-[15px] lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
                  'focus:outline-none'
                )}
                {...register(`transports.${s.option}.distance`, { valueAsNumber: true, required: 'Este campo é obrigatório', })}
                onBlur={() => trigger('transports')}
                min={1}
                autoComplete="transports"
              />
              <button className="inline-block align-middle vertical-align ml-1" onClick={() => { unregister(`transports.${s.option}`) }}>
              <RxCross1 size={"1.3em"} />
              </button>
            </div>
          </div>
          ))}
        </div>
        
        <div className="flex justify-start items-center gap-6 bg-alabaster mt-6 lg:mt-8 rounded-lg p-3 lg:p-4 bg-white-green">
          <label>
            <span className={clsx( 'text-sm lg:text-base font-bold transition duration-300',) }>
              Costumas viajar de avião?
            </span>
          </label>
          <button
            className={clsx(
              'h-[20px] w-[40px] rounded-full p-1 object-left',
              flights === true ? 'justify-end bg-dark-green' : 'justify-start bg-cool-gray'
            )}
            onClick= {toogleFlights}
            type="button"
          >
            <div className={clsx('h-full rounded-full aspect-square bg-white')} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2 mb-2">

        <label className={clsx('flex flex-col', flights === true ? '' : 'hidden')}>
          <div className="flex justify-between">
          <span className={clsx( 'capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide',) }>
            Até 1 hora:
          </span>
            {errors.hourFlights && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                { errors.hourFlights.message }
              </span>
            )}
          </div>
          <input
            type="number"
            placeholder="2"
            className={clsx(
              'border',
              errors.hourFlights
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('hourFlights', { valueAsNumber: true, required: flights ? 'Este campo é obrigatório' : false, })}
            onBlur={() => trigger('hourFlights')}
            min={1}
            autoComplete="hourFlights"
          />
        </label>

        <label className={clsx('flex flex-col', flights === true ? '' : 'hidden')}>
          <div className="flex justify-between">
          <span className={clsx( 'capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide',) }>
            De 1 a 3 horas:
          </span>
            {errors.shortFlights && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                { errors.shortFlights.message }
              </span>
            )}
          </div>
          <input
            type="number"
            placeholder="2"
            className={clsx(
              'border',
              errors.shortFlights
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('shortFlights', { valueAsNumber: true, required: flights ? 'Este campo é obrigatório' : false, })}
            onBlur={() => trigger('shortFlights')}
            min={1}
            autoComplete="shortFlights"
          />
        </label>

        <label className={clsx('flex flex-col', flights === true ? '' : 'hidden')}>
          <div className="flex justify-between">
          <span className={clsx( 'capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide',) }>
            De 3 a 6 horas:
          </span>
            {errors.mediumFlights && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                { errors.mediumFlights.message }
              </span>
            )}
          </div>
          <input
            type="number"
            placeholder="2"
            className={clsx(
              'border',
              errors.mediumFlights
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('mediumFlights', { valueAsNumber: true, required: flights ? 'Este campo é obrigatório' : false, })}
            onBlur={() => trigger('mediumFlights')}
            min={1}
            autoComplete="mediumFlights"
          />
        </label>

        <label className={clsx('flex flex-col', flights === true ? '' : 'hidden')}>
          <div className="flex justify-between">
          <span className={clsx( 'capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide',) }>
            Mais de 6 horas:
          </span>
            {errors.longFlights && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                { errors.longFlights.message }
              </span>
            )}
          </div>
          <input
            type="number"
            placeholder="2"
            className={clsx(
              'border',
              errors.longFlights
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('longFlights', { valueAsNumber: true, required: flights ? 'Este campo é obrigatório' : false, })}
            onBlur={() => trigger('longFlights')}
            min={1}
            autoComplete="longFlights"
          />
        </label>

        </div>  
        
      </div>

      <FormActions>
        <Link
          href="/survey/home"
          className="text-cool-gray transition duration-300 hover:text-dark-green font-medium lg:font-bold text-sm lg:text-base"
        >
          Anterior
        </Link>
        <button
          type="button"
          className="bg-dark-green hover:opacity-80 transition duration-300 text-magnolia ml-auto px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
          onClick={validateStep}
        >
          Próximo
        </button>
      </FormActions>
    </FormWrapper>
  );
}
