import { LeadResponseType } from "@/types/lead";

interface LocalLeadInterface {
  statusCode: number;
  message: string;
  data: LeadResponseType[];
}

export async function getAllLeadsLocal() {
  const response: any = fetch("/dummyData/leads.json")
    .then((res) => res.json())
    .then((d) => d as LocalLeadInterface);

  return response;
}
