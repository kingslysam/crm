import axios from "axios";
import { ClientInterface, ClientNoteRequestInterface } from "@/types/client";
import { ClientResponse } from "@/types/response";

export async function createAClient(clientDetails: ClientInterface) {
  try {
    const client: ClientResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/clients/create`,
      clientDetails
    );
    if (client.data.statusCode !== 200) {
      return { status: 400, error: client.message };
    }
    return { status: 200, data: client };
  } catch (error) {
    return { status: 400, error };
  }
}

export async function addAClientNote(
  clientID: string,
  clientDetails: ClientNoteRequestInterface
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/clients/create-note/${clientID}`,
      clientDetails
    );
    if (response.data.statusCode !== 200) {
      return { status: 400, error: response.data };
    }
    return { status: 200, data: response };
  } catch (error) {
    return { status: 400, error };
  }
}
