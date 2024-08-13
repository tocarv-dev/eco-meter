import { GetSurvey } from '@/lib/utils/db';
import { FormCalc } from '@/lib/calc/calcs';
import { notFound } from 'next/navigation';

import ProfilePageClient from '@/components/results/ProfilePage';
import ResultWrapper from '@/components/results/ResultWrapper';

export default async function OverviewResult({
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
    <ResultWrapper title="O seu perfil">
      <ProfilePageClient selected={survey.profile} data={results} id={id} />
    </ResultWrapper>
  );
}
