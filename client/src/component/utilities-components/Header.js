import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";
import { GoProject, GoTasklist, GoIssueTrackedBy } from "react-icons/go";
import { MdHistory } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import axios from "axios";
import { server } from "../../App";

const Header = () => {
  const [profile, setProfile] = useState({});
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get(`${server}/users/me`, { withCredentials: true });
      setProfile(response.data.user);
    };
    fetchProfile();
  }, []);

  const tabData = [
    { type: "employee", tab: "overview", label: "Overview", icon: IoBookOutline, link: "./employeeOverview" },
    { type: "employee", tab: "project", label: "Project", icon: GoProject, link: null },
    { type: "employee", tab: "task", label: "Task", icon: GoTasklist, link: "./employeetask" },
    { type: "employee", tab: "issue", label: "Issues", icon: GoIssueTrackedBy, link: null },
    { type: "employee", tab: "reporthistory", label: "Report History", icon: MdHistory, link: "./reporthistory" },
    { type: "employee", tab: "team", label: "Team", icon: RiTeamLine, link: "./empteam" },
    { type: "admin", tab: "overview", label: "Overview", icon: IoBookOutline, link: "" },
    { type: "admin", tab: "project", label: "Project", icon: GoProject, link: null },
    { type: "admin", tab: "employee", label: "Employee", icon: GoTasklist, link: "./employee" },
    { type: "admin", tab: "issue", label: "Issues", icon: GoIssueTrackedBy, link: null },
    { type: "admin", tab: "adminreport", label: "Report", icon: GoIssueTrackedBy, link: "./adminreport" },
    { type: "admin", tab: "team", label: "Team", icon: GoIssueTrackedBy, link: "./newTeam" },
    { type: "manager", tab: "overviewmanager", label: "Overview", icon: IoBookOutline, link: "./managerdashboard" },
    { type: "manager", tab: "leaves", label: "Leaves", icon: IoBookOutline, link: "./empleave" },
    { type: "manager", tab: "projectreport", label: "Project Reports", icon: GoProject, link: "./managerreport" },
    { type: "manager", tab: "employee", label: "Employee", icon: GoTasklist, link: "./employee" },
    { type: "manager", tab: "managerproject", label: "Issues", icon: GoIssueTrackedBy, link: "./managerproject" },
    { type: "manager", tab: "adminreport", label: "Report", icon: GoIssueTrackedBy, link: "./adminreport" },
    { type: "manager", tab: "team", label: "Team", icon: GoIssueTrackedBy, link: "./newTeam" }
  ];

  const filteredTabs = tabData.filter(tab => tab.type === profile.designationType);

  return (
    <>
      {profile.designationType && (
        <div className="w-full border-b">
          <div className="w-full flex flex-row justify-between items-end px-4 h-16">
            <div className="flex w-full h-full items-end relative space-x-1">
              {filteredTabs.map(({ tab, label, icon: Icon, link }) => (
                <div
                  key={tab}
                  className={`flex items-center font-semibold cursor-pointer px-2 py-2 ${
                    activeTab === tab ? "border-b-2 border-green-500 font-bold" : "bg-transparent"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  <Link to={link || "#"} >
                    <div className="flex hover:bg-gray-200 py-1.5 px-2 rounded-md">
                      <Icon className="mr-2 text-xl" />
                      {label}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
