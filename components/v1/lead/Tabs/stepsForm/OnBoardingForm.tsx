import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { createAClient } from "@/utils/queries/createQueries";
import LoadingButton from "@mui/lab/LoadingButton";
import { getUserFullNameFromCookie } from "@/utils/cookies";
import { LeadResponseType } from "@/types/lead";
import { updateALead } from "@/utils/queries/lead/updateQueries";
import { formatCurrency } from "@/utils/formatting";
import LeadComment from "./LeadComment";
import { duration } from "moment";
import toast from "react-hot-toast";

const OnBoardingForm = ({ lead }: { lead: LeadResponseType }) => {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onUpdateUserToOnBoarding = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    const today = new Date();
    const response = await createAClient({
      leadID: lead.leadID,
      dateOnBoarded: today,
      emailUsedForComms: lead?.emailAddress,
      emailUsedForLogin: lead?.emailAddressForLogin,
      fullName: lead?.fullName,
      companyName: lead?.companyName,
      address: lead?.address,
      businessCategory: lead?.businessCategory,
      phoneNumber: lead?.phoneNumber,
      certificatePassword: lead?.certificatePassword,
      service: lead?.clientSimplifyService,
      tin: lead?.tin,
      vrn: lead?.vrn,
      isActivated: true,
      isBlocked: false,
      isVip: lead.vip,
    });
    if (response.status === 200) {
      setLoading(false);
      const response = await updateALead({
        leadID: lead.leadID,
        onBoardingStage: "OnBoarding",
        status: "On Boarded",
        updatedBy: getUserFullNameFromCookie(),
      });
      if (response.status === 200) {
        toast.success("Lead has been updated", {
          position: "top-right",
          duration: 1500
        });
        setOpen(false);
        window.location.reload();
      }
    } else {
      setLoading(false);
      toast.error("Failed to updated a Lead", {
        position: "top-right",
        duration: 1500
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 space-x-5 mb-5">
          <div className="flex flex-row gap-x-3 mb-2">
            <Button
              fullWidth
              href={`${lead.documentLink}`}
              target="_blank"
              variant="contained"
            >
              Google Link
            </Button>
          </div>
          <LoadingButton
            fullWidth
            loading={loading}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              setOpen(true)
            }
            variant="contained"
            sx={{
              backgroundColor: "#BBF7D0",
              color: "#000000",
              "&:hover": {
                backgroundColor: "#94c3a5",
                color: "#ffffff",
              },
            }}
          >
            Complete OnBoarding
          </LoadingButton>
        </div>
      <Divider />

      <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-200">
        <div className="space-y-2 col-span-full lg:col-span-1">
          <p className="font-bold">Client Information</p>
        </div>
        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div className="col-span-full sm:col-span-3">
            <p className="font-bold">Full Name</p>
            {lead?.fullName}
          </div>
          <div className="col-span-full sm:col-span-3">
            <p className="font-bold">Company Name</p>
            {lead?.companyName}
          </div>
          <div className="col-span-full sm:col-span-3">
            <p className="font-bold">Email Used For Communication</p>
            <a href={`mailto:${lead?.emailAddress}`}>{lead?.emailAddress}</a>
          </div>
          <div className="col-span-full sm:col-span-3">
            <p className="font-bold">Email Used For Login</p>
            <a href={`mailto:${lead?.emailAddressForLogin}`}>
              {lead?.emailAddressForLogin}
            </a>
          </div>
          <div className="col-span-full sm:col-span-3">
            <p className="font-bold">Phone Number</p>
            <a href={`tel:+${lead?.phoneNumber}`}>{lead?.phoneNumber}</a>
          </div>

          <div className="col-span-full sm:col-span-3">
            <p className="font-bold">TIN</p>
            {`${lead?.tin.slice(0, 3)}-${lead?.tin.slice(
              3,
              6
            )}-${lead?.tin.slice(6)}`}
          </div>
        </div>
      </fieldset>

      <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm mt-2 bg-gray-200">
        <div className="space-y-2 col-span-full lg:col-span-1">
          <p className="font-bold">Company Information</p>
        </div>
        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div className="col-span-full sm:col-span-3">
            <p className="font-bold">Company Name</p>
            {lead?.companyName}
          </div>
          <div className="col-span-full sm:col-span-3">
            <p className="font-bold">Company Address</p>
            {lead?.address}
          </div>
          <div className="col-span-full sm:col-span-3">
            <p className="font-bold">TIN</p>
            {`${lead?.tin.slice(0, 3)}-${lead?.tin.slice(
              3,
              6
            )}-${lead?.tin.slice(6)}`}
          </div>
          <div className="col-span-full sm:col-span-3">
            <p className="font-bold">VRN</p>
            <p>{lead?.vrn === "" ? "N/A" : lead?.vrn}</p>
          </div>
          <div className="col-span-full sm:col-span-3">
            <p className="font-bold">Business Category</p>
            <p>{lead?.businessCategory}</p>
          </div>
          <div className="col-span-full sm:col-span-3">
            <p className="font-bold">Amount Paid</p>
            <p>{formatCurrency(Number(lead?.amountPaid))}</p>
          </div>
          <div className="col-span-full sm:col-span-3">
            <p className="font-bold">Serial Number</p>
            <p>{lead?.serialNumber}</p>
          </div>
          <div className="col-span-full sm:col-span-3">
            <p className="font-bold">Certificate Password</p>
            <p>{lead?.certificatePassword}</p>
          </div>
          <div className="col-span-full sm:col-span-3">
            <p className="font-bold">Invoice Number</p>
            <p>{lead?.invoiceNumber}</p>
          </div>
          <div className="col-span-full sm:col-span-3">
            <p className="font-bold">Receipt Verification Code</p>
            <p>{lead?.receiptVerificationCode}</p>
          </div>
        </div>
      </fieldset>

      <div className="grid grid-cols-3 gap-x-6 gap-y-3 py-6">
       
        <div className="col-span-3">
          <Divider>Lead Comments</Divider>
        </div>

        <div className="col-span-3">
          <LeadComment
            onBoardingClientID={String(lead.leadID)}
            onBoardingClientNote={[
              {
                note: "",
                createdBy: " ",
                createdAt: " ",
                updatedAt: " ",
              },
            ]}
          />
        </div>
      </div>

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirmation of Registration"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Make sure the request is sent to the On-boarded
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onUpdateUserToOnBoarding}>
            Update to OnBoarding
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OnBoardingForm;
