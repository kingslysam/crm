import { ContactType } from "@/types/contact";
import axios from "axios";

export async function createAContact(
    contact: ContactType
  ) {
    try {
      const response: any = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/xero/create/contact`,
        data: contact,
      });
      if (response.data.statusCode !== 200) {
        return { status: 400, error: response.message };
      }
      return { status: 200, data: response };
    } catch (error) {
      return { status: 400, error };
    }
  }