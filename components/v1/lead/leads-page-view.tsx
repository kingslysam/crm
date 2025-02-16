'use client';

import { useMemo } from 'react';
import { LeadResponseType } from '@/types/lead';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icon } from '@iconify/react';
import LeadsTable from './LeadsTable';
import { ClientResponseInterface } from '@/types/client';

interface LeadsPageProps {
    leads: LeadResponseType[];
    clients: ClientResponseInterface[]; // Replace 'any' with your client type
    isLoading?: boolean;
}

interface GroupedLeads {
    'On Process'?: LeadResponseType[];
    'Hesitant'?: LeadResponseType[];
    'Future Client'?: LeadResponseType[];
    'On Boarded'?: LeadResponseType[];
    [key: string]: LeadResponseType[] | undefined;
}

interface LeadStats {
    total: number;
    onProcess: number;
    hesitant: number;
    futureClient: number;
    onBoarded: number;
}

const LeadsViewPage = ({ leads = [], clients = [], isLoading = false }: LeadsPageProps) => {
    const { groupedLeads, stats } = useMemo(() => {
        const grouped = leads.reduce((acc, lead) => {
            const status = lead.status;
            if (!acc[status]) {
                acc[status] = [];
            }
            acc[status].push(lead);
            return acc;
        }, {} as GroupedLeads);

        return {
            groupedLeads: grouped,
            stats: {
                total: leads.length,
                onProcess: grouped['On Process']?.length ?? 0,
                hesitant: grouped['Hesitant']?.length ?? 0,
                futureClient: grouped['Future Client']?.length ?? 0,
                onBoarded: grouped['On Boarded']?.length ?? 0
            }
        };
    }, [leads]);

    return (
        <>
            {/* <LeadBreadCurb title="Lead" client={clients} /> */}
            <Tabs defaultValue="on-boarded" className="inline-block w-[95vw]">
                <TabsList className="border bg-background">
                    <TabsTrigger
                        value="on-boarded"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                        <Icon icon="ph:calendar-x-fill" className="h-5 w-5 mr-2" />
                        On Boarded
                        {groupedLeads['On Boarded']?.length && (
                            <span className="ml-2 rounded-full bg-violet-400 text-white px-2 py-0.5 text-xs">
                                {groupedLeads['On Boarded']?.length}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger
                        value="on-process"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                        <Icon icon="ph:calendar-x-fill" className="h-5 w-5 mr-2" />
                        On Process
                        {groupedLeads['On Process']?.length && (
                            <span className="ml-2 rounded-full bg-violet-400 text-white px-2 py-0.5 text-xs">
                                {groupedLeads['On Process']?.length}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger
                        value="future-client"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                        <Icon icon="ph:not-equals-fill" className="h-5 w-5 mr-2" />
                        Future Client
                        {groupedLeads['Future Client']?.length && (
                            <span className="ml-2 rounded-full bg-violet-400 text-white px-2 py-0.5 text-xs">
                                {groupedLeads['Future Client']?.length}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger
                        value="hesitant"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                        <Icon icon="ph:invoice-duotone" className="h-5 w-5 mr-2" />
                        Hesitant
                        {groupedLeads['Hesitant']?.length && (
                            <span className="ml-2 rounded-full bg-violet-400 text-white px-2 py-0.5 text-xs">
                                {groupedLeads['Hesitant']?.length}
                            </span>
                        )}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="on-boarded" className="p-5 bg-background rounded-lg border">
                    <LeadsTable leads={groupedLeads['On Boarded'] ?? []} />
                </TabsContent>
                <TabsContent value="on-process" className="p-5 bg-background rounded-lg border">
                    <LeadsTable leads={groupedLeads['On Process'] ?? []} />
                </TabsContent>
                <TabsContent value="future-client" className="p-5 bg-background rounded-lg border">
                    <LeadsTable leads={groupedLeads['Future Client'] ?? []} />
                </TabsContent>
                <TabsContent value="hesitant" className="p-5 bg-background rounded-lg border">
                    <LeadsTable leads={groupedLeads['Hesitant'] ?? []} />
                </TabsContent>
            </Tabs>
        </>
    );
};

export default LeadsViewPage;