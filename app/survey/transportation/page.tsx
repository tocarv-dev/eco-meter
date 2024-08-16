'use client';

import clsx from 'clsx';
import { useState } from 'react';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { RxCross1 } from "react-icons/rx";
import { Button } from "@nextui-org/react";

// Icons
import carImage from '@/images/transport/car.png';
import motorcycleImage from '@/images/transport/motorcycle.png';
import subwayImage from '@/images/transport/subway.png';
import taxiImage from '@/images/transport/taxi.png';
import trainImage from '@/images/transport/train.png';
import tramImage from '@/images/transport/tram.png';
import busImage from '@/images/transport/urban_bus.png';
import coachImage from '@/images/transport/coach_bus.png';
import ferryCarImage from '@/images/transport/ferry_car.png';
import ferryPersonImage from '@/images/transport/ferry_people.png';
import { FaPlus } from "react-icons/fa6";

import FormWrapper from '@/components/survey/FormWrapper';
import FormActions from '@/components/survey/FormActions';

export default function TransportationPage() {
  const router = useRouter();
  const { register, unregister, trigger, formState, watch, setValue } = useAppFormContext();
  const { isValid, errors } = formState;

  const [selectedValue, setSelectedValue] = useState<string>('gasCar');

  const setSelectedOption = (event: any) => {
    if(!selectedValue) return;

    console.log(selectedValue)
    register(`transports.${selectedValue}.option`, { value: selectedValue });
    trigger('transports')
  }

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
      shortName: string;
      imgSrc: StaticImageData;
    };
  } = {
    gasCar: { name: 'gasCar', displayName: 'Carro a gasolina / diesel', shortName: 'gasolina', imgSrc: carImage },
    hybridCar: { name: 'hybridCar', displayName: 'Carro híbrido', shortName: 'híbrido', imgSrc: carImage },
    electricCar: { name: 'electricCar', displayName: 'Carro elétrico', shortName: 'elétrico', imgSrc: carImage },
    gplCar: { name: 'gplCar', displayName: 'Carro a GPL', shortName: 'GPL', imgSrc: carImage },
    dieselCar: { name: 'dieselCar', displayName: 'Carro a propano', shortName: 'propano', imgSrc: carImage },
    motorcycle: { name: 'motorcycle', displayName: 'Moto / Motorizada', shortName: 'moto', imgSrc: motorcycleImage },
    urbanBus: { name: 'urbanBus', displayName: 'Autocarro Urbano', shortName: 'urbano', imgSrc: busImage },
    train: { name: 'train', displayName: 'Comboio', shortName: 'comboio', imgSrc: trainImage },
    subway: { name: 'subway', displayName: 'Metro', shortName: 'metro', imgSrc: subwayImage }, 
    tram: { name: 'tram', displayName: 'Carris', shortName: 'carris', imgSrc: tramImage },
    taxi: { name: 'taxi', displayName: 'Taxi', shortName: 'taxi', imgSrc: taxiImage },
    ferryFoot: { name: 'ferryFoot', displayName: 'Ferry (peão)', shortName: 'peão', imgSrc: ferryPersonImage },
    ferryCar: { name: 'ferryCar', displayName: 'Ferry (condutor)', shortName: 'condutor', imgSrc: ferryCarImage },
    coachBus: { name: 'coachBus', displayName: 'Autocarro Coach', shortName: 'coach', imgSrc: coachImage }
  };

  const Transports = Object.values(transportOptions).map((item) => (
    <option value={item.name} key={item.name} > 
      {item.displayName}
    </option>
  ));

  const validateStep = async () => {
    await trigger();
    if (isValid) {
      setValue('page', 4);

      router.push('/survey/food');
    }
  };

  return (
    <FormWrapper
      heading="Transportes"
      description="Os transportes têm um grande impacto na sua pegada de carbono, influenciando as suas emissões de CO2 diariamente"
    >
      <span className="text-xs text-deep-green lg:text-sm font-normal tracking-wide">
        Adicione os vários tipos de transportes que utiliza habitualmente e a quantidade de kms semanais que faz em média em cada um deles
      </span>
      <div className="flex flex-col w-full gap-4 mt-2">
        <label className="flex flex-col">
          <div className="flex justify-between">
            {errors.transports && (
              <span className="text-xs lg:text-sm font-medium tracking-wide text-strawberry-red">
                {  }
              </span>
            )}
          </div>
          <div className="flex items-start">
          <select
            defaultValue={"0"}
            className={clsx(
              'border',
              errors.transports
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-1 px-3 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] h-9 lg:text-base text-deep-green placeholder:text-cool-gray font-medium',
              'focus:outline-none w-full lg:w-64'
            )}
            autoComplete="transports"
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            {Transports}
          </select>
          <Button isIconOnly onClick={setSelectedOption} variant="bordered" className="ml-2 text-dark-green border-dark-green h-9 w-7 mt-1" aria-label="Add Option">
            <FaPlus />
          </Button>
          </div>
        </label>

        <div className="grid grid-cols-3 gap-y-2">
          { Object.keys(transports || {}).length !== 0 && Object.values(transports).map((s, index) => {
            const transportOption = transportOptions[s.option];

            if (!transportOption) {
              console.log(s);
              return null; 
            }

            return(
              <div className="justify-self-center" key={index}>
                <span className="text-xs text-deep-green font-normal flex flex-row items-end capitalize">
                  <Image src={transportOptions[s.option].imgSrc} alt="" className="mx-1 h-6 w-6" />
                  { transportOptions[s.option].shortName }
                </span> 
                <div className="flex flex-row">
                  <input
                    key={ s.option }
                    type="number"
                    placeholder="15"
                    className={clsx(
                      'border',
                      errors.transports
                        ? 'border-strawberry-red'
                        : 'border-light-gray focus:border-purplish-blue',
                      'py-1 lg:py-2 px-2 lg:px-2 rounded-[4px] lg:rounded-lg mt-1',
                      'w-12 lg:w-20 h-9 text-[15px] text-deep-green placeholder:text-cool-gray font-medium',
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
            )
          })}
        </div>
        <div className="flex justify-start items-center mt-3">
          <label>
            <span className={clsx('text-xs text-deep-green lg:text-sm font-normal tracking-wide transition duration-300',) }>
              Viaja habitualmente de avião?
            </span>
          </label>
          <span className="flex gap-2 ml-5">
            <span className="text-xs text-deep-green lg:text-sm font-light">Não</span>
            <button
              className={clsx('flex',
                'h-[20px] w-[40px] rounded-full p-1 object-left',
                flights === true ? 'justify-end bg-dark-green' : 'justify-start bg-cool-gray'
              )}
              onClick= {toogleFlights}
              type="button"
            >
              <div className={clsx('h-full rounded-full aspect-square bg-white')} />
            </button>
            <span className="text-xs text-deep-green lg:text-sm font-light">Sim</span>
          </span>
        </div>
        <span className={clsx('text-xs text-deep-green lg:text-sm font-normal tracking-wide transition duration-300', flights === true ? '' : 'hidden') }>
          Quantos vôos com estas durações faz por ano. Indique 0 caso não faça vôos dessas durações
        </span>
        <div className="grid grid-cols-4 gap-4 mb-2">
          <label className={clsx('flex flex-col', flights === true ? '' : 'hidden')}>
            <div className="flex justify-between">
              <span className={clsx( 'text-xs text-deep-green lg:text-sm font-medium tracking-wide',) }>
                { '< 1 hora:' }
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
                'py-1 lg:py-2 px-2 lg:px-2 rounded-[4px] lg:rounded-lg mt-1',
                'w-12 lg:w-20 h-9 text-[15px] text-deep-green placeholder:text-cool-gray font-medium',
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
            <span className={clsx( 'text-xs text-deep-green lg:text-sm font-medium tracking-wide',) }>
            { '1 a 3 horas:' }
            </span>
              {errors.shortFlights && (
                <span className="text-xs lg:text-sm font-medium tracking-wide text-strawberry-red">
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
                'py-1 lg:py-2 px-2 lg:px-2 rounded-[4px] lg:rounded-lg mt-1',
                'w-12 lg:w-20 h-9 text-[15px] text-deep-green placeholder:text-cool-gray font-medium',
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
            <span className={clsx( 'text-xs text-deep-green lg:text-sm font-medium tracking-wide',) }>
              { '3 a 6 horas:' }
            </span>
              {errors.mediumFlights && (
                <span className="text-xs lg:text-sm font-medium tracking-wide text-strawberry-red">
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
                'py-1 lg:py-2 px-2 lg:px-2 rounded-[4px] lg:rounded-lg mt-1',
                'w-12 lg:w-20 h-9 text-[15px] text-deep-green placeholder:text-cool-gray font-medium',
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
            <span className={clsx( 'text-xs text-deep-green lg:text-sm font-medium tracking-wide',) }>
              { '6> horas:' }
            </span>
              {errors.longFlights && (
                <span className="text-xs lg:text-sm font-medium tracking-wide text-strawberry-red">
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
                'py-1 lg:py-2 px-2 lg:px-2 rounded-[4px] lg:rounded-lg mt-1',
                'w-12 lg:w-20 h-9 text-[15px] text-deep-green placeholder:text-cool-gray font-medium',
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
          className="text-cool-gray transition duration-300 hover:text-dark-green font-medium text-sm lg:text-base"
          onClick={(e) => setValue('page', 2)}
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
