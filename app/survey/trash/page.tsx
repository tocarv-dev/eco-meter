'use client';

import clsx from 'clsx';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Icons
import checkmarkIcon from '@/images/icon-checkmark.svg';

import FormWrapper from '@/components/survey/FormWrapper';
import FormActions from '@/components/survey/FormActions';

export default function TrashPage() {
  const router = useRouter();
  const { register, trigger, formState, watch } = useAppFormContext();
  const { isValid, errors } = formState;

  const validateStep = async () => {
    await trigger();
    if (isValid) {
      router.push('/survey/profile');
    }
  };

  return (
    <FormWrapper
      heading="Resíduos"
      description="A forma como lida com o lixo, desde a separação até à redução de desperdícios, pode reduzir significativamente o impacto ambiental"
    >
      <div className="grid grid-cols-2	w-full gap-4 mt-6">

      <label className="flex flex-col">
          <div className="flex justify-between">
          <span className={clsx( 'capitalize text-sm lg:text-base font-bold transition duration-300',) }>
            unsorted garbage:
          </span>
            {errors.unsortedBags && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                { errors.unsortedBags.message }
              </span>
            )}
          </div>
          <input
            type="number"
            placeholder="2"
            className={clsx(
              'border',
              errors.unsortedBags
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('unsortedBags', { required: 'This field is required', })}
            onBlur={() => trigger('unsortedBags')}
            min={1}
            autoComplete="unsortedBags"
          />
        </label>

        <label className="flex flex-col">
          <div className="flex justify-between">
          <span className={clsx( 'capitalize text-sm lg:text-base font-bold transition duration-300',) }>
          paper garbage:
          </span>
            {errors.paperBags && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                { errors.paperBags.message }
              </span>
            )}
          </div>
          <input
            type="number"
            placeholder="2"
            className={clsx(
              'border',
              errors.paperBags
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('paperBags', { required: 'This field is required', })}
            onBlur={() => trigger('paperBags')}
            min={1}
            autoComplete="paperBags"
          />
        </label>

        <label className="flex flex-col">
          <div className="flex justify-between">
          <span className={clsx( 'capitalize text-sm lg:text-base font-bold transition duration-300',) }>
          plastic garbage:
          </span>
            {errors.plasticBags && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                { errors.plasticBags.message}
              </span>
            )}
          </div>
          <input
            type="number"
            placeholder="2"
            className={clsx(
              'border',
              errors.plasticBags
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('plasticBags', { required: 'This field is required', })}
            onBlur={() => trigger('plasticBags')}
            min={1}
            autoComplete="plasticBags"
          />
        </label>

        <label className="flex flex-col">
          <div className="flex justify-between">
          <span className={clsx( 'capitalize text-sm lg:text-base font-bold transition duration-300',) }>
          glass garbage:
          </span>
            {errors.glassBags && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                { errors.glassBags.message}
              </span>
            )}
          </div>
          <input
            type="number"
            placeholder="2"
            className={clsx(
              'border',
              errors.glassBags
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('glassBags', { required: 'This field is required', })}
            onBlur={() => trigger('glassBags')}
            min={1}
            autoComplete="glassBags"
          />
        </label>

        <label className="flex flex-col">
          <div className="flex justify-between">
          <span className={clsx( 'capitalize text-sm lg:text-base font-bold transition duration-300',) }>
          organic garbage:
          </span>
            {errors.organicBags && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                { errors.organicBags.message }
              </span>
            )}
          </div>
          <input
            type="number"
            placeholder="2"
            className={clsx(
              'border',
              errors.organicBags
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('organicBags', { required: 'This field is required', })}
            onBlur={() => trigger('organicBags')}
            min={1}
            autoComplete="organicBags"
          />
        </label>
      </div>
      <FormActions>
        <Link
          href="/survey/food"
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
