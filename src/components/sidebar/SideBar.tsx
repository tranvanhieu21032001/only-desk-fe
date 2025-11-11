import React, { useState } from 'react';
import icGetstarted from '../../assets/icons/icGetstarted.svg';
import icOpenSideBar from '../../assets/icons/icOpenSideBar.svg';
import icTicket from '../../assets/icons/icTicket.svg';
import icCustomers from '../../assets/icons/icCustomers.svg';
import icOrganization from '../../assets/icons/icOrganization.svg';
import icDashboard from '../../assets/icons/icDashboard.svg';
import icSetting from '../../assets/icons/icSetting.svg'
import imgDefaultWorkSpace from '../../assets/images/default-workspace.png'


const menuItems = [
  { name: 'Get Started', icon: icGetstarted, badge: null, key: 'getstarted' },
  { name: 'Tickets', icon: icTicket, badge: 2, key: 'tickets' },
  { name: 'Customers', icon: icCustomers, badge: null, key: 'customers' },
  { name: 'Organization', icon: icOrganization, badge: null, key: 'organization' },
  { name: 'Dashboard', icon: icDashboard, badge: null, key: 'dashboard' },
];

const MenuItem = ({ name, icon, badge, isOpen }) => {
  return (
    <button
      className={`flex items-center focus:outline-none focus:right-0 ${
        isOpen ? 'pl-[19px]' : 'justify-center'
      } border-x-[5px] border-transparent hover:border-l-[#D91F11] py-6 text-gray-300 hover:bg-[#2a2a2a] hover:text-white hover:font-semibold relative w-full`}
    >
      <div className='relative'>
        <img src={icon} alt={name} />
         {!isOpen && badge > 0 && (
        <span className="absolute right-[-2px] top-[-2px] bg-red-500 text-[10px] text-white font-bold rounded-full w-2 h-2 flex items-center justify-center">
        </span>
      )}
      </div>
      {isOpen && <span className="ml-3 text-sm flex-grow text-left">{name}</span>}

      {isOpen && badge > 0 && (
        <span className="bg-red-500 text-[10px] text-white font-bold rounded-full px-[6px] py-[1px]">
          {badge}
        </span>
      )}
    </button>
  );
};


const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${
        isOpen ? 'w-[275px]' : 'w-[60px]'
      } bg-[#333333] ring-0 outline-0 h-screen flex flex-col justify-between transition-all duration-300`}
    >
      <div>
        <div className={`relative flex items-center justify-between group py-6 ${isOpen ? 'justify-between px-6':'justify-center'}`}>
            <div className={`flex items-center  ${isOpen ? 'justify-between space-x-2':'justify-center'}`}>
              <img
                src={imgDefaultWorkSpace}
                alt="Logo"
                className="rounded-full w-10 h-10 object-cover"
              />
              <div className={`${isOpen ? 'inline-block':'hidden'}`}>
                <h2 className="text-white text-sm font-semibold">Apex</h2>
                <p className="text-xs text-gray-400">Finance & Banking</p>
              </div>
            </div>
 
          <button
            onClick={toggleSidebar}
            className={`${
                !isOpen ? 'p-[1px] bg-[#3c3c3c] rounded-full absolute top-[50%] translate-y-[-50%] right-[-12px] z-20 hidden group-hover:block' : ''
            }`}
          >
            <img
              src={icOpenSideBar}
              alt="toggle"
              className={`w-5 h-5 transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
   <div className='h-2 w-full border-b-2 px-6'></div>
        <nav className="mt-6 flex flex-col space-y-1">
          {menuItems.map((item) => (
            <MenuItem
              key={item.key}
              name={item.name}
              icon={item.icon}
              badge={item.badge}
              isOpen={isOpen}
            />
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-700 py-3">
        <MenuItem
            name="Settings"
            icon={icSetting}
            badge={null}
            isOpen={isOpen}
        />
        <div
          className={`flex items-center ${
            isOpen ? 'px-4 justify-start' : 'justify-center'
          } py-3`}
        >
          <img
            src="https://via.placeholder.com/32"
            alt="Avatar"
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          {isOpen && (
            <div className="ml-3 truncate">
              <p className="text-white text-sm font-semibold">Sophia Williams</p>
              <p className="text-xs text-gray-400 truncate">sophia@alignui.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;