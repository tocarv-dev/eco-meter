'use client';

import clsx from 'clsx';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Slider } from "@nextui-org/slider";
import Image from 'next/image';
import { Controller } from 'react-hook-form'

// Icons
import checkmarkIcon from '@/images/icon-checkmark.svg';

import FormWrapper from '@/components/survey/FormWrapper';
import FormActions from '@/components/survey/FormActions';

export default function FoodPage() {
  const router = useRouter();
  const { control, trigger, formState, getValues, watch } = useAppFormContext();
  const { isValid, errors } = formState;

  const whiteMeals:number = watch('whiteMeatMeals'),
  redMeats:number = watch('redMeatMeals'),
  veganMeals:number = watch('veganMeals')

  const totalMeals = whiteMeals + redMeats + veganMeals;

  const validateTotalMeals = (value: number) => {
    const total = getValues('whiteMeatMeals') + getValues('redMeatMeals') + getValues('veganMeals');
    return total <= 14 || 'Não podes selecionar mais que 14 refeições';
  };

  const validateStep = async () => {
    await trigger();

    // console.log(whiteMeals, redMeats, veganMeals)

    /*
    const values = getValues();
    const totalMeals = values.whiteMeatMeals + values.redMeatMeals + values.veganMeals;

    if (totalMeals > 14) {
      alert("Não pode exceder um total de 14 refeições!");
      return;
    }
    */

    if (isValid) {
      router.push('/survey/trash');
    }
  };

  return (
    <FormWrapper
      heading="Alimentação"
      description="O tipo de dieta que segue e como os alimentos são produzidos e transportados têm um impacto considerável nas emissões de gases com efeito de estufa"
    >
      <div className="flex flex-col w-full gap-4 mt-6">
        <span className="capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide">
          Quantas refeições deste tipo faz por semana?  
        </span>
        <span className="capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide">
          Número total: { totalMeals }
        </span>
        <Controller
          name="whiteMeatMeals"
          control={control}
          defaultValue={7}
          rules={{ validate: validateTotalMeals }}
          render={({ field }) => (
            <Slider
            {...field}
            key="whiteMeatMeals"
            size="md"
            radius="md"
            step={1}
            getValue={(meals) => `${meals} of 14 Meals`}
            maxValue={14}
            minValue={0}
            defaultValue={7}
            aria-label="whiteMeat"
            classNames={{
              base: "max-w-md",
              filler: "bg-gradient-to-r from-dark-green to-dark-green",
              labelWrapper: "mb-2",
              label: "font-medium text-default-700 text-medium",
              value: "font-medium text-default-500 text-small",
              thumb: [
                "transition-size",
                "bg-dark-green",
                "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6"
              ],
              step: "bg-dark-green"
            }}
            label="Carnes brancas / peixe"
            />
          )}
        />

        <Controller
          name="redMeatMeals"
          control={control}
          defaultValue={7}
          rules={{ validate: validateTotalMeals }}
          render={({ field }) => (
            <Slider
            {...field}
            key="redMeat"
            size="md"
            radius="md"
            step={1}
            getValue={(meals) => `${meals} of 14 Meals`}
            maxValue={14}
            minValue={0}
            defaultValue={7}
            aria-label="meat"
            classNames={{
              base: "max-w-md",
              filler: "bg-gradient-to-r from-dark-green to-dark-green",
              labelWrapper: "mb-2",
              label: "font-medium text-default-700 text-medium",
              value: "font-medium text-default-500 text-small",
              thumb: [
                "transition-size",
                "bg-dark-green",
                "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6"
              ],
              step: "bg-dark-green"
            }}
            label="Carnes vermelhas"
            />
          )}
        />
        <Controller
          name="veganMeals"
          control={control}
          defaultValue={7}
          rules={{ validate: validateTotalMeals }}
          render={({ field }) => (
            <Slider
            {...field}
            key="vegan"
            size="md"
            radius="md"
            step={1}
            getValue={(meals) => `${meals} of 14 Meals`}
            maxValue={14}
            minValue={0}
            defaultValue={7}
            aria-label="meat"
            classNames={{
              base: "max-w-md",
              filler: "bg-gradient-to-r from-dark-green to-dark-green",
              labelWrapper: "mb-2",
              label: "font-medium text-default-700 text-medium",
              value: "font-medium text-default-500 text-small",
              thumb: [
                "transition-size",
                "bg-dark-green",
                "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6"
              ],
              step: "bg-dark-green"
            }}
            label="Veganas / Vegetarianas"
            />
          )}
        />

        {(errors.veganMeals || errors.redMeatMeals || errors.whiteMeatMeals) && (
          <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
            Não pode selecionar mais que 14 refeições
          </span>
        )}
        
      </div>
      <FormActions>
        <Link
          href="/survey/transportation"
          className="text-cool-gray transition duration-300 hover:text-dark-green font-medium lg:font-bold text-sm lg:text-base"
        >
          Anterior
        </Link>
        <button
          type="button"
          className="bg-dark-green transition duration-300 hover:opacity-80 text-magnolia ml-auto px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
          onClick={ validateStep }
        >
          Próximo
        </button>
      </FormActions>
    </FormWrapper>
  );
}
