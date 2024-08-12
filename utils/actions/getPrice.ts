"use server";

export const getPrice = async (countryCode: any) => {

    const response = await fetch(`https://api.energy-charts.info/price?bzn=${countryCode}`);

    const result = await response.json();
    
    return result;

}