import { LeadResponseType } from "@/types/lead";
import { format, parseISO, subMonths } from "date-fns";

export const calculateUserMonthlyChartData = (
  leads: LeadResponseType[],
  userFullName: string
) => {
  const monthlyData: any = {};

  const now = new Date();
  const months = Array.from({ length: 12 }, (_, i) =>
    format(subMonths(now, i), "yyyy-MM")
  ).reverse();

  months.forEach((month) => {
    monthlyData[month] = { futureClients: 0, onProcess: 0, onBoarded: 0, hesitant: 0 };
  });

  leads
    .filter((lead) => lead.addedBy === userFullName)
    .forEach((lead) => {
      const month = format(parseISO(lead.date), "yyyy-MM");
      if (monthlyData[month]) {
        if (lead.status === "Future Client") {
          monthlyData[month].futureClients++;
        } else if (lead.status === "On Process") {
          monthlyData[month].onProcess++;
        } else if (lead.status === "On Boarded") {
          monthlyData[month].onBoarded++;
        } else if (lead.status === "Hesitant") {
          monthlyData[month].hesitant++;
        }
      }
    });


  return months.map((month) => ({
    month,
    futureClients: monthlyData[month].futureClients,
    onProcess: monthlyData[month].onProcess,
    onBoarded: monthlyData[month].onBoarded,
    hesitant: monthlyData[month].hesitant,
  }));
};
