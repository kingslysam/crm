import LeadsViewPage from "@/components/v1/lead/leads-page-view";
import { getAllLeads } from "@/utils/queries/lead/getQueries";
import { getAllClients } from "@/utils/queries/queries";

const LeadsPage = async () => {
  const leads = await getAllLeads();
  const clients = await getAllClients();
  return (
    <div>
      <LeadsViewPage leads={leads.data.data} clients={clients.data.data} />
    </div>
  );
};

export default LeadsPage;
