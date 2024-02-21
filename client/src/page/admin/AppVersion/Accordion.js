
import React, { useState } from 'react';
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
            className={`accordion-title ${isActive ? 'active' : ''} font-bold text-lg  bg-indigo-100   text-center  py-2 border-b-2 cursor-pointer hover:bg-indigo-300 mt-2 rounded-md` }
            onClick={() => onTitleClick(index)}
          > 
            {item.title}
          
          </div>


          {isActive && (
            <div className=" mt-1 bg-slate-100 font-medium mb-4 ">
              {item.content}
            </div>
          )}
        </div>
      );
    });
  
    return <div className="">{renderedItems}</div>;
  };
  export default Accordion;
  