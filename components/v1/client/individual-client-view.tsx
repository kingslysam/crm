import { Card, CardContent } from "@/components/ui/card";
import { User, Phone, Location, Calender, CalenderCheck, MenuBar, Mail, Cart, Components, Diamond, Note2, DocsCheck, Flag, Sun } from "@/components/svg";
import { ClientResponseInterface } from "@/types/client";
import { formatDateToTimeZone } from "@/utils/formatting";
import ClientNotes from "./client-notes";
import UpdateClientForm from "./update-client-form";
interface UserInfoItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | null;
}
const IndividualClientView = ({ client }: { client: ClientResponseInterface }) => {
    const userInfo: UserInfoItem[] = [
        {
            icon: User,
            label: "Full Name",
            value: client.fullName
        },
        {
            icon: Phone,
            label: "Mobile",
            value: client.phoneNumber
        },
        {
            icon: Location,
            label: "Location",
            value: client.address
        },
        {
            icon: CalenderCheck,
            label: "Joining Date",
            value: formatDateToTimeZone(client.dateOnBoarded)
        },
        {
            icon: MenuBar,
            label: "TIN",
            value: client.tin
        },
        {
            icon: Mail,
            label: "Email For Comms",
            value: client.emailUsedForComms
        },
        {
            icon: Mail,
            label: "Email For Login",
            value: client.emailUsedForLogin
        },
        {
            icon: Cart,
            label: "Business Category",
            value: client.businessCategory
        },
        {
            icon: Components,
            label: "Service",
            value: client.service
        },
        {
            icon: Diamond,
            label: "Platforms",
            value: client.platform
        },
    ]

    const half = Math.ceil(userInfo.length / 2);
    const firstHalf = userInfo.slice(0, half);
    const secondHalf = userInfo.slice(half);

    return (
        <>
            <p className="text-center font-bold text-xl mb-8">Client Profile</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <CardContent className="px-4">
                        <ul className="mt-6 space-y-4">
                            {firstHalf.map((item, index) => (
                                <li key={`user-info-${index}`} className="flex items-center">
                                    <div className="flex-none 2xl:w-56 flex items-center gap-1.5">
                                        <span>{<item.icon className="w-4 h-4 text-primary" />}</span>
                                        <span className="text-sm font-medium text-default-800">{item.label}:</span>
                                    </div>
                                    <div className="flex-1 text-sm text-default-700">{item.value}</div>
                                </li>
                            ))}
                            <li className="flex items-center">
                                <div className="flex-none 2xl:w-56 flex items-center gap-1.5">
                                    <span>{<Sun className="w-4 h-4 text-primary" />}</span>
                                    <span className="text-sm font-medium text-default-800">VIP Status:</span>
                                </div>
                                <div className="flex-1 text-sm text-default-700">{client.isVip === "Yes" ? "VIP Client" : "Normal Client"}</div>
                            </li>
                            <li className="flex items-center">
                                <div className="flex-none 2xl:w-56 flex items-center gap-1.5">
                                    <span>{<DocsCheck className="w-4 h-4 text-primary" />}</span>
                                    <span className="text-sm font-medium text-default-800">Payment Status:</span>
                                </div>
                                <div className="flex-1 text-sm text-default-700">
                                    <span className={`rounded-full ${client.paymentStatus?.toLowerCase() === "blocked" ? "bg-red-400" : client.paymentStatus?.toLowerCase() === "invoiced" ? "bg-violet-400" : "bg-green-400"}  text-white px-2 py-0.5 text-xs`}>
                                        {client.paymentStatus}
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="px-4">
                        <ul className="mt-6 space-y-4">
                            {secondHalf.map((item, index) => (
                                <li key={`user-info-${index + half}`} className="flex items-center">
                                    <div className="flex-none 2xl:w-56 flex items-center gap-1.5">
                                        <span>{<item.icon className="w-4 h-4 text-primary" />}</span>
                                        <span className="text-sm font-medium text-default-800">{item.label}:</span>
                                    </div>
                                    <div className="flex-1 text-sm text-default-700 text-wrap">{item.value}</div>
                                </li>
                            ))}
                            <li className="flex items-center">
                                <div className="flex-none 2xl:w-56 flex items-center gap-1.5">
                                    <span>{<Sun className="w-4 h-4 text-primary" />}</span>
                                    <span className="text-sm font-medium text-default-800">Activation Status:</span>
                                </div>
                                <div className="flex-1 text-sm text-default-700">
                                    <span className={`rounded-full ${!client.isActivated ? "bg-red-400" : "bg-green-400"} text-white px-2 py-0.5 text-xs`}>
                                        {client.isActivated ? "Active Client" : "Non-Active Client"}
                                    </span>
                                </div>
                            </li>
                            <li className="flex items-center">
                                <div className="flex-none 2xl:w-56 flex items-center gap-1.5">
                                    <span>{<DocsCheck className="w-4 h-4 text-primary" />}</span>
                                    <span className="text-sm font-medium text-default-800">Blocked Status:</span>
                                </div>
                                <div className="flex-1 text-sm text-default-700">
                                    <span className={`rounded-full ${client.isBlocked ? "bg-red-400" : "bg-green-400"} text-white px-2 py-0.5 text-xs`}>
                                        {client.isBlocked ? "Blocked Client" : "Not Block Client"}

                                    </span>
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
                <div className="col-span-2 flex justify-center items-center">
                    <UpdateClientForm client={client} />
                </div>
                <div className="col-span-2 flex flex-col justify-center border rounded-lg py-8 items-center">
                    <p>Client Notes</p>
                    <ClientNotes clientID={client.clientID} initialClientNotes={client.ClientNote} />
                </div>
            </div>
        </>
    )
}

export default IndividualClientView;