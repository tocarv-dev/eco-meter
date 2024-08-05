'use client';

import clsx from 'clsx';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Slider } from "@nextui-org/slider";
import Image from 'next/image';
import { Controller } from 'react-hook-form'
import redMeatImage from '@/images/food/red_meat.png';
import veganImage from '@/images/food/vegan.png';
import whiteMeatFishImage from '@/images/food/fish_white_meat.png';

// Icons
import checkmarkIcon from '@/images/icon-checkmark.svg';

import FormWrapper from '@/components/survey/FormWrapper';
import FormActions from '@/components/survey/FormActions';

export default function FoodPage() {
  const router = useRouter();
  const { control, trigger, formState, getValues, watch, setValue } = useAppFormContext();
  const { isValid, errors } = formState;

  const meals:number[] = watch('meals')

  const validateStep = async () => {
    await trigger();

    if (isValid) {
      setValue('page', 5);
      
      router.push('/survey/trash');
    }
  };

  return (
    <FormWrapper
      heading="Alimentação"
      description="O tipo de dieta que segue e como os alimentos são produzidos e transportados têm um impacto considerável nas emissões de gases com efeito de estufa"
    >
      <div className="flex flex-col w-full gap-4 mt-6">
        <span className="text-xs text-deep-green lg:text-sm font-medium tracking-wide">
          Quantas refeições deste tipo faz por semana?  
        </span>
        <Controller
          name="meals"
          control={control}
          defaultValue={[2, 12]}
          rules={{}}
          render={({ field }) => (
            <Slider
            {...field}
            key="meals"
            size="md"
            radius="md"
            showTooltip={true}
            step={1}
            getValue={() => `Vegan`}
            maxValue={14}
            minValue={0}
            startContent={ <div className="flex flex-col justify-center text-xs text-center"><Image src={redMeatImage} alt="" className="w-16 lg:w-16" /><span>Carnes Vermelhas</span></div> }
            endContent={<div className="flex flex-col justify-start text-xs text-center"><Image src={veganImage} alt="" className="w-16 lg:w-16" /> <span>Veganas Vegetarianas</span> </div>}
            defaultValue={[2, 12]}
            aria-label="meals"
            classNames={{
              base: "max-w-md",
              filler: "bg-gradient-to-r from-dark-green to-dark-green",
              labelWrapper: "mb-2",
              label: "font-medium text-default-700 text-medium",
              value: "font-medium text-default-700 text-medium",
              thumb: [
                "transition-size",
                "bg-dark-green",
                "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6"
              ],
              step: "bg-dark-green"
            }}
            />
          )}
        />
        <div className="flex items-end text-xs"><Image src={whiteMeatFishImage} alt="" className="w-12 lg:w-12" /> <span> {Array.isArray(meals) && (meals[1] - meals[0])} refeições serão consideradas como carnes brancas e peixe</span></div>
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
