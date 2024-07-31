'use server';

// Database
import prisma from '@/lib/utils/db'
import { cookies } from 'next/headers'

export const saveForm = async (data: any) => {
  const query = await prisma.surveys.create({
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

      flights_hour: data.hourFlights,
      flights_short: data.shortFlights,
      flights_medium: data.mediumFlights,
      flights_long: data.longFlights,

      bags_unsorted: data.unsortedBags,
      bags_paper: data.recycleBags['paper'] ? data.recycleBags['paper'].value : null,
      bags_plastic: data.recycleBags['plastic'] ? data.recycleBags['plastic'].value : null,
      bags_glass: data.recycleBags['glass'] ? data.recycleBags['glass'].value : null,
      bags_organic: data.recycleBags['organic'] ? data.recycleBags['organic'].value : null,

      gas_type: data.gasType,
      gas_spend: data.gasSpend,

      useWood: data.useWood,

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

  return query.id;
}

export const setFormCookies = (id: string) => {
  cookies().set('g2c_formToken', id, {
    secure: true
  })
}

export const checkFormCookies = () => {
  const formCookies = cookies().get('g2c_formToken')

  return formCookies ? formCookies.value : false;
}