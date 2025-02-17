import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Autocomplete,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import { getUserFullNameFromCookie } from "@/utils/cookies";
import { toast } from "react-toastify";
import {
  actionTakenOptions,
  clientRequestOptions,
  iSVipOptions,
  internalReferralOptions,
  locationOptions,
  platformOptions,
  progressOptions,
  reasonOptions,
  socialMediaOptions,
  statusOptions,
  zonesOptions,
} from "@/data/option";
import { createALead } from "@/utils/queries/lead/createQueries";
import MuiPhoneNumber from "mui-phone-number";
import { ClientInterface } from "@/types/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { leadSchema } from "@/schema/lead";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { MenuProps, getStyles } from "@/utils/inputOptions";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


interface LeadYupInterface {
  fullName: string;
  companyName?: string | null;
  tin?: string | null;
  phoneNumber?: string | null;
  emailAddress?: string | null;
}

const NewLeads = ({ client }: { client: ClientInterface[] }) => {
  const {
    register,
    handleSubmit,
    setValue: setFormValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(leadSchema),
  });
  const theme = useTheme();
  const [date, setDate] = React.useState<Dayjs>(dayjs(new Date()));
  const [location, setLocation] = useState<string>("");
  const [leadZone, setLeadZone] = useState<string>("");
  const [clientRequest, setClientRequest] = useState<string>("");
  const [reasons, setReasons] = useState<string>("");
  const [actionTaken, setActionTaken] = useState<string>("");
  const [progress, setProgress] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [socials, setSocials] = useState<string>("");
  const [iSVip, setISVip] = useState<string>("");
  const [internalReferral, setInternalReferral] = useState<string>("");
  const [externalReferral, setExternalReferral] = useState<string>("");
  const [event, setEvent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onPhoneNumberChanged = (phoneNumber: any) => {
    setFormValue("phoneNumber", phoneNumber);
  };

  const defaultProps = {
    options: client,
    getOptionLabel: (option: ClientInterface) => option.fullName ?? "",
  };
  const [clientReferral, setClientReferral] =
    React.useState<ClientInterface | null>(null);

  const onSubmit = async (data: LeadYupInterface) => {
    setLoading(true);
    const response = await createALead({
      ...data,
      date: date.toDate(),
      location: location,
      zone: leadZone,
      clientRequest: clientRequest,
      reasons: reasons,
      actionTaken: actionTaken,
      progress: progress,
      status: status,
      platform: platform,
      specificPlatform:
        socials ||
        internalReferral ||
        externalReferral ||
        event ||
        clientReferral?.fullName,
      vip: iSVip,
      addedBy: getUserFullNameFromCookie(),
      updatedBy: getUserFullNameFromCookie(),
    });
    if (response.status === 200) {
      toast.success("Lead has been successfully added", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      window.location.reload();
    } else {
      toast.error("Lead could not be added", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="content-box">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 h-fit grid-cols-1 gap-3 md:gap-5 pt-5 my-0 md:mb-10">
            <DatePicker
              label="Contact Date"
              className="w-full"
              value={date}
              onChange={(newDate: any) => setDate(newDate)}
              slotProps={{ textField: { size: "medium" } }}
            />
            <TextField
              label="Name"
              type="text"
              placeholder="Full name"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              {...register("fullName")}
            />
            <TextField
              label="Company"
              type="text"
              placeholder="Company"
              error={!!errors.companyName}
              helperText={errors.companyName?.message}
              {...register("companyName")}
            />
            <TextField
              label="TIN"
              type="number"
              placeholder="TIN"
              error={!!errors.tin}
              helperText={errors.tin?.message}
              {...register("tin")}
            />
            <TextField
              label="Email"
              type="email"
              placeholder="Email"
              error={!!errors.emailAddress}
              helperText={errors.emailAddress?.message}
              {...register("emailAddress")}
            />
            <MuiPhoneNumber
              defaultCountry="tz"
              regions={"africa"}
              variant="outlined"
              label="Phone Number"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              onChange={onPhoneNumberChanged}
            />
            <FormControl>
              <InputLabel className="form-label" htmlFor="clientLocation">
                Client Location
              </InputLabel>
              <Select
                fullWidth
                label="Client Location"
                value={location}
                onChange={(e: SelectChangeEvent) => {
                  setLocation(e.target.value);
                }}
                id="clientLocation"
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

            <FormControl>
              <InputLabel className="form-label" htmlFor="leadZone">
                Lead Zone
              </InputLabel>
              <Select
                fullWidth
                label="Lead Zone"
                value={leadZone}
                onChange={(e: SelectChangeEvent) => {
                  setLeadZone(e.target.value);
                }}
                id="leadZone"
                MenuProps={MenuProps}
              >
                {zonesOptions.map((zone) => (
                  <MenuItem
                    key={zone}
                    value={zone}
                    style={getStyles(zone, zonesOptions, theme)}
                  >
                    {zone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel className="form-label" htmlFor="clientRequest">
                Client Request
              </InputLabel>
              <Select
                required
                fullWidth
                value={clientRequest}
                label="Client Request"
                onChange={(e: SelectChangeEvent) => {
                  setClientRequest(e.target.value);
                }}
                id="clientRequest"
                MenuProps={MenuProps}
              >
                {clientRequestOptions.map((request) => (
                  <MenuItem
                    key={request}
                    value={request}
                    style={getStyles(request, clientRequestOptions, theme)}
                  >
                    {request}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel className="form-label" htmlFor="reasons">
                Reasons
              </InputLabel>
              <Select
                required
                fullWidth
                value={reasons}
                label="Reasons"
                onChange={(e: SelectChangeEvent) => {
                  setReasons(e.target.value);
                }}
                id="reasons"
                MenuProps={MenuProps}
              >
                {reasonOptions.map((reasons) => (
                  <MenuItem
                    key={reasons}
                    value={reasons}
                    style={getStyles(reasons, reasonOptions, theme)}
                  >
                    {reasons}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel className="form-label" htmlFor="actionTaken">
                Action Taken
              </InputLabel>
              <Select
                required
                fullWidth
                value={actionTaken}
                label="Action Taken"
                onChange={(e: SelectChangeEvent) => {
                  setActionTaken(e.target.value);
                }}
                id="actionTaken"
                MenuProps={MenuProps}
              >
                {actionTakenOptions.map((actionTaken) => (
                  <MenuItem
                    key={actionTaken}
                    value={actionTaken}
                    style={getStyles(actionTaken, actionTakenOptions, theme)}
                  >
                    {actionTaken}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel className="form-label" htmlFor="progress">
                Progress
              </InputLabel>
              <Select
                fullWidth
                required
                value={progress}
                label="Progress"
                onChange={(e: SelectChangeEvent) => {
                  setProgress(e.target.value);
                }}
                id="progress"
                MenuProps={MenuProps}
              >
                {progressOptions.map((progress) => (
                  <MenuItem
                    key={progress}
                    value={progress}
                    style={getStyles(progress, progressOptions, theme)}
                  >
                    {progress}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel className="form-label" htmlFor="status">
                Status
              </InputLabel>
              <Select
                fullWidth
                required
                value={status}
                label="Status"
                onChange={(e: SelectChangeEvent) => {
                  setStatus(e.target.value);
                }}
                id="status"
                MenuProps={MenuProps}
              >
                {statusOptions.map((status) => (
                  <MenuItem
                    key={status}
                    value={status}
                    style={getStyles(status, statusOptions, theme)}
                  >
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel className="form-label" htmlFor="platform">
                Platform
              </InputLabel>
              <Select
                fullWidth
                required
                value={platform}
                label="Platform"
                onChange={(e: SelectChangeEvent) => {
                  setPlatform(e.target.value);
                }}
                id="platform"
                MenuProps={MenuProps}
              >
                {platformOptions.map((platform) => (
                  <MenuItem
                    key={platform}
                    value={platform}
                    style={getStyles(platform, platformOptions, theme)}
                  >
                    {platform}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {platform === "Social Media" && (
              <FormControl>
                <InputLabel className="form-label" htmlFor="socials">
                  Social Media Platform
                </InputLabel>
                <Select
                  fullWidth
                  value={socials}
                  label="Social Media Platform"
                  onChange={(e: SelectChangeEvent) => {
                    setSocials(e.target.value);
                  }}
                  id="socials"
                  MenuProps={MenuProps}
                >
                  {socialMediaOptions.map((socials) => (
                    <MenuItem
                      key={socials}
                      value={socials}
                      style={getStyles(platform, socialMediaOptions, theme)}
                    >
                      {socials}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {platform === "Internal Referral" && (
              <FormControl>
                <InputLabel className="form-label" htmlFor="internalReferral">
                  Internal Referral
                </InputLabel>
                <Select
                  fullWidth
                  value={internalReferral}
                  label="Internal Referral"
                  onChange={(e: SelectChangeEvent) => {
                    setInternalReferral(e.target.value);
                  }}
                  id="internalReferral"
                  MenuProps={MenuProps}
                >
                  {internalReferralOptions.map((internal) => (
                    <MenuItem
                      key={internal}
                      value={internal}
                      style={getStyles(
                        internal,
                        internalReferralOptions,
                        theme
                      )}
                    >
                      {internal}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {platform === "External Referral" && (
              <TextField
                variant="standard"
                id="outlined-controlled"
                label="External Referral"
                value={externalReferral}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setExternalReferral(event.target.value);
                }}
              />
            )}
            {platform === "Events" && (
              <TextField
                variant="standard"
                id="outlined-controlled"
                label="Event"
                value={event}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEvent(event.target.value);
                }}
              />
            )}

            {platform === "Client Referral" && (
              <Autocomplete
                {...defaultProps}
                id="controlled-demo"
                value={clientReferral}
                fullWidth
                onChange={(
                  event: React.SyntheticEvent<Element, Event>,
                  newValue: ClientInterface | null
                ) => {
                  setClientReferral(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Full Name" />
                )}
              />
            )}
            <FormControl>
              <InputLabel className="form-label" htmlFor="vip">
                VIP
              </InputLabel>
              <Select
                fullWidth
                required
                value={iSVip}
                label="VIP"
                onChange={(e: SelectChangeEvent) => {
                  setISVip(e.target.value);
                }}
                id="vip"
                MenuProps={MenuProps}
              >
                {iSVipOptions.map((isvip) => (
                  <MenuItem
                    key={isvip}
                    value={isvip}
                    style={getStyles(isvip, iSVipOptions, theme)}
                  >
                    {isvip}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Divider />
          <div className="flex justify-end pt-5">
            <LoadingButton
              endIcon={<SendIcon />}
              type="submit"
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Send</span>
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
    </LocalizationProvider>
  );
};

export default NewLeads;
