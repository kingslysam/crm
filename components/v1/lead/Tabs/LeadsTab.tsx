import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { LeadType } from "@/types/supabase";
import LeadsTable from "../LeadsTable";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <>
      {" "}
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <div className="p-3">{children}</div>}
      </div>
    </>
  );
}


const LeadsTab = ({
  onproccessLeads,
  hesitantLead,
  futureClientLead,
  onboardedLeads,
}: {
  onproccessLeads: LeadType[];
  hesitantLead: LeadType[];
  futureClientLead: LeadType[];
  onboardedLeads: LeadType[];
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="w-full">
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="On Boarded" />
        <Tab label="On Process" />
        <Tab label="Hesitant" />
        <Tab label="Future Client" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <LeadsTable leads={onboardedLeads} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <LeadsTable leads={onproccessLeads} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <LeadsTable leads={hesitantLead} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <LeadsTable leads={futureClientLead} />
      </CustomTabPanel>
    </div>
  );
};

export default LeadsTab;
