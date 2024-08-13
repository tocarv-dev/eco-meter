'use client';

import { useRouter } from 'next/navigation'
import clsx from 'clsx'

// Icons
import ResultActions from './ResultActions';
import Link from 'next/link';
import { useState } from 'react';

interface RegisterPageProps {
  id: string,
}

export default function RegisterPageClient({ id }: RegisterPageProps) {
  const [selected, setSelected] = useState('');
  const router = useRouter();

  const nextPage = () => {
    router.push(`/results/${id}/register`);
  }

  const handleSelect = (event: any) => {
    setSelected(event.target.value)
  }

  return (
    <section className="flex flex-col justify-center items-center px-6 lg:px-[100px] py-20 lg:pt-12 lg:pb-4 w-full h-full">
      <p className="mb-4 -mt-4 text-base text-center text-deep-green font-medium tracking-wide">
      Pretende guardar o histórico da sua pegada de carbono? 
      </p>

      <div className="mt-auto flex justify-between items-center gap-x-4">
        <button
          type="button"
          value="no"
          className={clsx("bg-cool-gray mt-4 transition duration-300 hover:opacity-80 text-magnolia px-[17px] lg:px-8 py-[10px] ml-auto lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg",
            selected === 'no' ? 
            'brightness-75'
            :
            'brightness-100'
          )}
          onClick={handleSelect}
        >
          Não
        </button>

        <button
          type="button"
          value="yes"
          className={clsx("bg-dark-green mt-4 transition duration-300 hover:opacity-80 text-magnolia px-[17px] lg:px-8 py-[10px] ml-auto lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg",
            selected === 'yes' ? 
            'brightness-75'
            :
            'brightness-100'
          )}
          onClick={handleSelect}
        >
          Sim
        </button>
      </div>
      { selected === "yes" &&
      <form className="flex flex-col justify-center items-center">
        <label className="flex flex-col mt-3">
            <div className="flex justify-between">
              <span className="text-xs text-deep-green lg:text-sm font-medium tracking-wide">
                Insira o seu email
              </span>
            </div>
            <input
              type="email"
              className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
              min={1}
              autoComplete="email"
            />
          </label>
          <button
          type="submit"
          className="bg-dark-green mt-4 transition duration-300 hover:opacity-80 text-magnolia px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
        >
          Registar
        </button>
        </form>
        }
    </section>
  );
}