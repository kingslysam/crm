import { Fragment } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { ClientResponseInterface } from "@/types/client";
interface OnBoardingTableProps {
  clients: ClientResponseInterface[];
}

export default function OnBoardingTable({ clients }: OnBoardingTableProps) {
  return (
    <Fragment>
      <DataTable
        data={clients}
        columns={columns}
      />
    </Fragment>
  );
}
