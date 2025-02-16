import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
  createMRTColumnHelper,
} from "material-react-table";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useState } from "react";
import UpdateLeads from "./UpdateLead";
import { formatDateForLeadsTable } from "@/utils/formatting";
import EditIcon from "@mui/icons-material/Edit";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import OnBoardingTab from "./Tabs/OnBoardingTab";
import { LeadTableType } from "@/types/lead";

const columnHelper = createMRTColumnHelper<LeadTableType>();

const columns = [
  columnHelper.accessor("date", {
    header: "Date",
    size: 120,
    Cell: ({ cell }) => <span>{formatDateForLeadsTable(cell.getValue())}</span>,
  }),
  columnHelper.accessor("fullName", {
    header: "Full Name",
    size: 200,
  }),
  columnHelper.accessor("tin", {
    header: "TIN",
    size: 120,
  }),
  columnHelper.accessor("phoneNumber", {
    header: "Phone Number",
    size: 120,
  }),
  columnHelper.accessor("emailAddress", {
    header: "Email Address",
    size: 120,
  }),
  columnHelper.accessor("companyName", {
    header: "Company",
    size: 180,
  }),
  columnHelper.accessor("addedBy", {
    header: "Added By",
    size: 180,
  })
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

// @ts-ignore
const LeadsTable = ({ leads }) => {
  const [onBoardingOpenModal, setOnBoardingOpenModal] =
    useState<boolean>(false);
  const [updateOpenModal, setUpdateOpenModal] = useState<boolean>(false);
  const [rowLead, setRowLead] = useState<any>();
  const [resetFormKey, setResetFormKey] = useState<number>(0); // New state to force reset

  const handleExportRows = (rows: MRT_Row<LeadTableType>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(leads);
    download(csvConfig)(csv);
  };

  const handleCloseOnBoardingModal = () => {
    setResetFormKey((prevKey) => prevKey + 1);
    setOnBoardingOpenModal(false);
  };

  const handleCloseUpdateModal = () => {
    setUpdateOpenModal(false);
  };

  const table = useMaterialReactTable({
    columns,
    data: leads || [],
    enableFullScreenToggle: false,
    enableRowSelection: true,
    enableRowActions: true,
    muiPaginationProps: {
      rowsPerPageOptions: [10],
      color: "primary",
      shape: "rounded",
      showRowsPerPage: false,
      variant: "outlined",
    },
    renderEmptyRowsFallback: ({ table }) => (
      <>
        <p>Please Wait...</p>
      </>
    ),
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      <>
        <IconButton
          color="primary"
          onClick={() => {
            setRowLead(row.original);
            setUpdateOpenModal(true);
          }}
        >
          <EditIcon />
        </IconButton>
        {row.original.status !== "On Boarded" && (
          <>
            {" "}
            <IconButton
              color="primary"
              onClick={() => {
                setRowLead(row.original);
                setOnBoardingOpenModal(true);
              }}
            >
              <AirplaneTicketIcon />
            </IconButton>
          </>
        )}
      </>
    ),
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <div className="flex gap-2 p-2 flex-wrap">
        <Button onClick={handleExportData} startIcon={<FileDownloadIcon />}>
          Export All Data
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </div>
    ),
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={updateOpenModal}
        keepMounted
        onClose={handleCloseUpdateModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="flex items-center justify-between">
          Update Lead
          <Button onClick={handleCloseUpdateModal}>Cancel</Button>
        </DialogTitle>
        <DialogContent className="h-full" dividers>
          <UpdateLeads lead={rowLead} />
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={onBoardingOpenModal}
        keepMounted
        onClose={handleCloseOnBoardingModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="flex items-center justify-between">
          OnBoard A Lead
          <Button onClick={handleCloseOnBoardingModal}>Cancel</Button>
        </DialogTitle>
        <DialogContent className="h-full" dividers>
          <OnBoardingTab lead={rowLead} resetFormKey={resetFormKey} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeadsTable;
