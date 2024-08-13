import { GetSurvey } from '@/lib/utils/db';
import { FormCalc } from '@/lib/calc/calcs';
import { notFound } from 'next/navigation';
import ResultWrapper from '@/components/results/ResultWrapper';
import ReactionPageClient from '@/components/results/ReactionPage';
import TipsPageClient from '@/components/results/TipsPage';

export default async function ResultPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const survey = await GetSurvey(id);

  if(!survey) {
    notFound();
  }

  return (
        <ResultWrapper title="Como melhorar a minha pegada de carbono?">
            <TipsPageClient id={id} />
        </ResultWrapper>
    );
}