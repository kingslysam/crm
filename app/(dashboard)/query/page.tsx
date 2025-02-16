"use client";
import React, { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import useWidth from "@/hooks/use-width";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  IconButton,
  Alert,
} from "@mui/material";
import { getAllClientQueries } from "@/utils/queries/clientQuery/clientQueries";
import { getAllClients } from "@/utils/queries/queries";
import { QueryResponseInterface } from "@/types/clientQuery";
import { getUserFullNameFromCookie } from "@/utils/cookies";
import { ClientInterface } from "@/types/client";
import toast from "react-hot-toast";
import { BanIcon } from "lucide-react";
import NewClientQuery from "@/components/v1/query/NewClientQuery";
import { Card } from "@/components/ui/card";
import Topfilter from "@/components/v1/query/new/TopFilter";
import BottomFilter from "@/components/v1/query/new/BottomFilter";
import QuerySearch from "@/components/v1/query/new/QuerySearch";
import ListLoading from "@/components/v1/query/new/ListLoading";
import Queries from "@/components/v1/query/new/Queries";
import Badge from "@/components/v1/query/new/Badge";
import { Button } from "@/components/ui/button";

const topfilterList = [
  {
    value: "All",
    name: "All Queries",
    icon: "heroicons:wallet",
  },
  {
    value: "Assigned To Me",
    name: "Assigned To Me",
    icon: "heroicons:user",
  },
  {
    value: "In-Progress",
    name: "In-Progress",
    icon: "heroicons:bolt",
  },
  {
    value: "Resolved",
    name: "Resolved",
    icon: "heroicons:document-check",
  },
];

const bottomfilterList = [
  {
    name: "VAT-Update",
    value: "VAT-Update",
  },
  {
    name: "Credentials Change",
    value: "Credentials Change",
  },
  {
    name: "Company Detail Change",
    value: "Company Detail Change",
  },
  {
    name: "Receipt Not Verified",
    value: "Receipt Not Verified",
  },
  {
    name: "Z-Report Not Reflecting",
    value: "Z-Report Not Reflecting",
  },
];

const QueryPage = () => {
  const { width, breakpoints } = useWidth();
  const [open, setOpen] = useState(false);
  const [clientQueries, setClientQueries] = useState<any>([]);
  const [client, setClient] = useState<ClientInterface[]>([]);
  const [queriesResponseError, setQueriesResponseError] =
    useState<boolean>(false);
  const [clientsResponseError, setClientsResponseError] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [queriesSearch, setQueriesSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [mobileQuerySideBar, setMobileQuerySideBar] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleMobileSidebar = () => {
    setMobileQuerySideBar(!mobileQuerySideBar);
  };

  const fetchAllData = async () => {
    try {
      const [queriesResponse, clientsResponse] = await Promise.all([
        getAllClientQueries(),
        getAllClients(),
      ]);

      if (queriesResponse.status === 200) {
        setClientQueries(queriesResponse.data.data);
      } else {
        setQueriesResponseError(true);
      }

      if (clientsResponse.status === 200) {
        setClient(clientsResponse.data.data);
      } else {
        toast.error("No Clients were Found", {
          position: "top-right",
          duration: 5000
        });
        setClientsResponseError(true);
      }
    } catch (error) {
      setQueriesResponseError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (width < breakpoints.lg && mobileQuerySideBar) {
      setMobileQuerySideBar(true);
    }
    fetchAllData();
  }, [width, breakpoints.lg, mobileQuerySideBar]);

  const filteredQueries = clientQueries
    // search filteredQueries
    .filter((query: QueryResponseInterface) => {
      // filter based on searchTerm
      if (queriesSearch) {
        return query.Client.companyName
          .toLowerCase()
          .includes(queriesSearch.toLowerCase());
      }
      return true;
    })
    .filter((query: any) => {
      switch (filter) {
        case "all":
          return query;
        case "In-Progress":
          return query.status === "In-Progress";
        case "Assigned To Me":
          return query.assignedTo === getUserFullNameFromCookie();
        case "Resolved":
          return query.status === "Resolved";
        case "VAT-Update":
        case "Credentials Change":
        case "Company Detail Change":
        case "Receipt Not Verified":
        case "Z-Report Not Reflecting":
          return query.queryType === filter;
        default:
          return true;
      }
    });

  const handleFilter = (filter: any) => {
    setFilter(filter);
  };

  const newClientQueryModalHandler = () => (
    <>
      <Dialog
        maxWidth="lg"
        open={open}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle className="flex items-center justify-between">
          New Client Query
          <DialogActions>
            <IconButton color="primary" onClick={handleClose}>
              <BanIcon />
            </IconButton>
          </DialogActions>
        </DialogTitle>
        <DialogContent dividers>
          <NewClientQuery client={client} />
        </DialogContent>
      </Dialog>
    </>
  );

  return (
    <>
      <div className="flex md:space-x-5 app_height overflow-hidden relative rtl:space-x-reverse">
        <Card
          // bodyClass=" py-6 h-full flex flex-col"
          className="h-full bg-white w-64"
        >
          <div className="flex-1 space-y-2 mt-2 h-full pt-6 px-6">
            {clientsResponseError && (
              <Alert severity="error" variant="outlined">
                Disabled due to issues receiving Clients
              </Alert>
            )}
            <Button
              disabled={clientsResponseError}
              className="btn-dark w-full block"
              onClick={() => handleClickOpen()}
            >
              Add Client Query
            </Button>
          </div>

          <SimpleBar className="h-full px-6">
            <ul className="list">
              {topfilterList.map((item, i) => (
                <Topfilter
                  filter={filter}
                  item={item}
                  key={i}
                  onClick={() => handleFilter(item.value)}
                />
              ))}
            </ul>
            <div className="block py-4 text-slate-800 dark:text-slate-400 font-semibold text-xs uppercase">
              Tags
            </div>
            <ul>
              {bottomfilterList.map((item, i) => (
                <BottomFilter
                  filter={filter}
                  item={item}
                  key={i}
                  onClick={() => handleFilter(item.value)}
                />
              ))}
            </ul>
          </SimpleBar>
        </Card>
        <div className="flex-1 md:w-[calc(100%-320px)]">
          <Card
            className="h-full bg-white">
            <SimpleBar className="h-full all-todos overflow-x-hidden">
              <QuerySearch
                onChange={(e: any) => setQueriesSearch(e.target.value)}
                mobileQuerySideBar={mobileQuerySideBar}
                toggleSidebar={toggleMobileSidebar}
              />

              {isLoading ? (
                <ListLoading count={3} />
              ) : (
                <ul className="divide-y divide-slate-100 dark:divide-slate-700 -mb-6 h-full">
                  {filteredQueries.map((query: any, i: number) => (
                    <Queries key={i+1} query={query} />
                  ))}
                  {queriesResponseError && (
                    <li className="mx-6 mt-6">
                      <Badge
                        label="No Result Found"
                        className="bg-danger-500 text-white w-full block text-start"
                      />
                    </li>
                  )}
                </ul>
              )}
            </SimpleBar>
          </Card>
        </div>
      </div>
      {newClientQueryModalHandler()}
    </>
  );
};

export default QueryPage;
