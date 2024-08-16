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
        <ResultWrapper title="A sua pegada de carbono é">
            <section className="flex flex-col">
                <div className="flex flex-col">
                    <div className="text-5xl text-deep-green font-bold tracking-wide text-center mt-3">{ results.total.toFixed(2) }</div>
                    <div className="text-3xl text-deep-green font-light tracking-wide text-center">tCO2eq/ano</div>
                    <div className="text-normal text-deep-green font-light tracking-wide text-center">E se todas as pessoas tivessem esta pegada de carbono, seriam necessários</div>
                    <div className="text-3xl text-deep-green font-light tracking-wide text-center"><strong>{ results.planets.toFixed(2) }</strong></div>
                    <div className="text-normal text-deep-green font-light tracking-wide text-center">planetas!</div>
                </div>
                <div className="grid grid-cols-2 justify-items-center">
                <GraphsPage results={results} data={[results.home, results.transports, results.meals, results.residual]} id={id} />
                <EquivalencePageClient results={results} data={[results.total, Factor.barChart.avrPT, Factor.barChart.avrIN, Factor.barChart.avrUS,]} id={id} />
                </div>
            </section>
        </ResultWrapper>
    );
}