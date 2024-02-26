import React, { useState } from "react";
const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onTitleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const renderedItems = items.map((item, index) => {
    const isActive = index === activeIndex;

    return (
      <div key={index}>
        <div
          className={`accordion-title ${
            isActive ? "active" : ""
          } font-bold text-lg  bg-slate-200 transition-max-h text-start px-5 flex flex-row justify-between py-2 border-b-2 cursor-pointer hover:bg-slate-300 mt-2 rounded-md `}
          onClick={() => onTitleClick(index)}
        >
          {item.title}
          <div>{isActive ? "-" : "+"} </div>
        </div>

        {isActive && (
          <div
            className={`mt-1 bg-slate-50 font-medium mb-4 overflow-hidden transition-max-h duration-2000 ${
              isActive ? "max-h-[1000px]" : "max-h-0"
            }`}
          >
            {item.content}
          </div>
        )}
      </div>
    );
  });

  return <div className="">{renderedItems}</div>;
};
export default Accordion;
