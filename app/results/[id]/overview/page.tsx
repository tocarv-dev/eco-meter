import { GetSurvey } from '@/lib/utils/db';
import { FormCalc } from '@/lib/calc/calcs';
import GraphsPage from '@/components/results/GraphsPage';
import { notFound } from 'next/navigation';
import ResultWrapper from '@/components/results/ResultWrapper';
import EquivalencePageClient from '@/components/results/EquivalencePage';
import Factor from '@/lib/calc/consts.json';

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
        <ResultWrapper title="Pegada de Carbono">
            <section className="flex flex-col">
                <GraphsPage results={results} data={[results.home, results.transports, results.meals, results.residual]} id={id} />
                <EquivalencePageClient results={results} data={[results.total, Factor.barChart.avrPT, Factor.barChart.avrIN, Factor.barChart.avrUS,]} id={id} />
            </section>
        </ResultWrapper>
    );
}