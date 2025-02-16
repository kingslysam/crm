import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  getUserEmailFromCookie,
  getUserFullNameFromCookie,
} from "@/utils/cookies";
import { EFDMSSchema } from "@/schema/lead";
import { LeadResponseType } from "@/types/lead";
import {
  updateALead,
  updateALeadWithEmail,
} from "@/utils/queries/lead/updateQueries";
import LeadComment from "./LeadComment";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

const EFDMSForm = ({ lead }: { lead: LeadResponseType }) => {
  const {
    handleSubmit,
    watch,
    setValue: setFormValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EFDMSSchema),
  });

  const [open, setOpen] = useState(false);
  useEffect(() => {
    setFormValue("amountPaid", lead?.amountPaid);
    setFormValue("certificatePassword", lead?.certificatePassword);
    setFormValue("invoiceNumber", lead?.invoiceNumber);
    setFormValue("receiptVerificationCode", lead?.receiptVerificationCode);
    setFormValue("serialNumber", lead?.serialNumber);
  }, [lead]);

  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitOnBoardingClientEFDMSStage = async () => {
    setLoading(true);
    let updatedData;
    if (
      lead.progress === "Payment Pending" &&
      (!lead.amountPaid || lead.amountPaid === 0)
    ) {
      updatedData = {
        progress: "Payment Received",
        emailOnboardingType: "TRA-REQUEST",
        amountPaid: watch("amountPaid"),
        invoiceNumber: watch("invoiceNumber"),
        receiptVerificationCode: watch("receiptVerificationCode"),
        assignedEmail: [
          "caroline.clement@simplify.co.tz",
          "fkileo@simplify.co.tz",
        ],
        assigneeEmail: getUserEmailFromCookie().email,
        assigneeEmailApp: getUserEmailFromCookie().emailApp,
      };
    } else {
      updatedData = {
        progress: "TRA Approved",
        serialNumber: watch("serialNumber"),
        certificatePassword: watch("certificatePassword"),
      };
    }
    const response = await updateALead({
      ...updatedData,
      leadID: lead.leadID,
      onBoardingStage: "EFDMS",
      updatedBy: getUserFullNameFromCookie(),
    });
    if (response.status === 200) {
      setLoading(false);
      toast.success("Lead has been updated", {
        position: "top-right",
        duration: 1500,
      });
      window.location.reload();
    } else {
      toast.error("Failed to updated a Lead", {
        position: "top-right",
        duration: 1500,
      });
      setLoading(false);
    }
  };

  const onUpdateUserToOnBoarding = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    if (
      !watch("serialNumber") ||
      !watch("certificatePassword") ||
      !watch("amountPaid")
    ) {
      setLoading(false);
      toast.error("All fields are required", {
        position: "top-right",
        duration: 1500,
      });
      return;
    }
    const response = await updateALeadWithEmail({
      leadID: lead.leadID,
      onBoardingStage: "OnBoarding",
      updatedBy: getUserFullNameFromCookie(),
      progress: "Awaiting Account Creation",
      emailOnboardingType: "ONBOARD",
      assignedEmail: [
        "emwinchumu@simplify.co.tz",
        "skillagane@simplify.co.tz",
      ],
      assigneeEmail: getUserEmailFromCookie().email,
      assigneeEmailApp: getUserEmailFromCookie().emailApp,
    });
    if (response.status === 200) {
      setLoading(false);
      toast.success("Lead has been updated", {
        position: "top-right",
        duration: 1500,
      });
      setOpen(false);
      window.location.reload();
    } else {
      setLoading(false);
      toast.error("Failed to updated a lead", {
        position: "top-right",
        duration: 1500,
      });
    }
  };


  if (lead) {
    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-2 mb-5">
          <Button
            fullWidth
            disabled={loading}
            href={`${lead?.documentLink}`}
            target="_blank"
            variant="contained"
          >
            Google Link
          </Button>

          {lead?.certificatePassword && (
            <>
              <Button
                fullWidth
                disabled={loading}
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
                Update Status
              </Button>
            </>
          )}
        </div>
        <Divider />

        <form
          onSubmit={handleSubmit(onSubmitOnBoardingClientEFDMSStage)}
          className="grid grid-cols-3 gap-x-6 gap-y-3 py-6"
        >
          <FormControl>
            <InputLabel htmlFor="amount">Amount Paid</InputLabel>
            <OutlinedInput
              label="Amount Paid"
              type="number"
              id="amount"
              error={!watch("amountPaid")}
              startAdornment={
                <InputAdornment position="start">TShs</InputAdornment>
              }
              value={watch("amountPaid")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormValue("amountPaid", Number(e.target.value))
              }
              required
            />
          </FormControl>

          <TextField
            label="Invoice Number"
            type="text"
            focused
            error={!!errors.invoiceNumber}
            helperText={errors.invoiceNumber?.message}
            value={watch("invoiceNumber")}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValue("invoiceNumber", e.target.value)
            }
            required
          />

          <TextField
            label="Receipt Verification Code"
            type="text"
            focused
            error={!!errors.receiptVerificationCode}
            helperText={errors.receiptVerificationCode?.message}
            value={watch("receiptVerificationCode")}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValue("receiptVerificationCode", e.target.value)
            }
            required
          />

          {(lead?.progress === "Payment Received" || lead?.amountPaid) && (
            <>
              <TextField
                label="Serial Number"
                type="text"
                focused
                error={!!errors.serialNumber}
                helperText={errors.serialNumber?.message}
                value={watch("serialNumber")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormValue("serialNumber", e.target.value)
                }
                required
              />

              <TextField
                label="Certificate Password"
                type="text"
                focused
                value={watch("certificatePassword")}
                helperText={errors.certificatePassword?.message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormValue("certificatePassword", e.target.value)
                }
                required
              />
            </>
          )}

          <Divider className="col-span-3" />

          <LeadComment
            onBoardingClientID={String(lead?.leadID)}
            onBoardingClientNote={[
              {
                note: "",
                createdBy: " ",
                createdAt: " ",
                updatedAt: " ",
              },
            ]}
          />

          <div className="pt-4 col-span-3 w-full">
            {loading ? (
              <div className="p-5 flex items-center justify-center">
                <HashLoader />
              </div>
            ) : (
              <Button type="submit" variant="contained" fullWidth>
                <span>Update Lead</span>
              </Button>
            )}
          </div>
        </form>

        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Confirmation of Registration"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Make sure the request is sent to the EFDMS
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
  } else {
    return <h4 className="text-center">Please wait</h4>;
  }
};

export default EFDMSForm;
