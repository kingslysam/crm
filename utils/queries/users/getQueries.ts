import axios from "axios";

export async function getSalesPersonByZone(zone : string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/salesperson/get/zone?zone=${zone}`
    );
    if (response.data.statusCode === 200) {
      return { status: 200, data: response.data };
    } else {
      return { status: 400, data: response.data };
    }
  } catch (error) {
    return { status: 400, data: error };
  }
}


export async function getSalesPersonsById(salesPersonID: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/salesperson/id/${salesPersonID}`
    );
    if (response.data.statusCode === 200) {
      return { status: 200, data: response.data };
    } else {
      return { status: 400, data: response.data };
    }
  } catch (error) {
    return { status: 400, data: error };
  }
}