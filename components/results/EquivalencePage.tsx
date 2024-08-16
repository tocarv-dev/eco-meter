'use client';

import { Bar } from "react-chartjs-2";
import { useRouter, useSearchParams } from 'next/navigation'
import Flag from 'react-flagpack'

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
    router.push(`/results/${id}/reaction`);
  }

  const Data = {
    labels: ['A sua pegada', `Média em Portugal`, 'Média na Índia', 'Média nos EUA'],
    datasets: [{
      data: data,
      barThickness: 15,
      borderRadius: 5,
      backgroundColor: [
        '#4bb367',
        '#40c97c',
        '#34c9b1',
        '#51cf61'
      ],
    }]
  }

  return (
    <section className="flex flex-col px-6 lg:pt-12 w-full h-full">
      <div className="flex flex-col items-center mx-auto lg:mb-4 ">
        <Bar data={Data} options={{
            indexAxis: 'y',
            plugins: {
              legend: {
                display: false
              },
            },
            scales: {
              x: {
                stacked: true,
                grid: {
                  display: false,
                },
                title: {
                  display: true,
                  text: 'tCO2eq/ano'
                }
              },
              y: {
                grid: {
                  display: false,
                },
              }
            }
          }}
        />
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