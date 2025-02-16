"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportsSnapshot from "./components/reports-snapshot";
import UserDeviceReport from "./components/user-device-report";
import UserStats from "./components/user-stats-chart";
import UsersStat from "./components/users-stat";
import ReportsArea from "./components/reports-area";
import TopTen from "./components/top-ten";
import TopPage from "./components/top-page";
import DatePickerWithRange, { DateRange } from "@/components/date-picker-with-range";
import { useEffect, useState } from "react";
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, subDays } from 'date-fns';
import { LeadAnalyticsPayload, LeadAnalyticsResponse } from "@/types/lead";
import { getLeadAnalyticsWithStartAndEndDate } from "@/utils/queries/lead/getQueries";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeadStatsTable from "./components/leads-stats-table";

const DashboardPageView = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfDay(subDays(new Date(), 30)),
    to: new Date()
  });
  const [leadAnalytics, setLeadAnalytics] = useState<LeadAnalyticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (start: Date, end: Date) => {
    try {
      setIsLoading(true);
      setError(null)
      const formattedStart = format(start, 'yyyy-MM-dd');
      const formattedEnd = format(end, 'yyyy-MM-dd');
      const response = await getLeadAnalyticsWithStartAndEndDate(formattedStart, formattedEnd);

      if (response.status === 200) {
        setLeadAnalytics(response.data);
      } else {
        setError('Failed to fetch data');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      fetchData(dateRange.from, dateRange.to);
    }
  }, [dateRange]);

  const handleDateRangeSelect = (range: DateRange) => {
    if (range.from && range.to) {
      setDateRange(range);
    }
  };

  const handlePeriodSelect = (period: 'today' | 'week' | 'month' | 'quarter') => {
    const today = new Date();
    let start: Date;
    let end: Date;

    switch (period) {
      case 'today':
        start = startOfDay(today);
        end = endOfDay(today);
        break;
      case 'week':
        start = startOfWeek(today);
        end = endOfWeek(today);
        break;
      case 'month':
        start = startOfMonth(today);
        end = endOfMonth(today);
        break;
      case 'quarter':
        start = startOfQuarter(today);
        end = endOfQuarter(today);
        break;
    }

    setDateRange({ from: start, to: end });
  };

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-2xl flex flex-row items-center justify-between font-medium text-default-800 ">
        Analytics { }<div className="flex flex-row items-center justify-center gap-4 bg-white p-5 max-w-fit mx-auto rounded-lg shadow-md">
          <DatePickerWithRange
            selected={dateRange}
            onSelect={handleDateRangeSelect}
          />
          <Button
            onClick={() => handlePeriodSelect('today')}
            variant="outline"
          >
            Today
          </Button>
          <Button
            onClick={() => handlePeriodSelect('week')}
            variant="outline"
          >
            Week
          </Button>
          <Button
            onClick={() => handlePeriodSelect('month')}
            variant="outline"
          >
            Month
          </Button>
          <Button
            onClick={() => handlePeriodSelect('quarter')}
            variant="outline"
          >
            This Quarter
          </Button>
        </div>
      </div>


      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <p className="text-gray-500">Loading data...</p>
          </div>
        </div>
      ) : leadAnalytics ? (
        <>
          <div className="grid grid-cols-12  gap-6 ">
            <div className="grid col-span-12">
              <LeadStatsTable leadAnalytics={leadAnalytics.data} />
            </div>
            <div className="col-span-12 lg:col-span-8">
              <ReportsSnapshot timeSeries={leadAnalytics?.data?.overall.timeSeries} />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <UsersStat />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ReportsArea />
            </div>
            <Card>
              <CardHeader className="border-none p-6 pt-5 mb-0">
                <CardTitle className="text-lg font-semibold text-default-900 p-0">
                  New vs Returning Visitors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UserStats />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="border-none p-6 pt-5 mb-0">
                <CardTitle className="text-lg font-semibold text-default-900 p-0">
                  Device Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="simplify-legend">
                  <UserDeviceReport />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              <TopTen />
            </div>
            <div className="col-span-12 lg:col-span-8">
              <Card>
                <CardHeader className="border-none pb-0">
                  <CardTitle className="pt-2.5">Top Page/Post</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <TopPage />
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        null
      )}
    </div>
  );
};

export default DashboardPageView;
