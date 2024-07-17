// File: src/components/ChatGroupList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatGroupList = ({ setCurrentGroup }) => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");

  useEffect(() => {
    axios.get("/api/v1/chat/groups").then((response) => {
      setGroups(response.data);
    });
  }, []);

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      axios
        .post("/api/v1/chat/createGroup", { name: newGroupName, members: ["currentUserId"] })
        .then((response) => {
          setGroups((prevGroups) => [...prevGroups, response.data]);
          setNewGroupName("");
        });
    }
  };

  return (
    <div className="chat-group-list">
      <input
        type="text"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
        placeholder="New group name"
      />
      <button onClick={handleCreateGroup}>Create Group</button>
      <ul>
        {groups.map((group) => (
          <li key={group._id} onClick={() => setCurrentGroup(group)}>
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatGroupList;
