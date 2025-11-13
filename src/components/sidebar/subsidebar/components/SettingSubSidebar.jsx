import React, { useState, useRef, useLayoutEffect } from "react";
import imgDefaultUser from "../../../../assets/images/default-user.png";
import icIsUser from "../../../../assets/icons/icIsUser.svg";
import icArrowRightDark from "../../../../assets/icons/icArrowRightDark.svg";
import SubSidebar from "../SubSidebar";

import icViewProfile from "../../../../assets/icons/icViewProfile.svg";
import icDislay from "../../../../assets/icons/icDisplay.svg";
import icHelpCenter from "../../../../assets/icons/icHelpCenter.svg";
import icLogout from "../../../../assets/icons/icLogout.svg";

const SettingSubSidebar = ({ positionStyle }) => {
  const [activeSub, setActiveSub] = useState(null);
  const [selectedDisplay, setSelectedDisplay] = useState(null);
  const [subPos, setSubPos] = useState(null);
  const submenuRefs = useRef({});
  const submenuElRefs = useRef({});

  const config = {
    user: {
      name: "Sophia Williams",
      email: "sophia@alignui.com",
      avatar: imgDefaultUser,
    },
    statusItems: [
      { label: "Online", color: "#389E0D", checked: true },
      { label: "Away", color: "#FA541C" },
      { label: "Transfers only", color: "#186ADE" },
      { label: "Offline", color: "#B9B9B9" },
    ],
    menuItems: [
      { label: "View Profile", icon: icViewProfile, isFirst: true },
      {
        label: "Display",
        icon: icDislay,
        subMenu: [
          { label: "Light mode" },
          { label: "Dark mode" },
          { label: "Match System Appearance" },
        ],
      },
      {
        label: "Help Center",
        icon: icHelpCenter,
        subMenu: [
          { label: "Product Updates" },
          { label: "Get Help" },
          { label: "Support Help Center" },
          { label: "Keyboard Shortcuts" },
          { label: "About" },
          { label: "Privacy Notice" },
          { label: "Give Feedback" },
        ],
      },
      { label: "Logout", icon: icLogout, danger: true },
    ],
  };

  const handleItemClick = (label) => {
    const isSame = activeSub === label;
    setActiveSub(isSame ? null : label);

    if (!isSame && submenuRefs.current[label]) {
      const rect = submenuRefs.current[label].getBoundingClientRect();
      const submenuWidth = 275;
      let bottom = Math.max(10, Math.round(window.innerHeight - rect.bottom));
      let left = rect.right + 12;

      if (bottom < 10) bottom = 10;

      if (left + submenuWidth > window.innerWidth) {
        left = rect.left - submenuWidth - 10;
      }

      setSubPos({ bottom, left });
    }
  };

  useLayoutEffect(() => {
    if (!activeSub) return;
    const menuEl = submenuRefs.current[activeSub];
    const submenuEl = submenuElRefs.current[activeSub];
    if (menuEl && submenuEl) {
      const rect = menuEl.getBoundingClientRect();
      const submenuRect = submenuEl.getBoundingClientRect();
      const submenuWidth = submenuRect.width || 275;
      const submenuHeight = submenuRect.height || 0;
      console.log("submenuHeight", submenuHeight);

      let bottom = Math.round(window.innerHeight - rect.bottom);
      let left = rect.right + 12;

      let top = window.innerHeight - bottom - submenuHeight;
      if (top < 10) {
        bottom = Math.max(submenuHeight + 10 - window.innerHeight, 10);
      }

      if (bottom < 0) bottom = 0;

      if (left + submenuWidth > window.innerWidth) {
        left = rect.left - submenuWidth - 10;
      }

      setSubPos((prev) => {
        if (!prev || prev.bottom !== bottom || prev.left !== left) return { bottom, left };
        return prev;
      });
    }
  }, [activeSub]);

  return (
    <SubSidebar
      width="w-[275px]"
      style={{
        position: "fixed",
        top: `${positionStyle.top}px`,
        left: `${positionStyle.left}px`,
        zIndex: 9999,
      }}
    >
      {/* User Info */}
      {config.user && (
        <div className="flex items-center mb-4 px-2">
          <img
            src={config.user.avatar || imgDefaultUser}
            alt={config.user.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-2 grow">
            <p className="text-sm font-semibold flex items-center text-gray-900">
              {config.user.name}
              <img src={icIsUser} alt="User Icon" className="ml-1" />
            </p>
            <p className="text-xs text-gray-500">{config.user.email}</p>
          </div>
          <img src={icArrowRightDark} alt="Arrow Right" />
        </div>
      )}

      {/* Status Section */}
      {config.statusItems && (
        <div className="flex flex-col space-y-1 border-t border-[#E8E8E8] pt-3 mb-3">
          {config.statusItems.map((s) => (
            <label
              key={s.label}
              className="flex items-center space-x-2 cursor-pointer text-sm text-gray-700 hover:bg-[#EDF1F8] hover:font-semibold p-2 rounded-lg"
            >
              <input
                type="checkbox"
                name="status"
                defaultChecked={s.checked}
                className="accent-[#243373] w-5 h-5"
              />
              <span className="flex items-center space-x-1">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: s.color }}
                ></span>
                <span>{s.label}</span>
              </span>
            </label>
          ))}
        </div>
      )}

      {/* Menu Items */}
      <div className="flex flex-col space-y-1">
        {config.menuItems.map((item) => {
          const isActiveItem = activeSub === item.label;
          return (
            <div
              key={item.label}
              ref={(el) => (submenuRefs.current[item.label] = el)}
              onClick={() => handleItemClick(item.label)}
              className="text-sm"
            >
              <div
                className={`flex items-center justify-between rounded-lg p-2 ${isActiveItem
                    ? item.danger
                      ? "text-red-600 bg-red-50 font-semibold"
                      : "bg-[#EDF1F8] font-semibold"
                    : item.danger
                      ? "text-red-600 hover:bg-red-50 hover:font-semibold"
                      : "hover:bg-[#EDF1F8] hover:font-semibold"
                  }`}
              >
                <div className="flex items-center space-x-2">
                  {item.icon && <img src={item.icon} alt="icon" />}
                  <span>{item.label}</span>
                </div>
                {item.subMenu && <img src={icArrowRightDark} alt="Arrow" />}
              </div>

              {activeSub === item.label && item.subMenu && subPos && (
                <SubSidebar
                  width="w-[275px]"
                  style={{
                    position: "fixed",
                    bottom: `${subPos.bottom}px`,
                    left: `${subPos.left}px`,
                    maxHeight: "80vh",
                    overflowY: "auto",
                    zIndex: 10000,
                  }}
                  ref={(el) => (submenuElRefs.current[item.label] = el)}
                >
                  <div>
                    {item.label === "Display"
                      ? item.subMenu.map((mode) => (
                        <label
                          key={mode.label}
                          className={`flex items-center space-x-2 cursor-pointer text-sm text-gray-700 hover:bg-[#EDF1F8] p-2 rounded-lg ${selectedDisplay === mode.label ? "font-semibold" : ""
                            }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedDisplay === mode.label}
                            onChange={() => setSelectedDisplay(mode.label)}
                            className="accent-[#243373] w-5 h-5 cursor-pointer"
                          />
                          <span>{mode.label}</span>
                        </label>
                      ))
                      : item.subMenu.map((mode) => (
                        <div
                          key={mode.label}
                          className="flex items-center cursor-pointer text-sm text-gray-700 hover:bg-[#EDF1F8] p-2 rounded-lg"
                          onClick={() =>
                            console.log("Clicked link:", mode.label)
                          }
                        >
                          <span>{mode.label}</span>
                        </div>
                      ))}
                  </div>
                </SubSidebar>
              )}
            </div>
          );
        })}
      </div>
    </SubSidebar>
  );
};

export default SettingSubSidebar;
