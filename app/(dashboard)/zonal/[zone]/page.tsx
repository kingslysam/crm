import NoDataComponent from "@/components/common/NoData";
import ServerError from "@/components/common/ServerError";
import IndividualZoneView from "@/components/v1/zonal/pages/IndividualZoneView";
import { getAllLeadsByZone } from "@/utils/queries/lead/getQueries";
import { getSalesPersonByZone } from "@/utils/queries/users/getQueries";

const IndividualZonePage = async ({
  params,
}: {
  params: Promise<{ zone: string }>;
}) => {

  const zonalLeads = await getAllLeadsByZone((await params).zone);

  if (zonalLeads.status === 200) {
    const salesPerson = await getSalesPersonByZone((await params).zone);
    if (salesPerson.status === 200) {
      return (
        <IndividualZoneView
          leads={zonalLeads.data.data}
          salesPersons={salesPerson.data.data}
          zone={(await params).zone}
        />
      );
    } else {
      <IndividualZoneView leads={zonalLeads.data.data} salesPersons={[]} zone={(await params).zone}/>;
    }
  } else if (zonalLeads.status === 404) {
    return <NoDataComponent />;
  } else {
    return <ServerError />;
  }
};

export default IndividualZonePage;
