'use client';

import clsx from 'clsx';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Slider } from "@nextui-org/slider";
import Image from 'next/image';

// Icons
import checkmarkIcon from '@/images/icon-checkmark.svg';

import FormWrapper from '@/components/survey/FormWrapper';
import FormActions from '@/components/survey/FormActions';

export default function FoodPage() {
  const router = useRouter();
  const { register, trigger, formState, watch } = useAppFormContext();
  const { isValid } = formState;

  const validateStep = async () => {
    await trigger();
    if (isValid) {
      router.push('/survey/trash');
    }
  };

  return (
    <FormWrapper
      heading="Your Meals"
      description="Tell us more about your eating habits."
    >
      <div className="flex flex-col w-full gap-4 mt-6">
        <span className="capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide">
          How many specific meals do you have in a week?
        </span>
        <Slider
          key={"primary"}
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
          label="Red meat"
        />
        <Slider
          key={"primary"}
          size="md"
          radius="md"
          color={"primary"}
          step={1}
          getValue={(meals) => `${meals} of 14 Meals`}
          maxValue={14}
          minValue={0}
          defaultValue={7}
          aria-label="vegan"
          className="max-w-md"
          label="Vegan"
        />
      </div>
      <FormActions>
        <Link
          href="/survey/transportation"
          className="text-cool-gray transition duration-300 hover:text-dark-green font-medium lg:font-bold text-sm lg:text-base"
        >
          Go Back
        </Link>
        <button
          type="button"
          className="bg-dark-green transition duration-300 hover:opacity-80 text-magnolia ml-auto px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
          onClick={validateStep}
        >
          Next Step
        </button>
      </FormActions>
    </FormWrapper>
  );
}
