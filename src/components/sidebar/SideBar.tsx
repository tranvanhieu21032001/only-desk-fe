import React, { useState, useRef, useEffect } from "react";
import icGetstarted from "../../assets/icons/icGetstarted.svg";
import icOpenSideBar from "../../assets/icons/icOpenSideBar.svg";
import icTicket from "../../assets/icons/icTicket.svg";
import icCustomers from "../../assets/icons/icCustomers.svg";
import icOrganization from "../../assets/icons/icOrganization.svg";
import icDashboard from "../../assets/icons/icDashboard.svg";
import icSetting from "../../assets/icons/icSetting.svg";
import imgDefaultWorkSpace from "../../assets/images/default-workspace.png";
import imgDefaultUser from "../../assets/images/default-user.png";
import icArrowRight from "../../assets/icons/icArrowRight.svg";
import icIsUser from "../../assets/icons/icIsUser.svg";
import SettingSubSidebar from "./subsidebar/components/SettingSubSidebar";

const menuItems = [
  { name: "Get Started", icon: icGetstarted, badge: null, key: "getstarted" },
  { name: "Tickets", icon: icTicket, badge: 2, key: "tickets" },
  { name: "Customers", icon: icCustomers, badge: null, key: "customers" },
  { name: "Organization", icon: icOrganization, badge: null, key: "organization" },
  { name: "Dashboard", icon: icDashboard, badge: null, key: "dashboard" },
];

const MenuItem = React.forwardRef(
  ({ name, icon, badge, isOpen, isArrow, onClick, isActive }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`flex items-center focus:outline-none w-full relative transition-colors duration-200
          ${isOpen ? "pl-[19px] pr-6" : "justify-center"}
          border-x-[5px] border-transparent py-6 text-gray-300
          ${
            isActive
              ? "border-l-[#D91F11] bg-[#FFFFFF66] text-white font-semibold"
              : "hover:border-l-[#D91F11] hover:bg-[#FFFFFF66] hover:text-white hover:font-semibold"
          }`}
      >
        <div className="relative">
          <img src={icon} alt={name} />
          {!isOpen && badge > 0 && (
            <span className="absolute -right-0.5 -top-0.5 bg-red-500 text-[10px] text-white font-bold rounded-full w-2 h-2 flex items-center justify-center"></span>
          )}
        </div>

        {isOpen && <span className="ml-1 text-sm grow text-left">{name}</span>}

        {isOpen && badge > 0 && (
          <span className="bg-red-500 text-[10px] text-white font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {badge}
          </span>
        )}

        {isOpen && isArrow && !badge && (
          <img src={icArrowRight} alt="Arrow Right" className="ml-2" />
        )}
      </button>
    );
  }
);

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [settingPos, setSettingPos] = useState({ top: 0, left: 0 });
  const settingBtnRef = useRef(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleMenuClick = (key) => {
    setActiveItem(key);
    setActiveMenu(null);
  };

  useEffect(() => {
    if (activeMenu === "settings" && settingBtnRef.current) {
      const rect = settingBtnRef.current.getBoundingClientRect();
      const submenuWidth = 275;
      const submenuHeight = 400;
      let top = rect.top;
      let left = rect.right;
      if (top + submenuHeight > window.innerHeight) {
        top = window.innerHeight - submenuHeight - 40;
      }

      if (left + submenuWidth > window.innerWidth) {
        left = rect.left - submenuWidth - 10;
      }

      setSettingPos({ top, left });
    }
  }, [activeMenu]);

  return (
    <div className="relative">
      <div
        className={`${
          isOpen ? "w-[275px]" : "w-[60px]"
        } bg-[#333333] h-screen flex flex-col justify-between transition-all duration-300`}
      >
        {/* Header */}
        <div>
          <div
            className={`relative flex items-center border-b border-b-[#E8E8E8] group py-4 ${
              isOpen ? "justify-between mx-6" : "justify-center mx-2"
            }`}
          >
            <div
              className={`flex items-center group: ${
                isOpen ? "justify-between space-x-2" : "justify-center"
              }`}
            >
              <img
                src={imgDefaultWorkSpace}
                alt="Logo"
                className="rounded-full w-10 h-10 object-cover"
              />
              <div className={`${isOpen ? "inline-block" : "hidden"}`}>
                <h2 className="text-white text-sm font-semibold">Apex</h2>
                <h4 className="text-xs text-white whitespace-nowrap">
                  Finance & Banking
                </h4>
              </div>
            </div>

            <button 
              onClick={toggleSidebar}
              className={`${!isOpen ? "absolute -right-[22px] hidden group-hover:block bg-[#333333] rounded-full p-0.5" : ""}`}
            >
              <img
                src={icOpenSideBar}
                alt="toggle"
                className={`w-5 h-5 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Main Menu */}
          <nav className="mt-6 flex flex-col space-y-1">
            {menuItems.map((item) => (
              <MenuItem
                key={item.key}
                name={item.name}
                icon={item.icon}
                badge={item.badge}
                isOpen={isOpen}
                isActive={activeItem === item.key}
                onClick={() => handleMenuClick(item.key)}
              />
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="py-3">
          <MenuItem
            ref={settingBtnRef}
            name="Settings"
            icon={icSetting}
            badge={null}
            isOpen={isOpen}
            isArrow={true}
            isActive={activeMenu === "settings"}
            onClick={() =>
              setActiveMenu(activeMenu === "settings" ? null : "settings")
            }
          />

          <div
            className={`flex items-center border-x-[5px] border-transparent ${
              isOpen ? "px-6 justify-start" : "justify-center"
            } py-3`}
          >
            <img
              src={imgDefaultUser}
              alt="Avatar"
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
            {isOpen && (
              <>
                <div className="ml-3 truncate grow">
                  <p className="text-white text-sm font-semibold flex items-center">
                    Sophia Williams
                    <img
                      src={icIsUser}
                      alt="User Icon"
                      className="ml-2 cursor-pointer"
                    />
                  </p>
                  <p className="text-xs text-white font-normal truncate">
                    sophia@alignui.com
                  </p>
                </div>
                <img
                  src={icArrowRight}
                  alt="Arrow Right"
                  className="ml-2 cursor-pointer"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Popup SettingSubSidebar */}
      {activeMenu === "settings" && (
        <SettingSubSidebar
          positionStyle={{
            top: settingPos.top,
            left: settingPos.left,
          }}
        />
      )}
    </div>
  );
};

export default SideBar;
