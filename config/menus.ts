
import {
  Application,
  Chart,
  Components,
  DashBoard,
  Stacks2,
  Map,
  Grid,
  Files,
  Graph,
  ClipBoard,
  Cart,
  Envelope,
  Messages,
  Monitor,
  ListFill,
  Calendar,
  Flag,
  Book,
  Note,
  ClipBoard2,
  Note2,
  Note3,
  BarLeft,
  BarTop,
  ChartBar,
  PretentionChartLine,
  PretentionChartLine2,
  Google,
  Pointer,
  Map2,
  MenuBar,
  Icons,
  ChartArea,
  Building,
  Building2,
  Sheild,
  Error,
  Diamond,
  Heroicon,
  LucideIcon,
  CustomIcon,
  Mail,
} from "@/components/svg";


export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[]
  nested?: MenuItemProps[]
  onClick: () => void;


}

export const menusConfig = {
  mainNav: [
    {
      title: "Dashboard",
      icon: DashBoard,
      child: [
        {
          title: "Analytics",
          href: "/dashboard",
          icon: Graph,
        },
        {
          title: "Ecommerce",
          href: "/ecommerce",
          icon: Cart,
        },
        {
          title: "Project ",
          href: "/project",
          icon: ClipBoard,
        },
      ],
    },
  ],
  sidebarNav: {
    modern: [
      {
        isHeader: true,
        title: "menu",
      },
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboard",
      },
      {
        title: "Clients",
        icon: DashBoard,
        child: [
          {
            title: "On-Boarded Clients",
            href: "/client",
            icon: Graph,
          },
          {
            title: "Operators",
            href: "/client/operator",
            icon: ClipBoard,
          },
        ],
      },
      {
        title: "Leads",
        icon: Envelope,
        href: "/lead",
      },
      {
        title: "Client Queries",
        icon: Messages,
        href: "/query",
      },
      {
        title: "Zonal",
        icon: ListFill,
        href: "/zonal",
      },
      {
        title: "Commisions",
        icon: Calendar,
        href: "/commission",
      },
      {
        title: "Projects",
        icon: Monitor,
        href: "/project",
      },
      {
        title: "Reports",
        icon: Files,
        child: [
          {
            title: "Client Reports",
            href: "/report/client",
          },
          {
            title: "Employee Reports",
            href: "/report/employee",
          },
        ],
      },
    ],
    classic: [
      {
        isHeader: true,
        title: "menu",
      },
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboard",
      },
      {
        title: "Clients",
        icon: DashBoard,
        child: [
          {
            title: "On-Boarded Clients",
            href: "/client",
            icon: Graph,
          },
          {
            title: "Operators",
            href: "/client/operator",
            icon: ClipBoard,
          },
        ],
      },
      {
        title: "Leads",
        icon: Envelope,
        href: "/lead",
      },
      {
        title: "Client Queries",
        icon: Messages,
        href: "/query",
      },
      {
        title: "Zonal",
        icon: ListFill,
        href: "/zonal",
      },
      {
        title: "Commisions",
        icon: Calendar,
        href: "/commission",
      },
      {
        title: "Projects",
        icon: Monitor,
        href: "/project",
      },
      {
        title: "Reports",
        icon: Files,
        child: [
          {
            title: "Client Reports",
            href: "/report/client",
          },
          {
            title: "Employee Reports",
            href: "/report/employee",
          },
        ],
      },
    ],
  },
};


export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number]
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number]
export type MainNavType = (typeof menusConfig.mainNav)[number]