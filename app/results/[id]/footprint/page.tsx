import { GetSurvey } from '@/lib/utils/db';
import { FormCalc } from '@/lib/calc/calcs';
import { notFound } from 'next/navigation';
import ResultWrapper from '@/components/results/ResultWrapper';
import EquivalencePageClient from '@/components/results/EquivalencePage';
import Factor from '@/lib/calc/consts.json';

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

  return (
        <ResultWrapper title="Equivalências">
            <EquivalencePageClient results={results} data={[results.total, Factor.barChart.avrIN, Factor.barChart.avrPT, Factor.barChart.avrUS,]} id={id} />
        </ResultWrapper>
    );
}