import { MdFormatColorText } from 'react-icons/md';
import Factor from './consts.json';

// Eletricidade | ID: OT 1.0
export const EletricityCalc = (euros: number, residents: number) => {
    const MonthlyEletricity = euros / Factor.eletricity.conversion,
    AnualElectricity = MonthlyEletricity * 12,
    Emissions = AnualElectricity * Factor.eletricity.emission / 1000,
    EmisisonsPerCapita = Emissions / residents

    return EmisisonsPerCapita;
}

// Gás Natural | ID: OT 2.0
export const NaturalGasCalc = (euros: number, residents: number) => {
    const MontlyNaturalGas = euros / Factor.naturalGas.conversion,
    AnnualNaturalGas = MontlyNaturalGas * 12,
    AnnualEnergy = AnnualNaturalGas * 3.6,
    Emissions = (AnnualEnergy * Factor.naturalGas.emission.CO2 / 1000) + (AnnualNaturalGas * Factor.naturalGas.emission.WWT),
    TonEmissions = Emissions / 1000,
    EmisionsPerCapita = TonEmissions / residents

    return EmisionsPerCapita;
}

// Gás Propano Canalizado | ID: OT 3.0
export const PropaneGasCalc = (euros: number, residents: number) => {
    const MontlyPropaneGas = euros / Factor.propaneGas.conversion,
    AnnualPropaneGas = MontlyPropaneGas * 12,
    AnnualEnergy = AnnualPropaneGas * 46.347,
    Emissions = (AnnualEnergy * Factor.propaneGas.emission.CO2 / 1000) + (AnnualPropaneGas * Factor.propaneGas.emission.WWT),
    TonEmissions = Emissions / 1000,
    EmisionsPerCapita = TonEmissions / residents

    return EmisionsPerCapita;
}

// Gás Engarrafado | ID: OT 4.0
export const BottledGasCalc = (euros: number, residents: number) => {
    const MontlyBottledGas = euros / Factor.bottledGas.conversion,
    AnnualBottledGas = MontlyBottledGas * 12, 
    AnnualEnergy = AnnualBottledGas * 46,
    Emissions = (AnnualEnergy * Factor.bottledGas.emission.CO2 / 1000) + (AnnualBottledGas * Factor.bottledGas.emission.WWT),
    TonEmissions = Emissions / 1000,
    EmisisonsPerCapita = TonEmissions / residents

    return EmisisonsPerCapita;
}

// Lenha | ID: OT 5.0
export const FirewoodCalc = (residents: number) => {
    const AnnualEnergy = Factor.fireWood.consume * Factor.fireWood.conversion,
    Emissions = AnnualEnergy * Factor.fireWood.emission.biomass,
    TonEmissions = Emissions / 1000,
    EmisisonsPerCapita = TonEmissions / residents

    return EmisisonsPerCapita
}