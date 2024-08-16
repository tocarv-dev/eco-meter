import { GetSurvey } from '@/lib/utils/db';
import { notFound } from 'next/navigation';
import ResultWrapper from '@/components/results/ResultWrapper';
import RegisterPageClient from '@/components/results/RegisterPage';

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
        <ResultWrapper title="Registar os meus resultados">
            <RegisterPageClient id={id} data={survey} />
        </ResultWrapper>
    );
}