import { PrismaClient } from '@prisma/client'
import Factor from '../lib/calc/consts.json'

const prisma = new PrismaClient()
async function main() {
  const factors = prisma.factors.create({
    data: {
      eletricity_conversion: Factor.eletricity.conversion,
      eletricity_emission: Factor.eletricity.emission,

      natural_gas_conversion: Factor.naturalGas.conversion,
      natural_gas_emission_co2: Factor.naturalGas.emission.CO2,
      natural_gas_emission_wwt: Factor.naturalGas.emission.WWT,

      propane_gas_conversion: Factor.propaneGas.conversion,
      propane_gas_emission_co2: Factor.propaneGas.emission.CO2,
      propane_gas_emission_wwt: Factor.propaneGas.emission.WWT,

      bottled_gas_conversion: Factor.bottledGas.conversion,
      bottled_gas_emission_co2: Factor.bottledGas.emission.CO2,
      bottled_gas_emission_wwt: Factor.bottledGas.emission.WWT,
      
      firewood_consume: Factor.fireWood.consume,
      firewood_conversion: Factor.fireWood.conversion,
      firewood_emission_biomass: Factor.fireWood.emission.biomass,

      vehicles_dieselcar_emission: Factor.vehicles.dieselCar,
      vehicles_gascar_emission: Factor.vehicles.gasCar,
      vehicles_hybridcar_emission: Factor.vehicles.hybridCar,
      vehicles_gplcar_emission: Factor.vehicles.gplCar,
      vehicles_electriccar_emission: Factor.vehicles.electricCar,
      vehicles_motorcycle_emission: Factor.vehicles.motorcycle,
      vehicles_taxi_emission: Factor.vehicles.taxi,
      vehicles_train_emission: Factor.vehicles.train,
      vehicles_coachbus_emission: Factor.vehicles.coachBus,
      vehicles_urbanbus_emission: Factor.vehicles.urbanBus,
      vehicles_subway_emission: Factor.vehicles.subway,
      vehicles_tram_emission: Factor.vehicles.tram,
      vehicles_ferryfoot_emission: Factor.vehicles.ferryFoot,
      vehicles_ferrycar_emission: Factor.vehicles.ferryCar,

      aviation_hour_emission: Factor.aviation.hour,
      aviation_short_emission: Factor.aviation.short,
      aviation_medium_emission: Factor.aviation.medium,
      aviation_long_emission: Factor.aviation.long,

      meals_vegan_emission: Factor.meals.vegan,
      meals_whitemeat_emission: Factor.meals.whiteMeat,
      meals_redmeat_emission: Factor.meals.redMeat,

      residuals_inceneration_emission: Factor.residuals.inceneration,
      residuals_landfills_emission: Factor.residuals.landfills,
      residuals_paper_emission: Factor.residuals.paper,
      residuals_glass_emission: Factor.residuals.glass,
      residuals_plastic_emission: Factor.residuals.plastic,
      residuals_organic_emission: Factor.residuals.organic,

      planet_total: Factor.planet.total,
      planet_offset: Factor.planet.offset,

      barChart_average_pt: Factor.barChart.avrPT,
      barChart_average_usa: Factor.barChart.avrUS,
      barChart_average_in: Factor.barChart.avrIN,
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })