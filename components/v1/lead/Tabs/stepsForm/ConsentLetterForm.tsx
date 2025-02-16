import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  useTheme,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import MuiPhoneNumber from "mui-phone-number";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { locationOptions } from "@/data/option";
import {
  getUserEmailFromCookie,
  getUserFullNameFromCookie,
} from "@/utils/cookies";
import { MenuProps, getStyles } from "@/utils/inputOptions";
import { LeadResponseType } from "@/types/lead";
import {
  updateALead,
  updateALeadWithEmail,
} from "@/utils/queries/lead/updateQueries";
import { consentLetterLeadSchema } from "@/schema/lead";
import LeadComment from "./LeadComment";
import { toastFailed, toastSuccessful } from "@/utils/toast";
import toast from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";
import { HashLoader } from "react-spinners";

const ConsentLetterForm = ({
  lead,
  resetFormKey,
}: {
  lead: LeadResponseType;
  resetFormKey: any;
}) => {
  const {
    handleSubmit,
    watch,
    setValue: setFormValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(consentLetterLeadSchema),
  });
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [clientSimplifyService, setClientSimplifyService] = useState<
    string | undefined
  >();
  const [clientName, setClientName] = useState<string>();
  const [clientCompanyName, setClientCompanyName] = useState<string>();
  const [clientEmail, setClientEmail] = useState<string | null>();
  const [clientAddress, setClientAddress] = useState<string | null>();
  const [clientRegion, setClientRegion] = useState<string | undefined>();
  const [clientPhoneNumber, setClientPhoneNumber] = useState<string | null>();
  const [clientVRN, setClientVRN] = useState<string | null>();
  const [clientEmailForLogin, setClientEmailForLogin] = useState<
    string | null
  >();
  const [clientBusinessCategory, setClientBusinessCategory] = useState<
    string | null
  >();
  const [clientDirectorName, setClientDirectorName] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (lead) {
      setClientSimplifyService(lead.clientSimplifyService);
      setClientName(lead.fullName);
      setClientCompanyName(lead.companyName);
      setClientEmail(lead.emailAddress);
      setClientAddress(lead.address);
      setClientRegion(lead.region);
      setClientPhoneNumber(lead.phoneNumber);
      setClientVRN(lead.vrn);
      setClientEmailForLogin(lead.emailAddressForLogin);
      setClientBusinessCategory(lead.businessCategory);
      setClientDirectorName(lead.fullName);
      setFormValue("tin", lead.tin);
      setFormValue("documentLink", lead.documentLink);
    }
  }, [lead, resetFormKey]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSimplifyServiceChange = (event: SelectChangeEvent) => {
    setClientSimplifyService(event.target.value);
  };

  const onPhoneNumberChanged = (phoneNumber: any) => {
    setClientPhoneNumber(phoneNumber);
  };

  const onUpdateUserConsentStage = async () => {
    setLoading(true);

    const response = await updateALead({
      leadID: lead?.leadID,
      tin: String(watch("tin")),
      onBoardingStage: "Consent Letter",
      emailAddress: clientEmail,
      emailAddressForLogin: clientEmailForLogin,
      fullName: clientName,
      companyName: clientCompanyName,
      address: clientAddress,
      status: "On Process",
      region: clientRegion,
      businessCategory: clientBusinessCategory,
      phoneNumber: clientPhoneNumber,
      updatedBy: getUserFullNameFromCookie(),
      vrn: clientVRN,
      documentLink: watch("documentLink"),
      clientSimplifyService: clientSimplifyService,
      progress: "Letter Received",
    });
    if (response.status === 200) {
      toastSuccessful("Lead has been updated");
      setLoading(false);
      window.location.reload();
    } else {
      toastFailed("Lead could not update");
      setLoading(false);
    }
  };

  const onUpdateLeadToEfdms = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    const response = await updateALeadWithEmail({
      leadID: lead?.leadID,
      onBoardingStage: "EFDMS",
      updatedBy: getUserFullNameFromCookie(),
      progress: "Payment Pending",
      emailOnboardingType: "INVOICE",
      assignedEmail: "costantina.hariohay@simplify.co.tz",
      assigneeEmail: getUserEmailFromCookie().email,
      assigneeEmailApp: getUserEmailFromCookie().emailApp,
    });
    if (response.status === 200) {
      toast.success("Lead has been updated", {
        position: "top-right",
        duration: 1500,
      });
      setLoading(false);
      window.location.reload();
    } else {
      toast.error("Failed to updated a client", {
        position: "top-right",
        duration: 1500,
      });
      setLoading(false);
    }
  };

  if (lead) {
    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 space-x-5">
          {lead?.onBoardingStage !== "" && (
            <div className="flex flex-row gap-x-2 col-span-2">
              <LoadingButton
                fullWidth
                loading={loading}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  setOpen(true)
                }
                variant="contained"
                sx={{
                  backgroundColor: "#FEF08A",
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#d4c242",
                    color: "#ffffff",
                  },
                }}
              >
                Update Status
              </LoadingButton>
              <Button
                fullWidth
                href={`${lead?.documentLink}`}
                target="_blank"
                variant="contained"
              >
                Google Link
              </Button>
            </div>
          )}
        </div>
        <>
          <form
            onSubmit={handleSubmit(onUpdateUserConsentStage)}
            className="grid grid-cols-3 gap-x-4 gap-y-5 py-6"
          >
            <FormControl fullWidth>
              <InputLabel id="simplifyServiceID">Simplify Service</InputLabel>
              <Select
                labelId="simplifyServiceID"
                label="Simplify Service"
                value={clientSimplifyService}
                onChange={handleSimplifyServiceChange}
                required
                size="small"
                variant="standard"
                defaultValue=""
              >
                <MenuItem value={""}>Please Select</MenuItem>
                <MenuItem value={"VFD"}>VFD App</MenuItem>
                <MenuItem value={"USSD"}>USSD</MenuItem>
                <MenuItem value={"API"}>API</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Full Name"
              type="text"
              size="small"
              variant="standard"
              value={lead?.fullName}
              error={clientName === ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setClientName(e.target.value)
              }
              required
            />

            <TextField
              label="Company Name"
              type="text"
              size="small"
              variant="standard"
              value={lead?.companyName}
              error={clientCompanyName === ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setClientCompanyName(e.target.value)
              }
              required
            />

            <TextField
              label="Email Used For Communication"
              type="text"
              size="small"
              variant="standard"
              value={clientEmail}
              error={clientEmail === ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setClientEmail(e.target.value)
              }
              required
            />

            <TextField
              label="Email Used For Login"
              type="text"
              size="small"
              variant="standard"
              value={clientEmailForLogin}
              error={clientEmailForLogin === ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setClientEmailForLogin(e.target.value)
              }
              required
            />

            <TextField
              label="Company Address"
              type="text"
              size="small"
              variant="standard"
              value={clientAddress}
              error={clientAddress === ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setClientAddress(e.target.value)
              }
              required
            />

            <FormControl>
              <InputLabel className="form-label" htmlFor="clientRegion">
                Client Region
              </InputLabel>
              <Select
                fullWidth
                defaultValue="Not Provided"
                label="Client Region"
                size="small"
                variant="standard"
                value={clientRegion}
                onChange={(e: SelectChangeEvent) => {
                  setClientRegion(e.target.value);
                }}
                id="clientRegion"
                MenuProps={MenuProps}
              >
                {locationOptions.map((location) => (
                  <MenuItem
                    key={location}
                    value={location}
                    style={getStyles(location, locationOptions, theme)}
                  >
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Client TIN"
              type="text"
              size="small"
              variant="standard"
              error={!!errors.tin}
              helperText={errors.tin?.message}
              value={watch("tin")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormValue("tin", e.target.value)
              }
              required
            />

            <TextField
              label="Client VRN"
              type="text"
              size="small"
              variant="standard"
              value={clientVRN}
              error={clientVRN === ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setClientVRN(e.target.value)
              }
            />

            <TextField
              label="Business Category"
              type="text"
              size="small"
              variant="standard"
              value={clientBusinessCategory}
              error={clientBusinessCategory === ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setClientBusinessCategory(e.target.value)
              }
              required
            />

            <MuiPhoneNumber
              defaultCountry="tz"
              regions={"africa"}
              label="Contact Phone Number"
              size="small"
              variant="standard"
              value={clientPhoneNumber}
              onChange={onPhoneNumberChanged}
              error={(clientPhoneNumber ?? "").length > 13}
              required
            />

            <TextField
              label="Director Name"
              type="text"
              size="small"
              variant="standard"
              value={clientDirectorName}
              error={clientDirectorName === ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setClientDirectorName(e.target.value)
              }
              required
            />

            <Divider className="col-span-3 py-2">
              <p className="text-simplitech-true-blue">Folder Link Section</p>
            </Divider>

            <TextField
              label="Google Folder Link"
              type="text"
              fullWidth
              className="col-span-3"
              size="small"
              variant="standard"
              error={!!errors.documentLink}
              helperText={errors.documentLink?.message}
              value={watch("documentLink")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormValue("documentLink", e.target.value)
              }
              required
            />

            <Divider className="col-span-3 py-2">
              <p className="text-simplitech-true-blue">Comment Section</p>
            </Divider>

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

            <Divider className="col-span-3 py-4" />

            <div className="pt-4 col-span-3 w-full">
              {loading ? (
                <div className="p-5 flex items-center justify-center">
                  <HashLoader />
                </div>
              ) : (
                <Button type="submit" variant="contained" fullWidth>
                  Update Lead Data
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
              <LoadingButton
                loading={loading}
                variant="contained"
                onClick={handleClose}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                loading={loading}
                variant="contained"
                onClick={onUpdateLeadToEfdms}
              >
                Update to EFDMS
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </>
      </>
    );
  } else {
    return <h4 className="text-center">Please wait</h4>;
  }
};

export default ConsentLetterForm;
