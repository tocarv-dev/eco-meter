export interface Surveys {
    id: string,
    userid: string,

    gender: string,
    age: number,
    municipality: string,
    
    home_residents: number, 
    home_eletricity: number,
    
    meals_whitemeat: number,
    meals_redmeat: number,
    meals_vegan: number,
    
    flights_hour: number,
    flights_short: number,
    flights_medium: number,
    flights_long: number,
    
    bags_unsorted: number,
    bags_paper: number,
    bags_plastic: number,
    bags_glass: number,
    bags_organic: number,
    
    gas_type: string,
    gas_spend: number,
    
    useWood: boolean,
    
    transport_dieselCar: number,
    transport_gasCar: number,
    transport_hybridCar: number,
    transport_gplCar: number,
    transport_eletricCar: number,
    transport_motorcycle: number,
    transport_taxi: number,
    transport_train: number,
    transport_bus: number,
    transport_subway: number,
    transport_tram: number,
    transport_ferryFoot: number,
    transport_ferryCar: number,
    
    profile: string,
}