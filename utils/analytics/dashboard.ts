import { endOfWeek, format, parseISO, startOfWeek, subMonths } from "date-fns";
import {
  EmployeeStats,
  LeadAnalytics,
  MonthlyLeads,
  MonthlySeriesData,
  PlatformStats,
} from "@/types/analytics";
import { LeadResponseType } from "@/types/lead";

export function calculatePlatformStats(
  leads: LeadResponseType[]
): PlatformStats[] {
  const platformCounts: { [key: string]: number } = {};
  const totalLeads = leads.length;

  leads.forEach((lead) => {
    const platform = lead.platform;
    if (platform in platformCounts) {
      platformCounts[platform]++;
    } else {
      platformCounts[platform] = 1;
    }
  });

  const platformStats = Object.entries(platformCounts).map(([name, count]) => ({
    name,
    value: parseFloat(((count / totalLeads) * 100).toFixed(0)),
  }));

  platformStats.sort((a, b) => b.value - a.value);

  return platformStats;
}

export function groupLeadsByMonth(leads: LeadResponseType[]): MonthlyLeads[] {
  const monthlyCounts: { [key: string]: number } = {};
  leads.forEach((lead) => {
    const month = format(parseISO(lead.date), "yyyy-MM");
    if (monthlyCounts[month]) {
      monthlyCounts[month]++;
    } else {
      monthlyCounts[month] = 1;
    }
  });

  return Object.entries(monthlyCounts).map(([month, totalLeads]) => ({
    month,
    totalLeads,
  }));
}

export function calculateMonthlySeriesData(
  leads: LeadResponseType[]
): MonthlySeriesData[]  {
  const monthlyData: {
    [key: string]: {
      futureClients: number;
      onProcess: number;
      onBoarded: number;
      hesitant: number;
    };
  } = {};

  const now = new Date();
  const months = Array.from({ length: 12 }, (_, i) =>
    format(subMonths(now, i), "yyyy-MM")
  ).reverse();

  months.forEach((month) => {
    monthlyData[month] = {
      futureClients: 0,
      onProcess: 0,
      onBoarded: 0,
      hesitant: 0,
    };
  });

  leads.forEach((lead) => {
    const month = format(parseISO(lead.date), "yyyy-MM");
    if (monthlyData[month]) {
      if (lead.status === "Future Client") {
        monthlyData[month].futureClients++;
      } else if (lead.status === "On Process") {
        monthlyData[month].onProcess++;
      } else if (lead.status === "On Boarded") {
        monthlyData[month].onBoarded++;
      } else if (lead.status === "Hesitant") {
        monthlyData[month].hesitant++;
      }
    }
  });

  return months.map((month) => ({
    month,
    futureClients: monthlyData[month].futureClients,
    onProcess: monthlyData[month].onProcess,
    onBoarded: monthlyData[month].onBoarded,
    hesitant: monthlyData[month].hesitant,
  }));
}

export function calculateWeeklyAnalytics(leads: LeadResponseType[]) {
  const MILLISECONDS_IN_A_WEEK = 7 * 24 * 60 * 60 * 1000;
  const now = new Date();
  const endOfLastWeek = new Date(
    now.getTime() - now.getDay() * 24 * 60 * 60 * 1000
  );
  const startOfLastWeek = new Date(
    endOfLastWeek.getTime() - MILLISECONDS_IN_A_WEEK
  );
  const startOfWeekBeforeLast = new Date(
    startOfLastWeek.getTime() - MILLISECONDS_IN_A_WEEK
  );

  const lastWeekLeads = leads.filter(
    (lead) =>
      new Date(lead.date) >= startOfLastWeek &&
      new Date(lead.date) < endOfLastWeek
  );

  const weekBeforeLastLeads = leads.filter(
    (lead) =>
      new Date(lead.date) >= startOfWeekBeforeLast &&
      new Date(lead.date) < startOfLastWeek
  );

  const calculateMetrics = (weekLeads: LeadResponseType[]) => {
    const totalLeads = weekLeads.length;
    const sales = weekLeads.filter(
      (lead) => lead.status === "On Boarded"
    ).length;
    const revenue = sales * 212400;
    const conversion = totalLeads === 0 ? 0 : (sales / totalLeads) * 100;

    return { sales, revenue, conversion, totalLeads };
  };

  const lastWeekMetrics = calculateMetrics(lastWeekLeads);
  const weekBeforeLastMetrics = calculateMetrics(weekBeforeLastLeads);

  return { lastWeekMetrics, weekBeforeLastMetrics };
}

export function calculateWeeklyAnalyticsv2(
  leads: LeadResponseType[],
  startDate: Date,
  endDate: Date
) {
  const weekLeads = leads.filter(
    (lead) => new Date(lead.date) >= startDate && new Date(lead.date) <= endDate
  );

  const calculateMetrics = (weekLeads: LeadResponseType[]) => {
    const totalLeads = weekLeads.length;
    const sales = weekLeads.filter(
      (lead) => lead.status === "On Boarded"
    ).length;
    const revenue = sales * 212400;
    const conversion = totalLeads === 0 ? 0 : (sales / totalLeads) * 100;

    return { sales, revenue, conversion, totalLeads };
  };

  const lastWeekMetrics = calculateMetrics(weekLeads);

  return { lastWeekMetrics };
}

export function generateEmployees(leads: LeadResponseType[]) {
  const employeeMap: Record<string, EmployeeStats> = {};

  // Count leads for each employee
  leads.forEach((lead) => {
    if (lead.addedBy) {
      const addedByNames = lead.addedBy.split("/");
      addedByNames.forEach((name) => {
        const addedBy = name.trim();
        if (!addedBy) {
          return;
        }
        if (!employeeMap[addedBy]) {
          employeeMap[addedBy] = {
            title: addedBy,
            img: `/assets/images/people/${addedBy.replace(/\s+/g, " ")}.jpg`,
            value: 0,
            number: 0,
            bg: "",
            barColor: "",
          };
        }
        employeeMap[addedBy].value += 1;
      });
    }
  });

  // Convert map to array and remove entries with 0 value
  const employees = Object.values(employeeMap).filter((emp) => emp.value > 0);

  // Sort by value (number of leads)
  employees.sort((a, b) => b.value - a.value);

  // Add rank and assign properties based on rank
  employees.forEach((employee, index) => {
    employee.number = index + 1;
    if (index === 0) {
      employee.active = true;
      employee.bg = "before:bg-success-500";
      employee.barColor = "bg-success-500";
    } else if (index === 1) {
      employee.bg = "before:bg-warning-500";
      employee.barColor = "bg-warning-500";
    } else if (index === 2) {
      employee.bg = "before:bg-info-500";
      employee.barColor = "bg-info-500";
    } else {
      employee.bg = "before:bg-info-500";
      employee.barColor = "bg-info-500";
    }
  });

  // Separate top 3 employees and the rest
  const top3Employees = employees.slice(0, 3);
  const restEmployees = employees.slice(3);

  return { top3Employees, restEmployees };
}
