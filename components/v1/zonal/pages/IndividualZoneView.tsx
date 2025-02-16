"use client";
import { LeadType } from "@/types/supabase";
import LeadsTab from "../../lead/Tabs/LeadsTab";
import SalesPersonTable from "./SalesPersonTable";
import { useEffect, useState } from "react";
import LoadingComponent from "@/components/common/Loading";
import { SalesPersonInterface } from "@/types/user";
import IndividualZoneStats from "./IndividualZoneStats";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DatePickerWithRange, { DateRange } from "@/components/date-picker-with-range";



const IndividualZoneView = ({
  leads,
  salesPersons,
  zone
}: {
  leads: LeadType[];
  salesPersons: SalesPersonInterface[];
  zone: string
}) => {
  const [groupLeads, setGroupLeads] = useState<Record<string, LeadType[]>>({});
  const [totalLeads, setTotalLeads] = useState<number>(0);
  const [onProcessCount, setOnProcessCount] = useState<number>(0);
  const [hesitantCount, setHesitantCount] = useState<number>(0);
  const [futureClientCount, setFutureClientCount] = useState<number>(0);
  const [onBoardedCount, setOnBoardedCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [filteredLeads, setFilteredLeads] = useState<LeadType[]>(leads);

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      const fromTime = dateRange.from.getTime();
      const toTime = dateRange.to.getTime();
      setFilteredLeads(
        leads.filter((lead) => {
          const leadTime = new Date(lead.date).getTime();
          return leadTime >= fromTime && leadTime <= toTime;
        })
      );
    } else {
      setFilteredLeads(leads);
    }
  }, [dateRange, leads]);

  const processLeadsData = (data: LeadType[]) => {
    const groupedLeads = data.reduce((acc, lead) => {
      const status = lead.status;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(lead);
      return acc;
    }, {} as Record<string, LeadType[]>);

    setGroupLeads(groupedLeads);
    setTotalLeads(data.length);
    setOnProcessCount(groupedLeads["On Process"]?.length || 0);
    setHesitantCount(groupedLeads["Hesitant"]?.length || 0);
    setFutureClientCount(groupedLeads["Future Client"]?.length || 0);
    setOnBoardedCount(groupedLeads["On Boarded"]?.length || 0);
  };

  const fetchAllData = async () => {
    try {
      processLeadsData(filteredLeads);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [filteredLeads]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <div className="flex items-center flex-wrap pb-5 justify-between gap-4">
          <p className="text-2xl font-medium capitalize text-default-800 ">
            {zone} Zone
          </p>
          <DatePickerWithRange selected={dateRange} onSelect={setDateRange} />
        </div>

        <div className="bg-white rounded-lg grid xl:grid-cols-5 drop-shadow-xl lg:grid-cols-2 col-span-1 p-4 gap-3">
          <IndividualZoneStats
            totalLeadsCount={totalLeads}
            onBoardedLeadsCount={onBoardedCount}
            futureClientsCount={futureClientCount}
          />
        </div>
        <div className="flex mt-5">
          <div className="bg-white drop-shadow-lg rounded-lg p-14 w-full">
            <SalesPersonTable salesPersons={salesPersons} leads={groupLeads}/>
          </div>
        </div>

        <div className="bg-white rounded-lg drop-shadow-lg p-4 mt-5">
          <LeadsTab
            onboardedLeads={groupLeads["On Boarded"]}
            onproccessLeads={groupLeads["On Process"]}
            futureClientLead={groupLeads["Future Client"]}
            hesitantLead={groupLeads["Hesitant"]}
          />
        </div>

      </div>
    </LocalizationProvider>
  );
};

export default IndividualZoneView;
