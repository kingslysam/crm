import { LeadAnalyticsPayload, LeadAnalyticsResponse } from "@/types/lead";

const LeadStatsTable = ({ leadAnalytics, periodTarget }: { leadAnalytics: LeadAnalyticsPayload | null, periodTarget: number }) => {
    return (
        <>
            {leadAnalytics !== null && (
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
                            {Object.keys(leadAnalytics?.byZone).map((zone) => (
                                <tr key={zone}>
                                    <td className="px-10 py-4 text-sm font-medium text-center whitespace-nowrap">
                                        {zone}
                                    </td>
                                    <td className="px-2 py-4 text-sm font-medium text-center whitespace-nowrap">
                                        {leadAnalytics.byZone[zone].totalLeadsInPeriod.toLocaleString()}
                                    </td>
                                    <td className="px-2 py-4 text-sm text-center whitespace-nowrap">
                                        {leadAnalytics.byZone[zone].totalLeadsInProcess.toLocaleString()}
                                    </td>
                                    <td className="px-1 py-4 text-sm text-center whitespace-nowrap">
                                        {leadAnalytics.byZone[zone].totalOnBoardedLeadsInPeriod.toLocaleString()}
                                    </td>
                                    <td className="px-1 py-4 text-sm text-center whitespace-nowrap">
                                        {leadAnalytics.byZone[zone].onBoardedLeadsFromOutsidePeriod.toLocaleString()}
                                    </td>
                                    <td className="px-1 py-4 text-sm text-center whitespace-nowrap">
                                        {periodTarget * 2}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default LeadStatsTable;