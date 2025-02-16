"use client";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Row } from "@tanstack/react-table";
import IndividualLeadView from "../../individual-leads-view";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Icon } from "@iconify/react";
import OnBoardingTab from "../../Tabs/OnBoardingTab";
// import IndividualClientView from "../../individual-client-view";

interface DataTableRowActionsProps {
  row: Row<any>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [onBoardingOpenModal, setOnBoardingOpenModal] =
    useState<boolean>(false);
  const [updateOpenModal, setUpdateOpenModal] = useState<boolean>(false);
  const [resetFormKey, setResetFormKey] = useState<number>(0); // New state to force reset


  const handleCloseOnBoardingModal = () => {
    setResetFormKey((prevKey) => prevKey + 1);
    setOnBoardingOpenModal(false);
  };

  const handleCloseUpdateModal = () => {
    setUpdateOpenModal(false);
  };

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-4 ">
      <div className="flex flex-row gap-x-1">
        <Button
          size="icon"
          className="h-9 w-9 rounded bg-default-100 dark:bg-default-200 text-default-500 hover:text-primary-foreground"
          onClick={() => setUpdateOpenModal(true)}
        >
          <Icon icon="heroicons:eye" className="w-5 h-5" />
        </Button>
        {row.original.status === "On Process" && (
          <Button
            size="icon"
            className="h-9 w-9 rounded bg-default-100 dark:bg-default-200 text-default-500 hover:text-primary-foreground"
            onClick={() => setOnBoardingOpenModal(true)}
          >
            <Icon icon="heroicons:paper-airplane" className="w-5 h-5" />
          </Button>
        )}
      </div>
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
          <IndividualLeadView lead={row.original} />
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
          <OnBoardingTab lead={row.original} resetFormKey={resetFormKey} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
