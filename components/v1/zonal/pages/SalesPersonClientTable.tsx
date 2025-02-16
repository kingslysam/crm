import { LeadType } from "@/types/supabase";

const SalesPersonClientTable = ({ leads }: { leads: LeadType[] }) => {
    return (
        <div>
            {leads.length === 0 ? (
                <>
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-red-50 border-l-8 border-red-900">
                            <div className="flex items-center">
                                <div className="p-2">
                                    <div className="flex items-center">
                                        <div className="ml-2">
                                            <svg className="h-8 w-8 text-red-900 mr-2 cursor-pointer"
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <p className="px-6 py-4 text-red-900  text-md">No Leads or Clients Found</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                    <span>Full Name</span>
                                </th >

                                <th
                                    scope="col"
                                    className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                    Email
                                </th>

                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                    Phone
                                </th>

                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                    Status
                                </th>

                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                    Company Name
                                </th>
                            </tr >
                        </thead >
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            {leads.map((lead) => (
                                <tr>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <p className="font-medium text-gray-800 dark:text-white ">
                                                {lead.fullName}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                        <p className="font-medium text-gray-800 dark:text-white ">
                                            {lead.emailAddress}
                                        </p>
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                {lead.phoneNumber}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className={`inline px-3 py-1 text-sm font-normal rounded-full ${lead?.status.toLowerCase() === "on boarded" ? "text-emerald-500  bg-emerald-100/60" : "text-yellow-500  bg-yellow-100/60"} text-emerald-500 gap-x-2`}>
                                                {lead.status}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <p className="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                                            {lead.companyName}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table >
                </div >
            )}

        </div>
    )
}

export default SalesPersonClientTable;