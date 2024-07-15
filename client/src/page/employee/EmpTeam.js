import React, { useState } from "react";
import Activity from "../../component/utilities-components/Activity";

const EmpTeam = () => {
  const [activeTeamTab, setActiveTeamTab] = useState("My Team");
 
  return (
    <div>


      <div className=" flex flex-wrap ">
        <div
          className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
            activeTeamTab === "My Team"
              ? "border-b-4 border-blue-500 text-blue-500 font-bold"
              : "bg-white"
          }`}
        >
          My Team
        </div>

       
      </div>

      <div className="mt-4">
          {activeTeamTab === "My Team" && (
            <div>
              {/* <h2 className="text-lg font-bold mb-2">All Teams</h2> */}
              <div className="container mx-auto">
               {/* team all member card */}
              </div>
            </div>
          )}
          <Activity/>
        </div>
    </div>
  );
};

export default EmpTeam;
