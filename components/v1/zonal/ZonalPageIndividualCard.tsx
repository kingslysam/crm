import { zonesOptions } from "@/data/option";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface ZonalPageIndividualCardProps {
  id: string;
  zone: string;
  totalLeads: number;
  totalClients: number;
  totalSalesPerson: number;
  totalRevenue: number;
  zoneManager: string;
}

const ZonalPageIndividualCard = ({
  pageData,
}: {
  pageData: ZonalPageIndividualCardProps;
}) => {
  const router = useRouter()
  return (
    <>
      <div className="flex px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <span className="hidden sm:inline-block" aria-hidden="true">
          &#8203;
        </span>

        <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
          <div>
            <div className="mt-2 text-center">
              <h3
                className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                id="modal-title"
              >
                {pageData.zone}
              </h3>
              <div className="grid grid-cols-2">
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Total Leads: {pageData.totalLeads}
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Total Clients: {pageData.totalClients}
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Total Sales Person: {pageData.totalSalesPerson}
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Total Revenue: {pageData.totalRevenue}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="sm:flex sm:items-center ">
              <a href={`/zonal/${pageData.zone.toLowerCase()}`} className="w-full">
                <Button
                  fullWidth
                  variant="contained"
                  className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-md sm:w-auto sm:mt-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                >
                  View Zone
                </Button>
              </a>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ZonalPageIndividualCard;
