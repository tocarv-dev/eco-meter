import Factor from './consts.json';

/*
- Total
*/

export const FormCalc = (data: any) => {
    let result: {
        [index: string]: number;
    } = {}

    /*
    - Casa
    */

    result.home = 0;

    // Eletricidade
    result.home += EletricityCalc(data.home_eletricity, data.home_residents)

    // Gás
    if(data.gas_type) {
        if(data.gas_type === 'propane') {
            result.home += PropaneGasCalc(data.gas_spend, data.home_residents);
        }

        if(data.gas_type === 'bottle') {
            result.home += BottledGasCalc(data.gas_spend, data.home_residents);
        }

        if(data.gas_type === 'natural') {
            result.home += NaturalGasCalc(data.gas_spend, data.home_residents);
        }
    }

    // Lenha
    if(data.useWood) {
        result.home += FirewoodCalc(data.home_residents)
    }

    /*
    - Transportes
    */
   result.transports = 0;


   // Térreos
   result.transports += VehiclesCalc({
    dieselCar: data.transport_dieselCar,
    gasCar: data.transport_gasCar,
    hybridCar: data.transport_hybridCar,
    gplCar: data.transport_gplCar,
    electricCar: data.transport_eletricCar,
    motorcycle: data.transport_motorcycle,
    taxi: data.transport_taxi,
    train: data.transport_train,
    subway: data.transport_subway,
    tram: data.transport_tram,
    ferryFoot: data.transport_ferryFoot,
    ferryCar: data.transport_ferryCar
   })

   // Aéreos
   result.transports += AviationCalc({
    hour: data.flights_hour,
    short: data.flights_short,
    medium: data.flights_medium,
    long: data.flights_long
   })

   /*
   - Alimentação
   */

   result.meals = 0;

    // Alimentação
    result.meals += MealsCalc({
        vegan: data.meals_vegan,
        whiteMeat: data.meals_whitemeat,
        redMeat: data.meals_whitemeat
    })

    /*
    - Resíduos
    */

    result.residual = 0;

    result.residual += ResidualCalc({
        unsorted: data.bags_unsorted,
        plastic: data.bags_plastic,
        glass: data.bags_glass,
        paper: data.bags_paper,
        organic: data.bags_organic
    }, data.home_residents)

    // Total

    result.total = result.home + result.transports + result.meals + result.residual

    // Planetas

    result.planets = (result.total * Factor.planet.offset) / Factor.planet.total;

    // Perfil
    if(result.total < 3) {  
        result.profile = 1 // A
    } else if(result.total < 4) {
        result.profile = 2; // B
    } else if(result.total < 5) {
        result.profile = 3; // C
    } else if(result.total < 5) {
        result.profile = 4; // D
    } else if(result.total < 6) {
        result.profile = 5; // E
    } else if(result.total < 7) {
        result.profile = 6; // F
    } else {
        result.profile = 7; // G
    }

    return result;
}

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
export const VehiclesCalc = (vehicles: { [index: string]: number }) => {
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
export const AviationCalc = (flights: { [index: string]: number }) => {
    let result: number = 0;

    if(flights.hour) {
        const Emissions = flights.hour * Factor.aviation.hour
        result += Emissions / 1000
    }

    if(flights.short) {
        const Emissions = flights.short * Factor.aviation.short
        result += Emissions / 1000
    }

    if(flights.medium) {
        const Emissions = flights.medium * Factor.aviation.medium
        result += Emissions / 1000
    }

    if(flights.long) {
        const Emissions = flights.long * Factor.aviation.long
        result += Emissions / 1000
    }

    return result;
}

// Alimentação | OT 10.0
export const MealsCalc = (meals:  { [index: string]: number }) => {
    const MealsPerWeek = (meals.redMeat * Factor.meals.redMeat) + (meals.vegan * Factor.meals.vegan) + (meals.whiteMeat * Factor.meals.whiteMeat),
    TonMealsPerWeek = MealsPerWeek / 1000,
    MealsPerYear = TonMealsPerWeek * 52;

    return MealsPerYear;
}

// Resíduos | OT 12.0

export const ResidualCalc = (bags: { [index: string]: number }, residents: number) => {
    let result: number = 0;

    // Indiferenciados
    if(bags.unsorted) {
        const WeeklyResiduals = bags.unsorted * 4.4 / residents,
        AnnualResiduals = WeeklyResiduals * 52,
        AnnualInceneration = AnnualResiduals * 0.16,
        AnnualIncenerationEmissions = (AnnualInceneration * Factor.residuals.inceneration) / 1000,
        ResidualLandfills = AnnualResiduals * 0.84,
        ResidualLandfillsEmisions = (ResidualLandfills * Factor.residuals.landfills) / 1000,
        Total = AnnualIncenerationEmissions + ResidualLandfillsEmisions;

        result += Total;
    }
    
    // Papel / Cartão | OT 13.0a
    if(bags.paper) {
        const WeeklyResiduals = bags.paper * 0.81 / residents,
        AnnualResiduals = WeeklyResiduals * 52,
        AnnualEmissions = AnnualResiduals * Factor.residuals.paper

        result += AnnualEmissions;
    }

    // Plástico / Metal | OT 13.0b
    if(bags.plastic) {
        const WeeklyResiduals = bags.plastic * 0.81 / residents,
        AnnualResiduals = WeeklyResiduals * 52,
        AnnualEmissions = AnnualResiduals * Factor.residuals.plastic

        result += AnnualEmissions;
    }

    // Vidro | OT 13.0c
    if(bags.glass) {
        const WeeklyResiduals = bags.glass * 0.81 / residents,
        AnnualResiduals = WeeklyResiduals * 52,
        AnnualEmissions = AnnualResiduals * Factor.residuals.glass

        result += AnnualEmissions;
    }

    // Orgânico | OT 13.0d
    if(bags.organic) {
        const WeeklyResiduals = bags.organic * 0.81 / residents,
        AnnualResiduals = WeeklyResiduals * 52,
        AnnualEmissions = AnnualResiduals * Factor.residuals.organic

        result += AnnualEmissions;
    }

    return result;
}