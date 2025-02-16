import { formatCurrency } from "@/utils/formatting";

const IndividualZoneStats = ({
  totalLeadsCount,
  onBoardedLeadsCount,
  futureClientsCount,
}: {
  totalLeadsCount: number;
  onBoardedLeadsCount: number;
  futureClientsCount: number;
}) => {
  const statistics = [
    {
      title: "Total Leads",
      count: totalLeadsCount,
      bg: "bg-violet-500",
      text: "text-primary-500",
      percent: "25.67% ",
      icon: "heroicons:arrow-trending-up",
      img: "/assets/images/all-img/shade-1.png",
      percentClass: "text-primary-500",
    },
    {
      title: "OnBoarded Clients",
      count: onBoardedLeadsCount,
      bg: "bg-red-500",
      text: "text-primary-500",
      percent: "25.67% ",
      icon: "heroicons:arrow-trending-up",
      img: "/assets/images/all-img/shade-1.png",
      percentClass: "text-primary-500",
    },
    {
      title: "Revenue",
      count: formatCurrency(onBoardedLeadsCount * 180000),
      bg: "bg-yellow-500",
      text: "text-primary-500",
      percent: "8.67%",
      icon: "heroicons:arrow-trending-up",
      img: "/assets/images/all-img/shade-2.png",
      percentClass: "text-primary-500",
    },
    {
      title: "Future Clients",
      count: futureClientsCount,
      bg: "bg-green-500",
      text: "text-primary-500",
      percent: "11.67%  ",
      icon: "heroicons:arrow-trending-up",
      img: "/assets/images/all-img/shade-4.png",
      percentClass: "text-primary-500",
    },
    {
      title: "Conversion Rate",
      count:
        ((onBoardedLeadsCount / totalLeadsCount) * 100).toFixed(2) + "%",
      bg: "bg-primary-500",
      text: "text-danger-500",
      percent: "1.67%  ",
      icon: "heroicons:arrow-trending-down",
      img: "/assets/images/all-img/shade-3.png",
      percentClass: "text-danger-500",
    },
  ];
  return (
    <>
      {statistics.map((item, i) => (
        <div
          key={i + 1}
          className={`${item.bg} rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}
        >
          <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">
            {item.title}
          </span>
          <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-6">
            {item.count}
          </span>
        </div>
      ))}
    </>
  );
};

export default IndividualZoneStats;
