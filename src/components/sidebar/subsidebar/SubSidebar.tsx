import React from "react";

interface SubSidebarProps {
  children: React.ReactNode;
  width?: string;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

const SubSidebar = ({
  children,
  width = "w-[275px]",
  className = "",
  style = {},
  ref
}: SubSidebarProps) => {
  return (
    <div
    ref={ref}
      style={style}
      className={`absolute bg-white border border-gray-100 rounded-tr-lg rounded-br-lg ${width} py-4 px-3 z-50 shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

export default SubSidebar;
