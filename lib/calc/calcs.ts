import Factor from './consts.json';
import { Surveys } from '@/types/surveys'
/*
- Habitações
*/

export const Calc = (data: Surveys) => {
    let result: {
        [index: string]: number;
    } = {}

    result.eletricity = EletricityCalc(data.home_eletricity, data.home_residents)
}

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

/*
- Transportes
*/

// Térreos / Marítimos | OT 7.0
export const VehiclesCalc = (vehicles: any) => {
    let result = 0;

    if (vehicles.dieselCar) {
        const AnnualDistance = vehicles.dieselCar * 52;
        result += AnnualDistance * Factor.vehicles.dieselCar * Math.pow(10, -6);
    }
    
    if (vehicles.gasCar) {
        const AnnualDistance = vehicles.gasCar * 52;
        result += AnnualDistance * Factor.vehicles.gasCar * Math.pow(10, -6);
    }
    
    if (vehicles.hybridCar) {
        const AnnualDistance = vehicles.hybridCar * 52;
        result += AnnualDistance * Factor.vehicles.hybridCar * Math.pow(10, -6);
    }
    
    if (vehicles.gplCar) {
        const AnnualDistance = vehicles.gplCar * 52;
        result += AnnualDistance * Factor.vehicles.gplCar * Math.pow(10, -6);
    }
    
    if (vehicles.electricCar) {
        const AnnualDistance = vehicles.electricCar * 52;
        result += AnnualDistance * Factor.vehicles.electricCar * Math.pow(10, -6);
    }
    
    if (vehicles.motorcycle) {
        const AnnualDistance = vehicles.motorcycle * 52;
        result += AnnualDistance * Factor.vehicles.motorcycle * Math.pow(10, -6);
    }
    
    if (vehicles.taxi) {
        const AnnualDistance = vehicles.taxi * 52;
        result += AnnualDistance * Factor.vehicles.taxi * Math.pow(10, -6);
    }
    
    if (vehicles.urbanBus) {
        const AnnualDistance = vehicles.urbanBus * 52;
        result += AnnualDistance * Factor.vehicles.urbanBus * Math.pow(10, -6);
    }
    
    if (vehicles.coachBus) {
        const AnnualDistance = vehicles.coachBus * 52;
        result += AnnualDistance * Factor.vehicles.coachBus * Math.pow(10, -6);
    }
    
    if (vehicles.subway) {
        const AnnualDistance = vehicles.subway * 52;
        result += AnnualDistance * Factor.vehicles.subway * Math.pow(10, -6);
    }
    
    if (vehicles.tram) {
        const AnnualDistance = vehicles.tram * 52;
        result += AnnualDistance * Factor.vehicles.tram * Math.pow(10, -6);
    }
    
    if (vehicles.ferryFoot) {
        const AnnualDistance = vehicles.ferryFoot * 52;
        result += AnnualDistance * Factor.vehicles.ferryFoot * Math.pow(10, -6);
    }
    
    if (vehicles.ferryCar) {
        const AnnualDistance = vehicles.ferryCar * 52;
        result += AnnualDistance * Factor.vehicles.ferryCar * Math.pow(10, -6);
    }

    return result;
}

// Aviação | OT 8.0
export const AviationCalc = (flights: number, type: number) => {
    let result;
}