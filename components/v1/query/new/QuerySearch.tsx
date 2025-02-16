import React from "react";
import useWidth from "@/hooks/use-width";
import { Icon } from "@iconify/react";
const QuerySearch = ({
  onChange,
  toggleSidebar,
  mobileQuerySideBar,
}: {
  onChange: any;
  toggleSidebar: () => void;
  mobileQuerySideBar: boolean;
}) => {
  const { width, breakpoints } = useWidth();


  return (
    <div className="md:flex justify-between items-center sticky bg-white dark:bg-slate-800 top-0 pt-6 pb-4 px-6 z-[44] border-b border-slate-100 dark:border-slate-700 rounded-t-md">
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        {width < breakpoints.lg && (
          <div
            className="md:h-8 md:w-8 h-6 w-6 bg-slate-100 dark:bg-slate-900
           dark:text-slate-400 flex flex-col justify-center items-center md:text-base
            text-sm rounded-full cursor-pointer"
            onClick={toggleSidebar}
          >
            {/* <Icon icon="heroicons-outline:menu" /> */}
          </div>
        )}
        <div className="max-w-[180px] flex items-center space-x-1 rtl:space-x-reverse">
          <div className="flex-none dark:text-slate-300">
            {/* <Icon icon="heroicons-outline:search" /> */}
          </div>
          <div className="flex-1">
            <input
              onChange={onChange}
              type="text"
              placeholder="Search Company Name"
              className="bg-transparent text-sm font-regular text-slate-600 dark:text-slate-300 transition duration-150 rounded px-2 py-1 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuerySearch;
