import { OnBoardingClientNoteType, OnBoardingClientRequestType } from "@/types/onBoardingClients";
import { ClientResponse } from "@/types/response";
import axios from "axios";

export async function createAOnBoardingClient(
  clientDetails: OnBoardingClientRequestType
) {

  try {
    const client: ClientResponse = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/onboarding/create`,
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

export async function addOnBoardingClientNote(
  onBoardingClientID: string,
  clientNoteDetails: OnBoardingClientNoteType
) {
  try {
    const client: ClientResponse = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/onboarding/add/note/${onBoardingClientID}`,
      data: clientNoteDetails,
    });
    if (client.data.statusCode !== 200) {
      return { status: 400, error: client.message };
    }
    return { status: 200, data: client };
  } catch (error) {
    return { status: 400, error };
  }
}



export async function updateOnBoardingStage(
  clientDetails: OnBoardingClientRequestType
) {
  try {
    const client = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/onboarding/update`,
      data: clientDetails,
    });
    if (client.data.statusCode === 200) {
      return { status: 200, data: client.data };
    } else {
      return { status: 400, data: client.data };
    }
  } catch (error) {
    return { status: 400, error };
  }
}

export async function updateOnBoardingClientOnConsentStage(
  clientDetails: OnBoardingClientRequestType
) {
  try {
    const client = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/onboarding/update`,
      data: clientDetails,
    });
    if (client.data.statusCode === 200) {
      return { status: 200, data: client.data };
    } else {
      return { status: 400, error: client.data };
    }
  } catch (error) {
    return { status: 400, error };
  }
}

export async function updateOnBoardingClientEFDMSStage(
  clientDetails: OnBoardingClientRequestType
) {
  try {
    const client = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/onboarding/update`,
      data: clientDetails,
    });

    if (client.data.statusCode === 200) {
      return { status: 200, data: client.data };
    } else {
      return { status: 400, error: client.data };
    }
  } catch (error) {
    return { status: 400, error };
  }
}

export async function updateOnBoardingClientOnBoardStage(
  clientDetails: OnBoardingClientRequestType
) {
  try {
    const client = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/onboarding/update`,
      data: clientDetails,
    });

    if (client.data.statusCode === 200) {
      return { status: 200, data: client.data };
    } else {
      return { status: 400, error: client.data };
    }
  } catch (error) {
    return { status: 400, error };
  }
}
