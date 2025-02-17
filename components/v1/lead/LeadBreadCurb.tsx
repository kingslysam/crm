import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import NewLeads from "./NewLeads";
import { ClientInterface } from "@/types/client";
import CancelIcon from "@mui/icons-material/Cancel";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

const LeadBreadCurb = ({
  title,
  client,
}: {
  title: string;
  client: ClientInterface[];
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const newLeadModalHandler = () => {
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
            New Lead
            <IconButton color="primary" onClick={handleClose}>
              <CancelIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className="h-full" dividers>
            <NewLeads client={client} />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  return (
    <div className="flex justify-between flex-wrap items-center mb-6">
      <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
        {title}
      </h4>
      <div className="flex sm:space-x-4 space-x-2 sm:justify-end items-center rtl:space-x-reverse">
        <Button
          onClick={handleClickOpen}
          className="date-btn inline-flex btn btn-md whitespace-nowrap space-x-2 rtl:space-x-reverse cursor-pointer bg-blue-500 btn-md h-min text-sm font-normal text-white"
        >
          <span className="text-lg">
            <Icon icon="heroicons:plus" />
          </span>
          <span>New Lead</span>
        </Button>
        {newLeadModalHandler()}
      </div>
    </div>
  );
};

export default LeadBreadCurb;
