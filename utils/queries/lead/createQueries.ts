import { LeadRequestType, LeadUpdateRequestType } from "@/types/lead";
import axios from "axios";

export async function createALead(lead: LeadRequestType) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/leads/create`,
      lead
    );
    if (response.status === 201) {
      return { status: 200, data: response.data };
    } else {
      return { status: 400, error: response.data };
    }
  } catch (error) {
    return { status: 400, error };
  }
}
