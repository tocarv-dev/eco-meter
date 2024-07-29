import { MdFormatColorText } from 'react-icons/md';
import Factor from './consts.json';

/*
- Habitações
*/

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
export const VehiclesCalc = (distance: number, type: string) => {
    let VehicleFactor = 0

    switch(type) {
        case 'dieselCar':
            VehicleFactor = Factor.vehicles.dieselCar
        break;

        case 'gasCar':
            VehicleFactor = Factor.vehicles.gasCar
        break;

        case 'hybridCar': 
            VehicleFactor = Factor.vehicles.hybridCar
        break;

        case 'gplCar':
            VehicleFactor = Factor.vehicles.gplCar
        break;
        
        case 'electricCar':
            VehicleFactor = Factor.vehicles.electricCar
        break;

        case 'motorcycle':
            VehicleFactor = Factor.vehicles.motorcycle
        break;

        case 'taxi':
            VehicleFactor = Factor.vehicles.taxi
        break;

        case 'urbanBus':
            VehicleFactor = Factor.vehicles.urbanBus
        break;

        case 'coachBus':
            VehicleFactor = Factor.vehicles.coachBus
        break;

        case 'subway':
            VehicleFactor = Factor.vehicles.subway
        break;

        case 'tram':
            VehicleFactor = Factor.vehicles.tram
        break;

        case 'ferryFoot':
            VehicleFactor = Factor.vehicles.ferryFoot
        break;

        case 'ferryCar':
            VehicleFactor = Factor.vehicles.ferryCar
        break;

        default:
            VehicleFactor = 0
        break;
    }

    const AnnualDistance = distance * 52,
    Emissions = AnnualDistance * VehicleFactor * Math.pow(10, -6)

    return Emissions;
}

// Aviação | OT 8.0
export const AviationCalc = (flights: number) => {
    
}