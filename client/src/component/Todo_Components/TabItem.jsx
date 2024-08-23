import React from "react";

const TabItem = ({ tab, isActive, onClick }) => {
  return (
    <div
      className={`flex items-center cursor-pointer px-2 py-2 ${
        isActive
          ? "border-b-2 border-green-500 font-bold"
          : "font-semibold bg-transparent"
      }`}
      onClick={onClick}
    >
      {tab}
    </div>
  );
};

export default TabItem;
