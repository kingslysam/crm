"use client";
import { Row } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button as ViewButton } from "@/components/ui/button";
import { Icon } from '@iconify/react';
import IndividualClientView from "../../individual-client-view";

interface DataTableRowActionsProps {
  row: Row<any>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-4 ">
      <Dialog>
        <DialogTrigger asChild>
          <ViewButton
            size="icon"
            className="h-9 w-9 rounded bg-default-100 dark:bg-default-200 text-default-500 hover:text-primary-foreground"

          >
            <Icon icon="heroicons:eye" className="w-5 h-5" />
          </ViewButton>
        </DialogTrigger>
        <DialogContent size="5xl" overlayClass=" bg-gradient-to-b from-background/60 to-primary/30" className="overflow-y-auto max-h-screen p-0 no-scrollbar">
          <div className="h-[700px] sm:h-[800px] w-full">
            <Card className="w-full max-w-5xl mx-auto bg-white p-8">
              <CardContent>
                <IndividualClientView client={row.original} />
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>

  );
}
