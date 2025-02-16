import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  clientQueriesOptions,
  companyDetailChangesOptions,
  credentialsChangeOptions,
  employeeOptions,
  queryPriorityOptions,
} from "@/data/option";
import { ClientInterface } from "@/types/client";
import { createClientQuery } from "@/utils/queries/clientQuery/clientQueries";
import {
  getUserDetailsCookie,
  getUserEmailFromCookie,
  getUserFullNameFromCookie,
} from "@/utils/cookies";
import { SendIcon } from "lucide-react";
import toast from "react-hot-toast";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, options: string[], theme: Theme) {
  return {
    fontWeight:
      options.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const NewClientQuery = ({ client }: { client: ClientInterface[]}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [emailUsedForComms, setEmailUsedForComms] = useState<string>("");
  const [emailUsedForLogin, setEmailUsedForLogin] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [queryResolveItem, setQueryResolveItem] = useState<string>("");
  const [queryType, setQueryType] = useState<string>("");
  const [credentialsToChange, setCredentialsToChange] = useState<string>("");
  const [companyDetailsToChange, setCompanyDetailsToChange] =
    useState<string>("");
  const [assignTo, setAssignTo] = useState<any>();
  const [isVip, setIsVip] = useState<string>("");
  const [priorityLevel, setPriorityLevel] = useState<string>("");

  const defaultProps = {
    options: client,
    getOptionLabel: (option: ClientInterface) => option.companyName || "",
  };
  const [value, setValue] = React.useState<ClientInterface | null>(null);

  const employeeNames = employeeOptions.map((employee) => employee.name);

  const handleEmployeeChange = (e: SelectChangeEvent) => {
    const selectedEmployee = employeeOptions.find(
      (employee) => employee.name === e.target.value
    );
    setAssignTo(selectedEmployee);
  };

  useEffect(() => {
    if (value) {
      setFullName(value.fullName || "");
      setCompanyName(value?.companyName || "");
      setEmailUsedForComms(value?.emailUsedForComms || "");
      setEmailUsedForLogin(value?.emailUsedForLogin || "");
      setPhoneNumber(value?.phoneNumber || "");
      setIsVip(value?.isVip || "");
    } else {
      setFullName("");
      setCompanyName("");
      setEmailUsedForLogin("");
      setPhoneNumber("");
      setIsVip("");
    }
  }, [value]);

  const onSubmitNewClient = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const queryText = `Query: ${queryType}-${credentialsToChange}${companyDetailsToChange} to be resolved ${queryResolveItem}`;
    const today = new Date();
    const response = await createClientQuery({
      clientID: value?.clientID,
      queryText: queryText,
      queryType: queryType,
      queryDate: today,
      resolved: false,
      resolvedBy: null,
      assignedBy: getUserFullNameFromCookie(),
      createdBy: getUserFullNameFromCookie(),
      updatedBy: getUserFullNameFromCookie(),
      resolvedDate: null,
      status: "In-Progress",
      priority: priorityLevel,
      assignedTo: assignTo.name,
      assignedEmail: assignTo.email,
      assigneeEmail: getUserEmailFromCookie().email,
      assigneeEmailApp: getUserEmailFromCookie().emailApp,
      resolution: "",
    });

    if (response.status === 200) {
      toast.success("Query has been created", {
        position: "top-right",
        duration: 1500
      });
      setLoading(false);
      window.location.reload();
    } else {
      toast.error("Failed to create a query", {
        position: "top-right",
        duration: 1500
      });
      setLoading(false);
    }
  };
  return (
    <div className="max-w-6xl mx-auto">
      <div className="conten-box">
        <div className="py-10">
          <div className="flex flex-row justify-center items-center">
            <Autocomplete
              {...defaultProps}
              id="controlled-demo"
              value={value}
              sx={{
                width: "30%",
              }}
              onChange={(
                event: React.SyntheticEvent<Element, Event>,
                newValue: ClientInterface | null
              ) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Company Name"
                  variant="standard"
                />
              )}
            />
          </div>
        </div>
        <Divider />
        <form onSubmit={onSubmitNewClient}>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 h-fit grid-cols-1 gap-3 md:gap-5 pt-5 my-0 md:mb-10">
            <TextField
              disabled={loading}
              label="Full Name"
              type="text"
              value={fullName}
              placeholder="Full name"
              error={fullName === ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFullName(e.target.value)
              }
              required
            />
            <TextField
              required
              disabled={loading}
              label="Company Name"
              type="text"
              value={companyName}
              placeholder="Company Name"
              error={false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCompanyName(e.target.value)
              }
            />
            <TextField
              required
              disabled={loading}
              label="Email Used For Communication"
              type="email"
              value={emailUsedForComms}
              placeholder="Email Used For Communication"
              error={false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmailUsedForComms(e.target.value)
              }
            />
            <TextField
              required
              disabled={loading}
              label="Email Used For Login"
              type="email"
              value={emailUsedForLogin}
              placeholder="Email Used For Login"
              error={false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmailUsedForLogin(e.target.value)
              }
            />
            <TextField
              required
              disabled={loading}
              label="Phone Number"
              type="text"
              fullWidth
              value={phoneNumber}
              placeholder="Phone Number"
              error={false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhoneNumber(e.target.value)
              }
            />
            <FormControl fullWidth>
              <InputLabel id="isVIPID">Is VIP?</InputLabel>
              <Select
                label="Is VIP?"
                labelId="isVIPID"
                value={isVip}
                onChange={(e: SelectChangeEvent) => {
                  setIsVip(e.target.value);
                }}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel className="form-label" htmlFor="queryType">
                Query Type
              </InputLabel>
              <Select
                required
                disabled={loading}
                fullWidth
                value={queryType}
                label="Query Type"
                onChange={(e: SelectChangeEvent) => {
                  setQueryType(e.target.value);
                }}
                id="queryType"
                MenuProps={MenuProps}
              >
                {clientQueriesOptions.map((queryType) => (
                  <MenuItem
                    key={queryType}
                    value={queryType}
                    style={getStyles(queryType, clientQueriesOptions, theme)}
                  >
                    {queryType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {queryType === "Credentials Change" && (
              <>
                <FormControl>
                  <InputLabel
                    className="form-label"
                    htmlFor="credentialToChange"
                  >
                    Credentials To Change
                  </InputLabel>
                  <Select
                    required
                    disabled={loading}
                    fullWidth
                    value={credentialsToChange}
                    label="Credential To Change"
                    onChange={(e: SelectChangeEvent) => {
                      setCredentialsToChange(e.target.value);
                    }}
                    id="credentialToChange"
                    MenuProps={MenuProps}
                  >
                    {credentialsChangeOptions.map((credentialOption) => (
                      <MenuItem
                        key={credentialOption}
                        value={credentialOption}
                        style={getStyles(
                          credentialOption,
                          credentialsChangeOptions,
                          theme
                        )}
                      >
                        {credentialOption}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="New Credentials"
                  type="text"
                  fullWidth
                  disabled={loading}
                  value={queryResolveItem}
                  placeholder="New Credentials"
                  error={false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQueryResolveItem(e.target.value)
                  }
                />
              </>
            )}

            {queryType === "Company Detail Change" && (
              <>
                <FormControl>
                  <InputLabel
                    className="form-label"
                    htmlFor="companyDetailChange"
                  >
                    Company Details To Change
                  </InputLabel>
                  <Select
                    required
                    disabled={loading}
                    fullWidth
                    value={companyDetailsToChange}
                    label="Company Details To Change"
                    onChange={(e: SelectChangeEvent) => {
                      setCompanyDetailsToChange(e.target.value);
                    }}
                    id="companyDetailChange"
                    MenuProps={MenuProps}
                  >
                    {companyDetailChangesOptions.map((companyDetailOption) => (
                      <MenuItem
                        key={companyDetailOption}
                        value={companyDetailOption}
                        style={getStyles(
                          companyDetailOption,
                          credentialsChangeOptions,
                          theme
                        )}
                      >
                        {companyDetailOption}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="New Details"
                  type="text"
                  fullWidth
                  disabled={loading}
                  value={queryResolveItem}
                  placeholder="New Details"
                  error={false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQueryResolveItem(e.target.value)
                  }
                />
              </>
            )}

            {(queryType === "Receipt Not Verified" ||
              queryType === "Z-Report Not Reflecting") && (
              <>
                <TextField
                  label={
                    queryType === "Receipt Not Verified"
                      ? `Receipt Verification Code`
                      : `Date Range of the Z-Report`
                  }
                  type="text"
                  fullWidth
                  disabled={loading}
                  value={queryResolveItem}
                  placeholder={
                    queryType === "Receipt Not Verified"
                      ? `Receipt Verification Code`
                      : `Date Range of the Z-Report`
                  }
                  error={false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQueryResolveItem(e.target.value)
                  }
                />
              </>
            )}

            <FormControl>
              <InputLabel className="form-label" htmlFor="assignTo">
                Assign To
              </InputLabel>
              <Select
                required
                disabled={loading}
                fullWidth
                value={assignTo ? assignTo.name : ""}
                label="Assign To"
                onChange={handleEmployeeChange}
                id="assignTo"
                MenuProps={MenuProps}
              >
                {employeeOptions.map((employee) => (
                  <MenuItem
                    key={employee.name}
                    value={employee.name}
                    style={getStyles(employee.name, employeeNames, theme)}
                  >
                    {employee.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel className="form-label" htmlFor="priorityLevel">
                Priority Level
              </InputLabel>
              <Select
                required
                disabled={loading}
                fullWidth
                value={priorityLevel}
                label="Priority Level"
                onChange={(e: SelectChangeEvent) => {
                  setPriorityLevel(e.target.value);
                }}
                id="priorityLevel"
                MenuProps={MenuProps}
              >
                {queryPriorityOptions.map((queryPriorityOption) => (
                  <MenuItem
                    key={queryPriorityOption}
                    value={queryPriorityOption}
                    style={getStyles(
                      queryPriorityOption,
                      queryPriorityOptions,
                      theme
                    )}
                  >
                    {queryPriorityOption}
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
  );
};

export default NewClientQuery;
