'use client';

import { Bar } from "react-chartjs-2";
import { useRouter, useSearchParams } from 'next/navigation'

import Chart from "chart.js/auto";
import { CategoryScale } from 'chart.js'; 
Chart.register(CategoryScale);

// Icons
import ResultActions from './ResultActions';
import Link from 'next/link';

interface EquivalencePageProps {
  data: any,
  id: string,
  results: any
}

export default function EquivalencePageClient({ results, data, id }: EquivalencePageProps) {
  const router = useRouter(),
  params = useSearchParams();

  const nextPage = () => {
    if(params.get('form') && params.get('form') === 'true') {
      router.push(`/results/${id}/reaction?form=true`);
    }
  }

  const Data = {
    labels: ['A sua pegada', 'Média na Índia', 'Média em Portugal', 'Média nos EUA'],
    datasets: [{
      data: data,
      backgroundColor: [
        '#4bb367',
        '#40c97c',
        '#34c9b1',
        '#51cf61'
      ],
    }]
  }

  return (
    <section className="flex flex-col justify-center items-center px-6 lg:px-[100px] py-20 lg:pt-12 lg:pb-4 w-full h-full">
      <p className="mb-4 -mt-4 text-base text-deep-green font-medium tracking-wide">
        E se todas as pessoas tivessem esta pegada de carbono, seriam necessários <strong>{ results.planets.toFixed(2) }</strong> planetas!
      </p>
      <Bar data={Data} options={{
          plugins: {
            legend: {
              display: false
            }
          }
        }}
      />
      <ResultActions>
      <Link
        href={`/results/${id}/overview`}
        className="text-cool-gray transition duration-300 hover:text-dark-green font-medium lg:font-bold text-sm lg:text-base mt-4 mr-4"
      >
        Anterior
      </Link>
      <button
        type="button"
        className="mt-6 bg-dark-green transition duration-300 hover:opacity-80 text-magnolia px-[17px] lg:px-8 py-[10px] ml-auto lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
        onClick={nextPage}
      >
        Próximo
      </button>
    </ResultActions>
    </section>
  );
}