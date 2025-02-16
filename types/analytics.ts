export interface PlatformStats {
  name: string;
  value: number;
}

export interface MonthlyLeads {
  month: string;
  totalLeads: number;
}

export interface MonthlySeriesData {
  month: string;
  futureClients: number;
  onProcess: number;
  onBoarded: number;
  hesitant: number;
}

export interface LeadAnalytics {
  lastWeekMetrics: {
    sales: number;
    revenue: number;
    conversion: number;
    totalLeads: number;
  };
  weekBeforeLastMetrics: {
    sales: number;
    revenue: number;
    conversion: number;
    totalLeads: number;
  };
}


export interface EmployeeStats {
  title: string;
  img: string;
  value: number;
  number: number;
  active?: boolean;
  bg: string;
  barColor: string;
}
