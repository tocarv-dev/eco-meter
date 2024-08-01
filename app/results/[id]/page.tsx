import { GetSurvey } from '@/lib/utils/db';
import ResultPageClient from '@/components/results/ResultPageClient'
import { FormCalc } from '@/lib/calc/calcs';

export default async function ResultPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const survey = await GetSurvey(id);

  const results = FormCalc(survey)

  return <ResultPageClient data={results} />;
}