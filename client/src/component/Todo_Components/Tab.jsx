import React from "react";
import TabItem from "./TabItem";
import { IoMdAdd } from "react-icons/io";

const Tabs = ({ activeTab, onTabClick, setActive }) => {
  const tabs = ["All", "Completed"];

  const handleNewClick=()=>{
    setActive(true);
  }

  return (
    <nav className="flex flex-row justify-between">
      <div className="flex w-full sm:w-auto h-full items-end space-x-3 overflow-x-auto sm:overflow-x-hidden">
        {tabs.map((tab) => (
          <TabItem
            key={tab}
            tab={tab}
            isActive={activeTab === tab}
            onClick={() => onTabClick(tab)}
          />
        ))}
      </div>

      <div className="flex items-center" onClick={handleNewClick}>
          <div className="flex items-center font-semibold text-white bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white px-2 py-1 rounded-md shadow-inner cursor-pointer transition-colors">
            <IoMdAdd className="text-lg mr-1" />
            <span>New Todo</span>
          </div>
        </div>
    </nav>
  );
};

export default Tabs;
