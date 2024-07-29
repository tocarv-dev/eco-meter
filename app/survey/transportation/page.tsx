'use client';

import clsx from 'clsx';
import { useState } from 'react';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { RxCross1 } from "react-icons/rx";

// Icons
import checkmarkIcon from '@/images/icon-checkmark.svg';

import FormWrapper from '@/components/survey/FormWrapper';
import FormActions from '@/components/survey/FormActions';

export default function TransportationPage() {
  const router = useRouter();
  const { register, unregister, trigger, formState, watch, setValue } = useAppFormContext();
  const { isValid, errors } = formState;

  const [selected, setSelected]: any[] = useState([]);

  const addSelection = ((option: any) => {
    setSelected((prev: any) => {
      const optionIndex = prev.findIndex((item: any) => item.option === option);
      if (optionIndex > -1) {
        unregister(`transports.${option}`)
        return prev.filter((item: any) => item.option !== option);
      } else {
        register(`transports.${option}.option`, { value: option })
        return [...prev, { option, distance: '' }];
      }
    });
  })

  const transportOptions: {
    [key: string]: {
      name: 'dieselCar' | 'gasCar' | 'hybridCar' | 'gplCar' | 'electricCar' | 'motorcycle' | 'taxi' | 'train' | 'bus' | 'subway' | 'tram' | 'ferryFoot' | 'ferryCar';
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
    bus: { name: 'bus', displayName: 'Autocarro' },
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
            onChange={(e) => addSelection(e.target.value)}
            onBlur={() => trigger('transports')}
            autoComplete="transports"
          >
            {Transports}
          </select>
        </label>
        <div className="flex flex-wrap">
        { selected.length > 0 && selected.map((s:any, index: any) => {
          return (
            <div className="flex flex-col w-36" key={index}>
              <span className="capitalize text-xs text-deep-green lg:text-sm font-medium">
                { transportOptions[s.option].displayName }
              </span>
              <div>
                <input
                key={ s.option }
                type="number"
                placeholder="30"
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
              <button className="inline-block align-middle vertical-align ml-1" onClick={() => { addSelection(s.option) }}>
              <RxCross1 size={"1.3em"} />
              </button>
            </div>
          </div>
          )
        })}
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
