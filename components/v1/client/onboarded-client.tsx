'use client';

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OnBoardingTable from "./onboarded-table";
import { ClientResponseInterface } from "@/types/client";


interface ClientGroups {
    all: ClientResponseInterface[];
    blocked: ClientResponseInterface[];
    invoiced: ClientResponseInterface[];
    due: ClientResponseInterface[];
}

const useClientGroups = (clients: ClientResponseInterface[]): ClientGroups => {
    const [clientGroups, setClientGroups] = useState<ClientGroups>({
        all: [],
        blocked: [],
        invoiced: [],
        due: [],
    });

    useEffect(() => {
        const currentMonth = format(new Date(), "MM");
        const currentYear = format(new Date(), "yyyy");

        const groups: ClientGroups = {
            all: clients,
            blocked: clients.filter((client) => client.isBlocked),
            invoiced: clients.filter((client) => client.paymentStatus === "Invoiced"),
            due: clients.filter((client) => {
                const clientMonth = format(new Date(client.dateOnBoarded), "MM");
                const clientYear = format(new Date(client.dateOnBoarded), "yyyy");
                return clientMonth === currentMonth && clientYear < currentYear;
            }),
        };

        setClientGroups(groups);
    }, [clients]);

    return clientGroups;
};

const OnBoardedClientView = ({ clients }: { clients: ClientResponseInterface[] }) => {
    const clientGroups = useClientGroups(clients);

    return (
        <div className="">
            <Tabs defaultValue="all" className="inline-block">
                <TabsList className="border bg-background">
                    <TabsTrigger
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        value="all"
                    >
                        <Icon icon="material-symbols:pallet-outline-rounded" className="h-5 w-5 mr-2" />
                        All
                    </TabsTrigger>
                    <TabsTrigger
                        value="due-this-month"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                        <Icon icon="ph:calendar-x-fill" className="h-5 w-5 mr-2" />
                        Due this month
                        {clientGroups.due.length > 0 && (
                            <span className="ml-2 rounded-full bg-violet-400 text-white px-2 py-0.5 text-xs">
                                {clientGroups.due.length}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger
                        value="blocked"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                        <Icon icon="ph:not-equals-fill" className="h-5 w-5 mr-2" />
                        Blocked
                        {clientGroups.blocked.length > 0 && (
                            <span className="ml-2 rounded-full bg-violet-400 text-white px-2 py-0.5 text-xs">
                                {clientGroups.blocked.length}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger
                        value="invoiced"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                        <Icon icon="ph:invoice-duotone" className="h-5 w-5 mr-2" />
                        Invoiced
                        {clientGroups.invoiced.length > 0 && (
                            <span className="ml-2 rounded-full bg-violet-400 text-white px-2 py-0.5 text-xs">
                                {clientGroups.invoiced.length}
                            </span>
                        )}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="p-5 bg-background rounded-lg border">
                    <OnBoardingTable clients={clientGroups.all} />
                </TabsContent>
                <TabsContent value="due-this-month" className="p-5 bg-background rounded-lg border">
                    <OnBoardingTable clients={clientGroups.due} />
                </TabsContent>
                <TabsContent value="blocked" className="p-5 bg-background rounded-lg border">
                    <OnBoardingTable clients={clientGroups.blocked} />
                </TabsContent>
                <TabsContent value="invoiced" className="p-5 bg-background rounded-lg border">
                    <OnBoardingTable clients={clientGroups.invoiced} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default OnBoardedClientView;