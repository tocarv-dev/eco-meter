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
      router.push('/survey/transportation');
    }
  };

  const gastypes: {
    [key: string]: {
      name: 'propane' | 'bottle' | 'natural';
      displayName: string;
    };
  } = {
    propane: { name: 'propane', displayName: 'Propane' },
    bottle: { name: 'bottle', displayName: "Bottle" },
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
      heading="Your Household"
      description="Tell us about your household."
    >
      <div className="flex flex-col mt-6">
        <label className="flex flex-col">
          <div className="flex justify-between">
            <span className="capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide">
              house members
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
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('residents', { required: 'This field is required', })}
            onBlur={() => trigger('residents')}
            min={1}
            autoComplete="residents"
          />
        </label>
        <label className="flex flex-col">
          <div className="flex justify-between">
            <span className="capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide">
              monthly household electricity spend
            </span>
            {errors.electricitySpend && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                { errors.electricitySpend.message}
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
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('electricitySpend', { required: 'This field is required', })}
            onBlur={() => trigger('electricitySpend')}
            min={1}
            autoComplete="electricitySpend"
          />
        </label>
        <div className="flex justify-start items-center gap-6 bg-alabaster mt-6 lg:mt-8 rounded-lg p-3 lg:p-4 bg-white-green">
          <label>
            <span className={clsx( 'text-sm lg:text-base font-bold transition duration-300',) }>
              Do you use gas at home?
            </span>
          </label>
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
        </div>
        <label className={clsx('flex flex-col', usesGas === true ? '' : 'hidden')} >
          <div className="flex justify-between">
            <span className="capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide">
              Type of gas
            </span>
            {errors.gasType && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                {errors.gasType.message}
              </span>
            )}
          </div>
          <select 
            className={clsx(
              'border',
              errors.gasType
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            { ...register('gasType', { required: 'This field is required' }) }
            onChange={(e) => setValue('gasType', e.target.value)}
            onBlur={() => trigger('gasType')}
            autoComplete="gasType"
          >
            {GasOptions}
          </select>
        </label>
        <label className={clsx('flex flex-col', usesGas === true ? '' : 'hidden')}>
          <div className="flex justify-between">
            <span className="capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide">
              monthly household gas spend
            </span>
            {errors.gasSpend && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                { errors.gasSpend.message}
              </span>
            )}
          </div>
          <input
            type="number"
            placeholder="30"
            className={clsx(
              'border',
              errors.gasSpend
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('gasSpend', { required: 'This field is required', })}
            onBlur={() => trigger('gasSpend')}
            min={1}
            autoComplete="gasSpend"
          />
        </label>
        <div className="flex justify-start items-center gap-6 bg-alabaster mt-6 lg:mt-8 rounded-lg p-3 lg:p-4 bg-white-green">
          <label>
            <span className={clsx(' text-sm lg:text-base font-bold transition duration-300',) }>
              Do you use wood at home?
            </span>
          </label>
          <button
            className={clsx(
              'h-[20px] w-[40px] rounded-full p-1 flex',
              usesWood === true ? 'justify-end bg-dark-green' : 'justify-start bg-cool-gray'
            )}
            onClick= {toggleUseWood}
            type="button"
          >
            <div className={clsx('h-full rounded-full aspect-square bg-white')} />
          </button>
        </div>

      </div>
      {/* <div className="mt-auto flex justify-between items-center"> */}
      <FormActions>
        <Link
          href="/survey/info"
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
