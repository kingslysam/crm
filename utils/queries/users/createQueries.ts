import axios from "axios";
import { SalesPersonInterface } from "@/types/user";

export async function createASalesPerson(clientDetails: SalesPersonInterface) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/salesperson/create`,
      clientDetails
    );
    if (response.data.statusCode !== 200) {
      return { status: 400, error: response.data };
    }
    return { status: 200, data: response.data };
  } catch (error) {
    return { status: 400, error };
  }
}
