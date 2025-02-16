import { SalesPersonInterface } from "@/types/user";

const SalesPersonDetails = ({ salesPerson }: { salesPerson: SalesPersonInterface }) => {
    return (
        <div className="m-10 max-w-sm">
            <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
                <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">{salesPerson.fullName}</h1>
                <h3 className="font-lg text-semibold text-center leading-6 text-gray-600 capitalize">{salesPerson.zone} zone</h3>
                <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">{salesPerson.address}</p>
                <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                    <li className="flex items-center py-3 text-sm">
                        <span>Status</span>
                        <span className="ml-auto"><span className={`rounded-full ${salesPerson.isActivated ? ("bg-green-200") : ("bg-red-200")} py-1 px-2 text-xs font-medium ${salesPerson.isActivated ? ("text-green-700") : ("text-red-700")}`}>{salesPerson.isActivated ? "Active" : "Inactive"}</span></span>
                    </li>
                    <li className="flex items-center py-3 text-sm">
                        <span>Date Of Birth</span>
                        <span className="ml-auto">{salesPerson.dateOfBirth.toString()}</span>
                    </li>
                    <li className="flex items-center py-3 text-sm">
                        <span>Phone Number</span>
                        <span className="ml-auto">{salesPerson.phoneNumber}</span>
                    </li>
                    <li className="flex items-center py-3 text-sm">
                        <span>Email</span>
                        <span className="ml-auto">{salesPerson.email}</span>
                    </li>
                    <li className="flex items-center py-3 text-sm">
                        <span>Target Clients</span>
                        <span className="ml-auto">{salesPerson.target}</span>
                    </li>
                    <li className="flex items-center py-3 text-sm">
                        <span>NIDA</span>
                        <span className="ml-auto">{salesPerson.nida}</span>
                    </li>
                </ul>
            </div>
        </div>

    );
}

export default SalesPersonDetails;