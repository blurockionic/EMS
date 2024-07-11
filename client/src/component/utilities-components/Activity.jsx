// File: src/components/Activity.js
import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import ChatGroupList from "./ChatGroupList";

const Activity = () => {
  const [currentGroup, setCurrentGroup] = useState(null);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between border-b pb-2">
        <h1 className="text-2xl font-semibold">Team Activity</h1>
      </div>
      <div className="mt-8 flex">
        <div className="w-1/4">
          <ChatGroupList setCurrentGroup={setCurrentGroup} />
        </div>
        <div className="w-3/4">
          {currentGroup ? (
            <ChatWindow currentGroup={currentGroup} />
          ) : (
            <div>Select a group to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activity;
