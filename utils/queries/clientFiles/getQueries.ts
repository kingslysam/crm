import { supabase } from "../../supabase";

export async function getVFDLetterDownload(companyName: string | null) {
  try {
    const { data, error } = await supabase.storage
      .from("client")
      .createSignedUrl(`${companyName}/consentLetter`, 60);
    if (error) {
      return { status: 400, error };
    }
    return { status: 200, data };
  } catch (error) {
    window.alert("Error" + error);
  }
}

export async function getClientIDDownload(companyName: string | null) {
  try {
    const { data, error } = await supabase.storage
      .from("client")
      .createSignedUrl(`${companyName}/clientID`, 60);
    if (error) {
      return { status: 400, error };
    }
    return { status: 200, data };
  } catch (error) {
    window.alert("Error" + error);
  }
}

export async function getYellowCertificate(companyName: string | null) {
  try {
    const { data, error } = await supabase.storage
      .from("client")
      .createSignedUrl(`${companyName}/yellowCertificate`, 60);
    if (error) {
      return { status: 400, error };
    }
    return { status: 200, data };
  } catch (error) {
    window.alert("Error" + error);
  }
}

export async function getTraCertificate(
  companyName: string | null,
  serialNumber: string | null
) {
  try {
    const { data } = await supabase.storage
      .from("client")
      .createSignedUrl(`${companyName}/${serialNumber}.pfx`, 60);

    return { status: 200, data };
  } catch (error) {
    window.alert("Error" + error);
  }
}
