import axios from "axios";
import { ClientInterface } from "@/types/client";
import { ClientResponse } from "@/types/response";


export async function createAClient(
  clientDetails: ClientInterface
) {
  try {
    const client: ClientResponse = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/clients/create`,
      data: clientDetails,
    });
    if (client.data.statusCode !== 200) {
      return { status: 400, error: client.message };
    }
    return { status: 200, data: client };
  } catch (error) {
    return { status: 400, error };
  }
}