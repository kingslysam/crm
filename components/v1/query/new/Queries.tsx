import React from "react";
import { QueryResponseInterface } from "@/types/clientQuery";
import {
  Dialog,
  DialogTitle,
  Alert,
  DialogActions,
  Button,
  DialogContent,
} from "@mui/material";
import QueryIndividualView from "../QueryIndividualView";
import { MousePointer2Icon } from 'lucide-react';


const Queries = ({ query }: { query: QueryResponseInterface }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function differenceInDays() {
    const today = new Date();
    const queryDate = new Date(query.queryDate);

    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const queryDateStart = new Date(
      queryDate.getFullYear(),
      queryDate.getMonth(),
      queryDate.getDate()
    );

    const diffTime = todayStart.getTime() - queryDateStart.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays;
  }
  const RenderView = () => {
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
          <DialogTitle className="flex justify-between">
            Client Query
            {query.status.toUpperCase() === "PENDING" ? (
              differenceInDays() > 5 ? (
                <Alert
                  variant="standard"
                  sx={{ borderRadius: 1 }}
                  severity="error"
                >
                  It has been {differenceInDays()} days, what&apos;s up 🤨
                </Alert>
              ) : (
                <Alert variant="standard" severity="warning">
                  {query.status.toUpperCase()}
                </Alert>
              )
            ) : query.status.toUpperCase() === "IN-PROGRESS" ? (
              <Alert variant="standard" severity="info">
                {query.status.toUpperCase()}.
              </Alert>
            ) : (
              <Alert variant="standard" severity="success">
                {query.status.toUpperCase()}.
              </Alert>
            )}
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </DialogTitle>
          <DialogContent dividers>
            <QueryIndividualView query={query} />
          </DialogContent>
        </Dialog>
      </>
    );
  };
  return (
    <>
      <li className="my-2">
        <div className="bg-red-400 mx-20 text-center mt-2 text-white rounded-lg">
          {differenceInDays() > 5 && query.status === "In-Progress" && (
            <Alert
              variant="standard"
              sx={{ borderRadius: 1 }}
              className="text-center flex flex-row items-center justify-center"
              severity="error"
            >
              It has been {differenceInDays()} days, what&apos;s up 🤨
            </Alert>
          )}
        </div>
        <div className="flex items-center px-6 space-x-4 py-3 hover:-translate-y-1 hover:shadow-todo transition-all duration-200">
          <span className="flex-1 text-sm text-slate-600 dark:text-slate-300 truncate">
            <p>Company Name: {query.Client.companyName}</p>
            <p>Query Type: {query.queryType}</p>
            <p>Assigned to: {query.assignedTo}</p>
          </span>

          <div className="flex">
            <div className="flex-none space-x-2 text-base text-secondary-500 flex">
              <div className="flex flex-row items-center justify-center space-x-3">
                <div>
                  <span
                    className={` bg-opacity-20 capitalize font-normal text-xs leading-4 px-[10px] py-[2px] rounded-full inline-block
             ${query.status === "In-Progress"
                        ? "bg-blue-500 text-blue-500"
                        : "bg-green-500 text-green-500"
                      }
            `}
                  >
                    {query.status}
                  </span>
                </div>

                <div>
                  <span
                    className={` bg-opacity-20 capitalize font-normal text-xs leading-4 px-[10px] py-[2px] rounded-full inline-block
             ${query.priority === "High"
                        ? "bg-purple-500 text-purple-500"
                        : "bg-blue-500 text-blue-500"
                      }
            `}
                  >
                    {query.priority}
                  </span>
                </div>

                <div>
                  <span
                    className={` bg-opacity-20 capitalize font-normal text-xs leading-4 px-[10px] py-[2px] rounded-full inline-block
             ${query.queryType === "VAT-Update"
                        ? "bg-danger-500 text-danger-500"
                        : ""
                      }
                  ${query.queryType === "Credentials Change"
                        ? "bg-success-500 text-success-500"
                        : ""
                      }
                  ${query.queryType === "Company Detail Change"
                        ? "bg-warning-500 text-warning-500"
                        : ""
                      }
                  ${query.queryType === "Receipt Not Verified"
                        ? "bg-primary-500 text-primary-500"
                        : ""
                      }
                  ${query.queryType === "Z-Report Not Reflecting"
                        ? "bg-info-500 text-info-500"
                        : ""
                      }
            `}
                  >
                    {query.queryType}
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="contained"
                endIcon={<MousePointer2Icon />}
                className="text-slate-400"
                onClick={() => handleClickOpen()}
              >
                View
              </Button>
              {RenderView()}
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default Queries;
