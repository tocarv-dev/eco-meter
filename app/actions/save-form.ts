'use server';

// Database
import prisma from '@/lib/utils/db'

export const saveForm = async (data: any) => {
  await prisma.surveys.create({
    data: {
      userid: data.userid,

      gender: data.gender,
      age: data.age,
      municipality: data.municipality,

      home_residents: data.residents, 
      home_eletricity: data.electricitySpend,

      meals_whitemeat: data.whiteMeatMeals,
      meals_redmeat: data.redMeatMeals,
      meals_vegan: data.veganMeals,

      bags_unsorted: data.unsortedBags,
      bags_paper: data.paperBags,
      bags_plastic: data.plasticBags,
      bags_glass: data.glassBags,
      bags_organic: data.organicBags,

      gas_type: data.gasType,
      gas_spend: data.gasSpend,

      transport_dieselCar: data.transports['dieselCar'] ? data.transports['dieselCar'].distance : null,
      transport_gasCar: data.transports['gasCar'] ? data.transports['gasCar'].distance : null,
      transport_hybridCar: data.transports['hybridCar'] ? data.transports['hybridCar'].distance : null,
      transport_gplCar: data.transports['gplCar'] ? data.transports['gplCar'].distance : null,
      transport_eletricCar: data.transports['electricCar'] ? data.transports['electricCar'].distance : null,
      transport_motorcycle: data.transports['motorcycle'] ? data.transports['motorcycle'].distance : null,
      transport_taxi: data.transports['taxi'] ? data.transports['taxi'].distance : null,
      transport_train: data.transports['train'] ? data.transports['train'].distance : null,
      transport_bus: data.transports['bus'] ? data.transports['bus'].distance : null,
      transport_subway: data.transports['subway'] ? data.transports['subway'].distance : null,
      transport_tram: data.transports['tram'] ? data.transports['tram'].distance : null,
      transport_ferryFoot: data.transports['ferryFoot'] ? data.transports['ferryFoot'].distance : null,
      transport_ferryCar: data.transports['ferryCar'] ?  data.transports['ferryCar'].distance : null,

      profile: data.profile,
    }
  })
}