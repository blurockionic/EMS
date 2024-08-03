
import React, { useEffect, useState } from "react";
import Card from "../../../component/utilities-components/Card";
import MyEvents from "../../../component/utilities-components/MyEvents";

const ManagerDashboard = () => {
  const [showEvent, setShowEvent] = useState(false);
  const [showCard, setShowCard] = useState(true);

  const handelAddEvent = () =>{
    setShowCard(false);
    setShowEvent(true);
  }
  return (
    <>
      {/* card  */}
      {
        showCard &&
        <div className="flex flex-col m-4 ml-9 gap-4">
            <div>
              <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              onClick={handelAddEvent}> ADD Event +</button>
            </div>
            <div>
              <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Event List</button>
            </div>
        

          <div className="flex flex-row justify-between w-full">
          <div>
            <Card/>
          </div>        
        </div>
        </div>
      }
        <div>
          {
            showEvent 
            && 
            <MyEvents/>
          }
        </div>
    </>
  );
};

export default ManagerDashboard;
