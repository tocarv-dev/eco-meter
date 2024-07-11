'use client';

import clsx from 'clsx';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';
import femaleIcon from '@/images/icon-female.svg';
import maleIcon from '@/images/icon-male.svg';
import otherIcon from '@/images/icon-other.svg';
import unspecifiedIcon from '@/images/icon-question.svg';
import FormWrapper from '@/components/survey/FormWrapper';
import FormActions from '@/components/survey/FormActions'; 

export default function InfoPage() {
  const router = useRouter();
  const { register, trigger, formState, setValue } = useAppFormContext();

  const { isValid, errors } = formState;

  const validateStep = async () => {
    await trigger();
    if (isValid) {
      router.push('/survey/home');
    }
  };

  const genders: {
    [key: string]: {
      name: 'female' | 'male' | 'other' | 'unspecified';
      icon: any;
      displayName: string;
    };
  } = {
    female: { name: 'female', icon: femaleIcon, displayName: 'Female' },
    male: { name: 'male', icon: maleIcon, displayName: 'Male' },
    other: { name: 'other', icon: otherIcon, displayName: 'Other' },
    unspecified: { name: 'unspecified', icon: unspecifiedIcon, displayName: 'Rather not say' },
  };

  const Genders = Object.values(genders).map((gender) => (
    <option value={gender.name} key={gender.name} > 
      {gender.displayName}
    </option>
  ));

   return (
    <FormWrapper
      heading="Personal info"
      description="Please tell us a bit about yourself"
    >
      <div className="flex flex-col mt-6">
      <label className="flex flex-col">
          <div className="flex justify-between">
            <span className="capitalize text-xs text-marine-blue lg:text-sm font-medium tracking-wide">
              gender
            </span>
            {errors.gender && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                {errors.gender.message}
              </span>
            )}
          </div>
          <select 
            className={clsx(
              'border',
              errors.gender
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-marine-blue placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            { ...register('gender', { required: 'This field is required' }) }
            onChange={(e) => setValue('gender', e.target.value)}
            autoComplete="gender"
          >
            {Genders}
          </select>
        </label>
        <label className="flex flex-col">
          <div className="flex justify-between">
            <span className="capitalize text-xs text-marine-blue lg:text-sm font-medium tracking-wide">
              age
            </span>
            {errors.age && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                {errors.age.message}
              </span>
            )}
          </div>
          <input
            type="number"
            placeholder="25"
            className={clsx(
              'border',
              errors.age
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-marine-blue placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('age', {
              required: 'This field is required',
              max: {
                value: 150,
                message: 'Are you really over 150 years old?',
              },
              min: {
                value: 16,
                message: 'You must be 16 years of age or older',
              }
            })}
            onBlur={() => trigger('age')}
            min={1}
            autoComplete="age"
          />
        </label>
        <label className="flex flex-col mt-4">
          <div className="flex justify-between">
            <span className="capitalize text-xs text-marine-blue lg:text-sm font-medium tracking-wide">
              municipality
            </span>
            {errors.municipality && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                {errors.municipality.message}
              </span>
            )}
          </div>
          <input
            placeholder="e.g. stephenking@lorem.com"
            className={clsx(
              'border',
              errors.municipality
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-marine-blue placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('municipality', {
              required: 'This field is required',
              maxLength: {
                value: 80,
                message: 'Email must be less than 80 characters',
              },
            })}
            onBlur={() => trigger('municipality')}
            autoComplete="municipality"
          />
        </label>
      </div>
      <FormActions>
        <button
          type="button"
          className="bg-marine-blue hover:opacity-80 transition duration-300 text-magnolia ml-auto px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
          onClick={validateStep}
        >
          Next Step
        </button>
      </FormActions>
    </FormWrapper>
  );
}
