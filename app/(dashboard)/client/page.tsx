import OnBoardedClientView from "@/components/v1/client/onboarded-client";
import { getAllClients } from "@/utils/queries/queries";

const ClientPage = async () => {
    const response = await getAllClients();
    if (response.status !== 200) {
        return <div>Something went wrong</div>;
    }
    return <OnBoardedClientView clients={response.data.data} />;

}

export default ClientPage;