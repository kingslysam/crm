import { supabase } from "@/utils/supabase";
import axios from "axios";
import clientData from  '../../public/dummyData/clients.json'

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
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 404) {
        return { status: 404, data: "Not Found" };
      } else {
        return { status, data: error.response.data };
      }
    } else {
      return { status: 500, data: "Network or unexpected error" };
    }
  }
}

export async function getAllClientsLocal() {
  try {
    const response = clientData
    if (response.statusCode === 200) {
      return { status: 200, data: response.data };
    } else {
      return { status: 400, data: response.data };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 404) {
        return { status: 404, data: "Not Found" };
      } else {
        return { status, data: error.response.data };
      }
    } else {
      return { status: 500, data: "Network or unexpected error" };
    }
  }
}

export async function getAleadFromNameOrEmail(nameOrEmail: string) {
  const { data, error } = await supabase
    .from("lead")
    .select()
    .or(`emailAddress.ilike.%${nameOrEmail}%,fullName.ilike.%${nameOrEmail}%`)
    .limit(1);

  if (data !== null || error === null) {
    return { status: 200, data };
  } else {
    return { status: 400, error };
  }
}

export async function getAClientFromClientID(clientID: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/clients/single/id/${clientID}`
  );
  return response.data;
}
