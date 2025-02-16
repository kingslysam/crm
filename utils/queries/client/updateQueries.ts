import { UpdateClientRequestInterface } from "@/types/client";
import axios from "axios";

export async function updateClient(
  clientID: string,
  updateClientData: UpdateClientRequestInterface
) {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/clients/update/${clientID}`,
      updateClientData
    );
    if (response.data.statusCode !== 200) {
      return { status: 400, error: response.data };
    }
    return { status: 200, data: response.data };
  } catch (error) {
    return { status: 400, error };
  }
}
