import { GetSurvey } from '@/lib/utils/db';
import { FormCalc } from '@/lib/calc/calcs';
import PieChart from '@/components/results/PieChart';

export default async function OverviewResult({
params: { id },
}: {
params: { id: string };
}) {
    const survey = await GetSurvey(id);

    const results = FormCalc(survey)

    return <PieChart data={[results.home, results.transports, results.meals, results.residual]} />;
}
