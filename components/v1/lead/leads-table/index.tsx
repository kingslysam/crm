import { Fragment } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { LeadResponseType } from "@/types/lead";
interface LeadsTableProps {
  leads: LeadResponseType[];
}

export default function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <Fragment>
      <DataTable
        data={leads}
        columns={columns}
      />
    </Fragment>
  );
}
