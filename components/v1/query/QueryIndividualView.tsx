"use client";
import {
  clientRequestOptions,
  internalReferralOptions,
} from "@/data/option";
import { QueryResponseInterface } from "@/types/clientQuery";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  assignClientQuery,
  resolvedClientQuery,
} from "@/utils/queries/clientQuery/clientQueries";
import { getUserFullNameFromCookie } from "@/utils/cookies";
import CommentSection from "./CommentSection";
import toast from "react-hot-toast";
import { SendIcon } from "lucide-react";

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

const QueryIndividualView = ({ query }: { query: QueryResponseInterface }) => {
  const userFullName: any = getUserFullNameFromCookie();
  const [loading, setLoading] = useState<boolean>(false);
  const [assignTo, setAssignTo] = useState<string>("");
  const [resolution, setResolution] = useState<string>("");
  const theme = useTheme();

  const date = new Date(query.queryDate);

  const handleAssignClientQuery = async () => {
    setLoading(true);
    const response = await assignClientQuery(query.queryID, {
      assignedTo: assignTo,
      assignedDate: new Date(),
      assignedBy: userFullName,
      updatedBy: userFullName,
      status: "In-Progress",
    });

    if (response.statusCode) {
      toast.success("Query Assigned Successfully", {
        position: "top-right",
        duration: 1500,
      });
      setLoading(false);
    } else {
      toast.error("Failed to Assign Query", {
        position: "top-right",
        duration: 1500,
      });
      setLoading(false);
    }
  };

  const handleResolvedClient = async () => {
    setLoading(true);
    const response = await resolvedClientQuery(query.queryID, {
      resolvedBy: userFullName,
      resolvedDate: new Date(),
      resolved: true,
      status: "Resolved",
      updatedBy: userFullName,
      resolution: resolution,
    });
    if (response.status === 200) {
      toast.success("Query Resolved Successfully", {
        position: "top-right",
        duration: 1500,
      });
      window.location.reload();
      setLoading(false);
    } else {
      toast.error("Failed To Resolved Query", {
        position: "top-right",
        duration: 1500,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <section className="p-6">
        <form
          noValidate={true}
          action=""
          className="container flex flex-col mx-auto"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-200">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-bold">Client Information</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <p className="font-bold">Company Name</p>
                {query.Client.companyName}
              </div>
              <div className="col-span-full sm:col-span-3">
                <p className="font-bold">Full Name</p>
                {query.Client.fullName}
              </div>
              <div className="col-span-full sm:col-span-3">
                <p className="font-bold">Email Used For Communication</p>
                <a href={`mailto:${query.Client.emailUsedForComms}`}>
                  {query.Client.emailUsedForComms}
                </a>
              </div>
              <div className="col-span-full sm:col-span-3">
                <p className="font-bold">Email Used For Login</p>
                <a href={`mailto:${query.Client.emailUsedForLogin}`}>
                  {query.Client.emailUsedForLogin}
                </a>
              </div>
              <div className="col-span-full sm:col-span-3">
                <p className="font-bold">Phone Number</p>
                <a href={`tel:+${query.Client.phoneNumber}`}>
                  +{query.Client.phoneNumber}
                </a>
              </div>

              <div className="col-span-full sm:col-span-3">
                <p className="font-bold">TIN</p>
                {`${query.Client.tin.slice(0, 3)}-${query.Client.tin.slice(
                  3,
                  6
                )}-${query.Client.tin.slice(6)}`}
              </div>
            </div>
          </fieldset>
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm mt-2 bg-gray-200">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-bold">Query Information</p>
              <p className="text-sm">Created By: {query.createdBy}</p>
              <p className="text-sm">Assigned To: {query.assignedTo}</p>
              <p className="text-sm">Created On: {date.toLocaleString()}</p>
              <p className="text-sm">Priority: {query.priority}</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-2">
                <p className="text-sm font-bold">Query Type</p>
                {query.queryType}
              </div>
              <div className="col-span-full sm:col-span-4">
                <p className="text-sm font-bold">Query Text</p>
                {query.queryText}
              </div>
              {query.status === "Resolved" && (
                <div className="col-span-full sm:col-span-full">
                  <p className="text-sm font-bold">Resolution</p>
                  {query.resolution}
                </div>
              )}

              {query.status.toUpperCase() === "PENDING" && (
                <FormControl className="col-span-full sm:col-span-3">
                  <InputLabel className="form-label" htmlFor="AssignTo">
                    Assign To
                  </InputLabel>
                  <Select
                    fullWidth
                    disabled={loading}
                    label="Assign To"
                    value={query.assignedTo}
                    onChange={(e: SelectChangeEvent) => {
                      setAssignTo(e.target.value);
                    }}
                    id="AssignTo"
                    MenuProps={MenuProps}
                  >
                    {internalReferralOptions.map((internal) => (
                      <MenuItem
                        key={internal}
                        value={internal}
                        style={getStyles(internal, clientRequestOptions, theme)}
                      >
                        {internal}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {query.status.toUpperCase() === "PENDING" && (
                <>
                  <LoadingButton
                    onClick={handleAssignClientQuery}
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    fullWidth
                    className="col-span-3"
                  >
                    {userFullName === assignTo ? (
                      <span>ASSIGN TO MYSELF</span>
                    ) : (
                      <span>ASSIGN TO {assignTo}</span>
                    )}
                  </LoadingButton>
                </>
              )}

              <CommentSection
                queryID={query.queryID}
                initialComments={query.QueryComment}
                createdBy={query.createdBy}
              />

              {query.status.toUpperCase() === "IN-PROGRESS" && (
                <div className="col-span-full">
                  <p className="text-sm font-bold">Resolution</p>
                  <div className="flex">
                    <TextField
                      id="standard-multiline-static"
                      fullWidth
                      variant="standard"
                      multiline
                      rows={1}
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => setResolution(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {userFullName === query.createdBy && (
                <div className="col-span-full flex justify-between">

                  {status === "PENDING" && (
                    <LoadingButton
                      onClick={handleAssignClientQuery}
                      endIcon={<SendIcon />}
                      loading={loading}
                      loadingPosition="end"
                      variant="contained"
                      fullWidth
                      className="col-span-3"
                    >
                      Update Status
                    </LoadingButton>
                  )}

                  {query.status.toUpperCase() === "IN-PROGRESS" && (
                    <LoadingButton
                      className="col-span-3"
                      variant="contained"
                      loading={loading}
                      loadingPosition="end"
                      color="success"
                      onClick={handleResolvedClient}
                      endIcon={<SendIcon />}
                    >
                      Resolve
                    </LoadingButton>
                  )}
                </div>
              )}
            </div>
          </fieldset>
        </form>
      </section>
    </>
  );
};

export default QueryIndividualView;
