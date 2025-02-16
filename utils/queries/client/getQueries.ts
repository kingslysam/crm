import axios from "axios";

export async function getAllClients() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/clients/all`
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

export async function getAClientFromClientID(clientID: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/clients/single/id/${clientID}`
    );

    if (response.data.statusCode === 200) {
      return { status: 200, data: response.data };
    }
    return { status: 400, data: response.data };
  } catch (error) {
    return { status: 400, data: error };
  }
}
