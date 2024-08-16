import { GetSurvey } from '@/lib/utils/db';
import { notFound } from 'next/navigation';
import ResultWrapper from '@/components/results/ResultWrapper';
import ReactionPageClient from '@/components/results/ReactionPage';

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
      <ResultWrapper title="Como se sente com este resultado?">
          <ReactionPageClient id={id} />
      </ResultWrapper>
    );
}