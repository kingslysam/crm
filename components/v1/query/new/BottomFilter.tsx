import React from "react";

const BottomFilter = ({ onClick, item, filter }:{onClick: any, item: any, filter: any}) => {
  return (
    <li
      onClick={onClick}
      className={` flex space-x-2 
                      text-sm capitalize py-2 cursor-pointer
                       items-center rtl:space-x-reverse
                        ${
                          filter === item.value
                            ? "font-medium text-slate-800 dark:text-slate-300"
                            : "font-normal text-slate-600 dark:text-slate-300"
                        }
                        `}
    >
      <span
        className={`
                                ${
                                  item.value === "VAT-Update"
                                    ? "bg-red-500 ring-red-500"
                                    : ""
                                }
                                ${
                                  item.value === "Credentials Change"
                                    ? "bg-green-500 ring-green-500"
                                    : ""
                                }
                                ${
                                  item.value === "Company Detail Change"
                                    ? "bg-yellow-500 ring-yellow-500"
                                    : ""
                                }
                                ${
                                  item.value === "Receipt Not Verified"
                                    ? "bg-primary-500 ring-primary-500"
                                    : ""
                                }
                                ${
                                  item.value === "Z-Report Not Reflecting"
                                    ? "bg-purple-500 ring-purple-500"
                                    : ""
                                }
                                ${filter === item.value ? "ring-4" : "ring-0"}
                  inline-block h-2 w-2 rounded-full ring-opacity-30 transition-all duration-150 `}
      ></span>
      <span className="transition duration-150">{item.name}</span>
    </li>
  );
};

export default BottomFilter;
