import { SalesPersonInterface } from "@/types/user";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import { useState } from "react";
import NewSalesPerson from "./NewSalesPerson";
import CancelIcon from "@mui/icons-material/Cancel";
import SalesPersonDetails from "./SalesPersonDetails";
import SalesPersonClientTable from "./SalesPersonClientTable";
import { LeadType } from "@/types/supabase";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <>
      {" "}
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <div className="p-3">{children}</div>}
      </div>
    </>
  );
}

const SalesPersonTable = ({
  salesPersons,
  leads
}: {
  salesPersons: SalesPersonInterface[], leads: Record<string, LeadType[]>;
}) => {
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [value, setValue] = useState(0);
  const [selectedSalesPerson, setSelectedSalesPerson] =
    useState<SalesPersonInterface | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDetail = (salesPerson: SalesPersonInterface) => {
    setSelectedSalesPerson(salesPerson);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setSelectedSalesPerson(null);
  };

  const newSalesPersonHandler = () => {
    return (
      <>
        <Dialog
          fullWidth={true}
          maxWidth="lg"
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle className="flex items-center justify-between">
            New Sales Person
            <IconButton color="primary" onClick={handleClose}>
              <CancelIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className="h-full" dividers>
            <NewSalesPerson />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const salesPersonDetailHandler = (salesPerson: SalesPersonInterface) => {
    return (
      <>
        <Dialog
          fullWidth={true}
          maxWidth="lg"
          open={openDetail}
          keepMounted
          onClose={handleCloseDetail}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle className="flex items-center justify-between">
            {salesPerson.fullName}
            <IconButton color="primary" onClick={handleClose}>
              <CancelIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className="h-full" dividers>
            <div className="w-full">
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Person Details" />
                <Tab label="Leads" />
                <Tab label="Clients" />
              </Tabs>
              <CustomTabPanel value={value} index={0}>
                <div className="flex items-center justify-center">
                  <SalesPersonDetails salesPerson={salesPerson} />
                </div>
              </CustomTabPanel>
            </div>

          </DialogContent>
        </Dialog>
      </>
    );
  };
  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center justify-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Salesperson
            </h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {salesPersons.length} Salespersons
            </span>
          </div>
        </div>

        <div className="flex items-center mt-4 gap-x-3">
          <Button
            variant="contained"
            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
            onClick={handleClickOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Add Sales Person</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <span>Full Name</span>
                    </th>

                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Email
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Phone
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Target
                    </th>

                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {salesPersons.map((salesPerson) => (
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white ">
                            {salesPerson.fullName}
                          </p>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                        <p className="font-medium text-gray-800 dark:text-white ">
                          {salesPerson.email}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">
                            {salesPerson.phoneNumber}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                            {salesPerson.isActivated ? "Active" : "Inactive"}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="w-48 h-1.5 bg-blue-200 overflow-hidden rounded-full">
                          <div className="bg-blue-500 w-2/3 h-1.5"></div>
                        </div>{" "}
                        <p className="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                          {salesPerson.target}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
                          onClick={() => handleClickOpenDetail(salesPerson)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {newSalesPersonHandler()}
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={openDetail}
        keepMounted
        onClose={handleCloseDetail}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="flex items-center justify-between">
          {selectedSalesPerson?.fullName}
          <IconButton color="primary" onClick={handleCloseDetail}>
            <CancelIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="h-full" dividers>
          {selectedSalesPerson && (
            <div className="w-full">
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Person Details" />
                <Tab label="Leads" />
                <Tab label="Clients" />
              </Tabs>
              <CustomTabPanel value={value} index={0}>
                <div className="flex items-center justify-center">
                  <SalesPersonDetails salesPerson={selectedSalesPerson} />
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className="flex items-center justify-center">
                  <SalesPersonClientTable leads={leads["Hesitant"].filter((lead) => lead?.addedBy.toLowerCase() === selectedSalesPerson?.fullName.toLowerCase())} />
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <div className="flex items-center justify-center">
                  <SalesPersonClientTable leads={leads["On Boarded"].filter((lead) => lead?.addedBy.toLowerCase() === selectedSalesPerson?.fullName.toLowerCase())} />
                </div>
              </CustomTabPanel>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesPersonTable;
