// import { Icon } from "@iconify/react";
import React from "react";

const Badge = ({
  className = "bg-danger-500 text-white",
  label,
  icon,
  children,
}: {
  className?: string;
  label?: string;
  icon?: any;
  children?: any;
}) => {
  return (
    <span className={`badge ${className}`}>
      {!children && (
        <span className="inline-flex items-center">
          {icon && (
            <span className="inline-block ltr:mr-1 rtl:ml-1">
              {/* <Icon icon={icon} /> */}
            </span>
          )}
          {label}
        </span>
      )}
      {children && <span className="inline-flex items-center">{children}</span>}
    </span>
  );
};

export default Badge;
