import { GetSurvey } from '@/lib/utils/db';
import ResultPageClient from '@/components/results/ResultPageClient'
import { FormCalc } from '@/lib/calc/calcs';
import { notFound } from 'next/navigation';

export default async function ResultPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const survey = await GetSurvey(id);

  if(!survey) {
    notFound();
  }

  const results = FormCalc(survey)

  return <ResultPageClient data={results} />;
}