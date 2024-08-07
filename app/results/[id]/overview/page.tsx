import { GetSurvey } from '@/lib/utils/db';
import { FormCalc } from '@/lib/calc/calcs';
import PieChart from '@/components/results/PieChart';
import { notFound } from 'next/navigation';

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

    return <PieChart data={[results.home, results.transports, results.meals, results.residual]} />;
}
