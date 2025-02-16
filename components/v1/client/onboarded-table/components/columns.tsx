"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import { ClientResponseInterface } from "@/types/client";
import { formatDateForLeadsTable } from "@/utils/formatting";

export const columns: ColumnDef<ClientResponseInterface>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "dateOnBoarded",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date " />
    ),
    cell: ({ row }) => <div className="w-[80px]">{formatDateForLeadsTable(row.original?.dateOnBoarded)}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original?.fullName?.toUpperCase()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "companyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original?.companyName?.toUpperCase()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "emailUsedForComms",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email Used For Communication" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original?.emailUsedForComms}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "tin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TIN" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("tin")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.original?.phoneNumber}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "isActivated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Activation Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[50px] items-center">
          <span className={`rounded-full ${row.original?.paymentStatus?.toLowerCase() === "blocked" ? "bg-red-400" : row.original?.paymentStatus?.toLowerCase() === "invoiced" ? "bg-violet-400" : "bg-green-400"}  text-white px-2 py-0.5 text-xs`}>{row.original?.paymentStatus}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
