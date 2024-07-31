import { GetSurvey } from '@/lib/utils/db';
import ResultPageClient from '@/components/results/ResultPageClient'

export default async function ResultPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const survey = await GetSurvey(id);

  return <ResultPageClient survey={survey} />;
}