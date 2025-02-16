import axios from "axios";

export async function getAllInvoices(companyName: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/xero/invoice/${companyName}`
  );
  return response.data;
}
