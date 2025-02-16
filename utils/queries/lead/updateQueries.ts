import {
  LeadOnBoardingUpdateStageType,
  LeadUpdateRequestType,
} from "@/types/lead";
import axios from "axios";

export async function updateALead(lead: LeadUpdateRequestType) {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/leads/update`,
      lead
    );
    if (response.data.statusCode === 200) {
      return { status: 200, data: response.data };
    } else {
      return { status: 400, error: response.data };
    }
  } catch (error) {
    return { status: 400, error };
  }
}

export async function updateALeadWithEmail(
  clientDetails: LeadOnBoardingUpdateStageType
) {
  try {
    const client = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/leads/update`,
      clientDetails
    );

    if (client.data.statusCode === 200) {
      return { status: 200, data: client.data };
    } else {
      return { status: 400, error: client.data };
    }
  } catch (error) {
    return { status: 400, error };
  }
}
