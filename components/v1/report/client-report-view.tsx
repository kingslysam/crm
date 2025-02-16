"use client"
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import DatePickerWithRange, { DateRange } from "@/components/date-picker-with-range";
import { LeadAnalyticsResponse } from "@/types/lead";
import { getLeadAnalyticsWithStartAndEndDate } from "@/utils/queries/lead/getQueries";
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter } from 'date-fns';
import { Loader2 } from "lucide-react";

const ClientReportView = () => {
    const [dateRange, setDateRange] = useState<DateRange>({
        from: new Date(),
        to: new Date()
    });
    const [leadAnalytics, setLeadAnalytics] = useState<LeadAnalyticsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (start: Date, end: Date) => {
        try {
            setIsLoading(true);
            setError(null);
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
        <div>
            <div className="flex flex-row items-center justify-center gap-4 bg-white p-5 max-w-fit mx-auto rounded-lg shadow-md">
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

            {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                        <p className="text-gray-500">Loading data...</p>
                    </div>
                </div>
            ) : leadAnalytics ? (
                <div className="p-6 m-5 rounded-lg shadow-md bg-white">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-100 rounded-lg">
                            <tr>
                                <th className="py-3.5 px-10 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <span>Zone</span>
                                </th>
                                <th className="px-2 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                                    Leads
                                </th>
                                <th className="px-2 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                                    On Process
                                </th>
                                <th className="px-1 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                                    On Boarded Leads Within the Period
                                </th>
                                <th className="px-1 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                                    On Boarded Leads From Previous Period
                                </th>
                                <th className="px-2 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                                    Period Target
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            {Object.keys(leadAnalytics.data).map((zone) => (
                                <tr key={zone}>
                                    <td className="px-10 py-4 text-sm font-medium text-center whitespace-nowrap">
                                        {zone}
                                    </td>
                                    <td className="px-2 py-4 text-sm font-medium text-center whitespace-nowrap">
                                        {/* {leadAnalytics.data[zone].totalLeadsInPeriod.toLocaleString()} */}
                                    </td>
                                    <td className="px-2 py-4 text-sm text-center whitespace-nowrap">
                                        {/* {leadAnalytics.data[zone].totalLeadsInProcess.toLocaleString()} */}
                                    </td>
                                    <td className="px-1 py-4 text-sm text-center whitespace-nowrap">
                                        {/* {leadAnalytics.data[zone].totalOnBoardedLeadsInPeriod.toLocaleString()} */}
                                    </td>
                                    <td className="px-1 py-4 text-sm text-center whitespace-nowrap">
                                        {/* {leadAnalytics.data[zone].onBoardedLeadsFromOutsidePeriod.toLocaleString()} */}
                                    </td>
                                    <td className="px-1 py-4 text-sm text-center whitespace-nowrap">
                                        -
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}
        </div>
    );
}

export default ClientReportView;