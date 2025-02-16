import React, { useEffect, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import { getUserFullNameFromCookie } from "@/utils/cookies";
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
import { updateALead } from "@/utils/queries/lead/updateQueries";
import MuiPhoneNumber from "mui-phone-number";
import { LeadResponseType } from "@/types/lead";
import { MenuProps, getStyles } from "@/utils/inputOptions";
import toast from "react-hot-toast";

const UpdateLeads = ({ lead }: { lead: LeadResponseType }) => {
  const theme = useTheme();
  const [fullName, setFullName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [tin, setTin] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [leadZone, setLeadZone] = useState<string>("");
  const [clientRequest, setClientRequest] = useState<string>("");
  const [reasons, setReasons] = useState<string>("");
  const [actionTaken, setActionTaken] = useState<string>("");
  const [progress, setProgress] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [socials, setSocials] = useState<string>("");
  const [iSVip, setiSVip] = useState<string>("");
  const [internalReferral, setInternalReferral] = useState<string>("");
  const [externalReferral, setExternalReferral] = useState<string>("");
  const [event, setEvent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onPhoneNumberChanged = (phoneNumber: any) => {
    setPhone(phoneNumber);
  };

  useEffect(() => {
    if (lead) {
      setFullName(lead.fullName);
      setCompany(lead.companyName);
      setTin(lead.tin);
      setEmail(lead.emailAddress);
      setPhone(lead.phoneNumber);
      setLocation(lead.location);
      setLeadZone(lead.zone);
      setClientRequest(lead.clientRequest);
      setReasons(lead.reasons);
      setActionTaken(lead.actionTaken);
      setProgress(lead.progress);
      setStatus(lead.status);
      setPlatform(lead.platform);
      setSocials(lead.specificPlatform);
      setiSVip(lead.vip);
    }
  }, [lead]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response = await updateALead({
      leadID: lead.leadID,
      fullName: fullName,
      companyName: company,
      tin: tin,
      emailAddress: email,
      phoneNumber: phone,
      location: location,
      clientRequest: clientRequest,
      reasons: reasons,
      actionTaken: actionTaken,
      progress: progress,
      status: status,
      platform: platform,
      zone: leadZone,
      specificPlatform:
        socials || internalReferral || externalReferral || event,
      vip: iSVip,
      updatedBy: getUserFullNameFromCookie(),
    });
    if (response.status === 200) {
      toast.success("Lead has been successfully added", {
        position: "top-right",
        duration: 1500
      });
      window.location.reload();
    } else {
      toast.error("Lead could not be added", {
        position: "top-right",
        duration: 1500
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="conten-box">
        <div>
          <form onSubmit={onSubmit}>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 h-fit grid-cols-1 gap-3 md:gap-5 pt-5 my-0 md:mb-10">
              <TextField
                label="Name"
                focused
                type="text"
                placeholder="Full name"
                value={fullName}
                error={fullName === ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFullName(e.target.value)
                }
                required
              />
              <TextField
                label="Company"
                type="text"
                focused
                placeholder="Company"
                value={company}
                error={false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCompany(e.target.value)
                }
              />
              <TextField
                label="TIN"
                type="number"
                focused
                placeholder="TIN"
                value={tin}
                error={false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTin(e.target.value)
                }
              />
              <TextField
                label="Email"
                type="email"
                focused
                placeholder="Email"
                value={email}
                error={false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <MuiPhoneNumber
                defaultCountry="tz"
                regions={"africa"}
                variant="outlined"
                label="Phone Number"
                focused
                value={phone}
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
                <>
                  <FormControl>
                    <InputLabel
                      className="form-label"
                      htmlFor="internalReferral"
                    >
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
                </>
              )}
              {platform === "External Referral" && (
                <TextField
                  variant="standard"
                  id="outlined-controlled"
                  focused
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
                  focused
                  value={event}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setEvent(event.target.value);
                  }}
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
                    setiSVip(e.target.value);
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
                <span>Update Lead</span>
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateLeads;
