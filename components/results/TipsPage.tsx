'use client';

import { useRouter } from 'next/navigation'

// Icons
import ResultActions from './ResultActions';
import Link from 'next/link';

interface TipsPageProps {
  id: string,
}

export default function TipsPageClient({ id }: TipsPageProps) {
  const router = useRouter();

  const nextPage = () => {
    router.push(`/results/${id}/register`);
  }

  return (
    <section className="flex flex-col justify-center items-center px-6 lg:px-[100px] py-20 lg:pt-12 lg:pb-4 w-full h-full">
      
      <ResultActions>
      <Link
        href={`/results/${id}/footprint`}
        className="text-cool-gray transition duration-300 hover:text-dark-green font-medium lg:font-bold text-sm lg:text-base mt-4 mr-4"
      >
        Anterior
      </Link>
      <button
        type="button"
        className="mt-6 bg-dark-green transition duration-300 hover:opacity-80 text-magnolia px-[17px] lg:px-8 py-[10px] ml-auto lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
        onClick={nextPage}
      >
        Entendido!
      </button>
    </ResultActions>
    </section>
  );
}