import React, { useState } from "react";
import Chat from "../../component/utilities-components/Chat";

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
        {activeTeamTab === "Activity" && <Chat activeTeamTab={activeTeamTab} />}
      </div>
    </div>
  );
};

export default EmpTeam;
