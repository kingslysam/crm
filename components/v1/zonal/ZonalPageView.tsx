'use client'
import ZonalPageIndividualCard from "./ZonalPageIndividualCard";

const ZonalPageView = () => {
  const zonalPageData = [
    {
      id: '1',
      zone: 'Lake',
      totalLeads: 100,
      totalClients: 5,
      totalSalesPerson: 10,
      totalRevenue: 1000000,
      zoneManager: 'Norah'
    },
    {
      id: '2',
      zone: 'Central',
      totalLeads: 200,
      totalClients: 10,
      totalSalesPerson: 20,
      totalRevenue: 2000000,
      zoneManager: 'John'
    },
    {
      id: '3',
      zone: 'Southern',
      totalLeads: 300,
      totalClients: 15,
      totalSalesPerson: 30,
      totalRevenue: 3000000,
      zoneManager: 'Doe'
    },
    {
      id: '4',
      zone: 'Northern',
      totalLeads: 400,
      totalClients: 20,
      totalSalesPerson: 40,
      totalRevenue: 4000000,
      zoneManager: 'Jane'
    },
    {
      id: '5',
      zone: 'Eastern',
      totalLeads: 500,
      totalClients: 25,
      totalSalesPerson: 50,
      totalRevenue: 5000000,
      zoneManager: 'Jack'
    }
  ]
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">
        {zonalPageData.map((data, index) => (
          <ZonalPageIndividualCard key={index + 1} pageData={data} />
        ))}
      </div>
    </div>
  );
};

export default ZonalPageView;
