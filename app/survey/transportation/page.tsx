'use client';

import clsx from 'clsx';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {Slider} from "@nextui-org/react";
import Image from 'next/image';

// Icons
import checkmarkIcon from '@/images/icon-checkmark.svg';

import FormWrapper from '@/components/survey/FormWrapper';
import FormActions from '@/components/survey/FormActions';

export default function TransportationPage() {
  const router = useRouter();
  const { register, trigger, formState, watch } = useAppFormContext();
  const { isValid } = formState;

  const validateStep = async () => {
    await trigger();
    if (isValid) {
      router.push('/survey/food');
    }
  };

  return (
    <FormWrapper
      heading="Your Travels"
      description="Tell us more about your transportation habits."
    >
      <div className="flex flex-col w-full gap-4 mt-6">
      <Slider 
      label="Select a value" 
      showTooltip={true}
      step={0.1} 
      formatOptions={{style: "percent"}}
      maxValue={1}
      minValue={0}
      marks={[
        {
          value: 0.2,
          label: "20%",
        },
        {
          value: 0.5,
          label: "50%",
        },
        {
          value: 0.8,
          label: "80%",
        },
      ]}
      defaultValue={0.2}
      className="max-w-md"
    />
      </div>
      <FormActions>
        <Link
          href="/survey/home"
          className="text-cool-gray transition duration-300 hover:text-dark-green font-medium lg:font-bold text-sm lg:text-base"
        >
          Go Back
        </Link>
        <button
          type="button"
          className="bg-dark-green hover:opacity-80 transition duration-300 text-magnolia ml-auto px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
          onClick={validateStep}
        >
          Next Step
        </button>
      </FormActions>
    </FormWrapper>
  );
}
