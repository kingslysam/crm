import { LeadResponseType } from "@/types/lead";
import dayjs from "dayjs";


export function groupLeadsByStatusAndDate(
  leads: LeadResponseType[],
  startDate: Date,
  endDate: Date
) {

  const start = new Date(startDate);
  const end = new Date(endDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);



  if (start.getTime() === end.getTime()) {
    start.setDate(start.getDate() - 1);
  }


  const weekLeads = leads.filter(
    (lead) => {
  const leadDate = new Date(lead.date);

  // Set time to midnight to ignore time components
  leadDate.setHours(0, 0, 0, 0);

  return leadDate >= start && leadDate <= end;
}
  );

  const today = leads.filter(
      (lead) => new Date(lead.date) === startDate
  )

  console.log(">>>>>>>>>>n Today", today)

  const calculateMetrics = (leads: LeadResponseType[]) => {
    const totalLeads = leads.length;
    const onboarded = leads.filter(
      (lead) => lead.status === "On Boarded"
    ).length;
    const futureClient = leads.filter(
      (lead) => lead.status === "Future Client"
    ).length;
    const hesitant = leads.filter((lead) => lead.status === "Hesitant").length;
    const onprocess = leads.filter(
      (lead) => lead.status === "On Process"
    ).length; 
    const revenue = onboarded * 180000;
    const conversion = totalLeads === 0 ? 0 : (onboarded / totalLeads) * 100;


     const leadsAddedInThisTimeVsPeriodBefore = leads.filter(
       (lead) =>
         new Date(lead.createdAt) < startDate && lead.status === "On Boarded" ).length;

    return {
      onboarded,
      onprocess,
      futureClient,
      hesitant,
      revenue,
      conversion,
      totalLeads,
      leadsAddedInThisTimeVsPeriodBefore,
    };
  };

  const allZoneMetrics = calculateMetrics(weekLeads);

  const leadsByZone = weekLeads.reduce((acc, lead) => {
    if (!acc[lead.zone]) {
      acc[lead.zone] = [];
    }
    acc[lead.zone].push(lead);
    return acc;
  }, {} as Record<string, LeadResponseType[]>);

  const zoneMetrics = Object.keys(leadsByZone).map((zone) => {
    const metrics = calculateMetrics(leadsByZone[zone]);
    return {
      zone,
      metrics,
    };
  });

  return [{ zone: "All", metrics: allZoneMetrics }, ...zoneMetrics];
}

