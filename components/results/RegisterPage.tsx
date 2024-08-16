'use client';

import { useRouter } from 'next/navigation'
import clsx from 'clsx'

// Icons
import ResultActions from './ResultActions';
import Link from 'next/link';
import { useState, startTransition } from 'react';

import { useForm, SubmitHandler } from "react-hook-form"

import { handleRegister } from '@/app/actions/handleRegister';
interface RegisterPageProps {
  id: string,
  data: any
}

interface Form {
  email: string
}

export default function RegisterPageClient({ id, data }: RegisterPageProps) {
  const router = useRouter();

  if(data.userid !== "1") router.push('/');

  const { register, handleSubmit, formState } = useForm<Form>({
    defaultValues: {
      email: ''
    }
  });

  const { errors } = formState;

  const onSubmit:SubmitHandler<Form> = async (data) => {
    const isValid = !!(data.email)

    if(isValid) {
      startTransition(() => {
        handleRegister(id, data.email).then((a) => {
          console.log(a);
          router.push(`/`);
        });
      });
    } else {
      return;
    }
  }

  return (
    <section className="flex flex-col justify-center items-center px-6 lg:px-[100px] py-10 lg:pt-12 lg:pb-4 w-full h-full">
      <p className="mb-4 -mt-4 text-base text-center text-deep-green font-normal tracking-wide">
      Pretende guardar o histórico da sua pegada de carbono? 
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <label className="flex flex-col mt-3 mb-2">
            <div className="flex justify-between">
              <span className="text-base text-deep-green font-normal tracking-wide">
                Insira o seu email
              </span>
            </div>
            <input
              type="email"
              className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              placeholder="exemplo@email.com"
              required
              min={1}
              autoComplete="email"
              {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Introduza um email válido!',
                  }
                })
              }
            />
          </label>
          {errors.email && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                {errors.email.message}
              </span>
            )}
          <ResultActions>
          <Link
            href={`/`}
            className="text-cool-gray transition duration-300 hover:text-dark-green font-medium lg:font-bold text-sm lg:text-base mt-4 mr-4"
          >
            Ignorar
          </Link>

          <button
          type="submit"
          className="bg-dark-green mt-4 transition duration-300 hover:opacity-80 text-magnolia px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
        >
          Registar
        </button>
        </ResultActions>
        </form>
    </section>
  );
}