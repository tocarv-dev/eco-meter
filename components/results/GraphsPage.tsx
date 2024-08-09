'use client';

import { Doughnut } from 'react-chartjs-2';
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {Chip} from "@nextui-org/react";
import {Chart, ArcElement} from 'chart.js'
import ResultActions from '@/components/results/ResultActions';
import Link from 'next/link';

Chart.register(ArcElement);

interface ResultPageClientProps {
  data: number[],
  id: string,
  results: any
}

export default function GraphsPage({ results, data, id }: ResultPageClientProps) {
  const router = useRouter(),
  params = useSearchParams();

  const nextPage = () => {
    if(params.get('form') && params.get('form') === 'true') {
      router.push(`/results/${id}/footprint?form=true`);
    }
  }

  const Labels = [
    'Casa',
    'Transportes',
    'Refeições',
    'Resíduos'
  ]

  const keys = [
    'home',
    'transports',
    'meals',
    'residual'
  ]

  const Colors = [
    'house-color',
    'transports-color',
    'meals-color',
    'residuals-color',
  ]

  const chart = {
    labels: Labels,
    datasets: [{
      data: data,
      backgroundColor: [
        '#4bb367',
        '#40c97c',
        '#34c9b1',
        '#51cf61'
      ],
    }]
  };

  return (
    <section className="flex flex-col justify-center items-center px-6 lg:px-[100px] py-20 lg:pt-12 lg:pb-4 w-full h-full">
      <p className="mb-4 -mt-4 text-base text-deep-green font-medium tracking-wide">
        A sua pegada de carbono é <strong>{ results.total.toFixed(2) }</strong> tCO2eq/ano
      </p>
      { /* Pre-render custom colors, não sei mas se não se der pre-render o Tailwind não reconhece */}
      <div className="invisible bg-house-color bg-transports-color bg-meals-color bg-residuals-color"></div>

      <div className="flex flex-row gap-2 my-2">
        <div className="flex flex-col gap-2">

        { Labels.map((value, index) => (
            <Chip
            key={index}
              variant="shadow"
              classNames={{
                base: `bg-${Colors[index]} border-small border-white/50 shadow-pink-500/30`,
                content: "text-white",
              }}
            >
              { value } | { (results[keys[index]]).toFixed(2) } CO2e ({ ((results[keys[index]] / results.total) * 100).toFixed(2) }%)
            </Chip>
        ))}
        </div>
        <div className="flex flex-col">
          <Doughnut data={chart} options={{
          plugins: {
            legend: {
              display: false
            }
          }
        }} className='ml-2 w-[150px] lg:w-[150px] lg:h-auto'/>
        </div>
      </div>
      <ResultActions>
      <Link
        href={`/results/${id}/profile`}
        className="text-cool-gray transition duration-300 hover:text-dark-green font-medium lg:font-bold text-sm lg:text-base mt-4 mr-4"
      >
        Anterior
      </Link>
      <button
        type="button"
        className="mt-6 bg-dark-green transition duration-300 hover:opacity-80 text-magnolia px-[17px] lg:px-8 py-[10px] ml-auto lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
        onClick={nextPage}
      >
        E isto significa que…
      </button>
    </ResultActions>
    </section>
  );
}