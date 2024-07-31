import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";
import {
  GoProject,
  GoTasklist,
  GoIssueTrackedBy,
  GoPeople,
  GoReport,
} from "react-icons/go";
import { MdHistory } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../Redux/slices/profileSlice";
import Loader from "./Loader";

const Header = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "overview"
  );

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const profileStatus = useSelector((state) => state.profile.status);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  if (profileStatus === "loading") {
    return <Loader />;
  }

  const tabData = [
    {
      type: "employee",
      tab: "overview",
      label: "Overview",
      icon: IoBookOutline,
      link: "./employeeOverview",
    },
    {
      type: "employee",
      tab: "project",
      label: "Project",
      icon: GoProject,
      link: null,
    },
    {
      type: "employee",
      tab: "task",
      label: "Task",
      icon: GoTasklist,
      link: "./employeetask",
    },
    {
      type: "employee",
      tab: "issue",
      label: "Issues",
      icon: GoIssueTrackedBy,
      link: null,
    },
    {
      type: "employee",
      tab: "reporthistory",
      label: "Report",
      icon: MdHistory,
      link: "./reporthistory",
    },
    {
      type: "employee",
      tab: "team",
      label: "Team",
      icon: RiTeamLine,
      link: "./empteam",
    },
    {
      type: "admin",
      tab: "overview",
      label: "Overview",
      icon: IoBookOutline,
      link: "./home",
    },
    {
      type: "admin",
      tab: "project",
      label: "Project",
      icon: GoProject,
      link: "./allProject",
    },
    {
      type: "admin",
      tab: "employee",
      label: "Employee",
      icon: GoPeople,
      link: "./employee",
    },
    {
      type: "admin",
      tab: "issue",
      label: "Issues",
      icon: GoIssueTrackedBy,
      link: "./adminIssue",
    },
    {
      type: "admin",
      tab: "adminreport",
      label: "Report",
      icon: GoReport,
      link: "./adminreport",
    },
    {
      type: "admin",
      tab: "team",
      label: "Team",
      icon: RiTeamLine,
      link: "./newTeam",
    },
    {
      type: "manager",
      tab: "overviewmanager",
      label: "Overview",
      icon: IoBookOutline,
      link: "./managerdashboard",
    },
    {
      type: "manager",
      tab: "projectreport",
      label: "Reports",
      icon: GoReport,
      link: "./managerreport",
    },
    {
      type: "manager",
      tab: "task",
      label: "Task",
      icon: GoTasklist,
      link: "./alltask",
    },
    {
      type: "manager",
      tab: "employee",
      label: "Employee",
      icon: GoPeople,
      link: "./employee",
    },
    {
      type: "manager",
      tab: "managerproject",
      label: "Project",
      icon: GoProject,
      link: "./managerproject",
    },
    {
      type: "manager",
      tab: "adminreport",
      label: "Report",
      icon: GoIssueTrackedBy,
      link: "./adminreport",
    },
    {
      type: "manager",
      tab: "team",
      label: "Team",
      icon: RiTeamLine,
      link: "./newTeam",
    },
  ];

  const filteredTabs = tabData.filter((tab) => tab.type === profile?.role);

  return (
    <>
      {profile?.role && (
        <div className="w-full border-b">
          <div className="w-full flex flex-col sm:flex-row justify-between items-end px-4 h-16">
            <div className="flex w-full sm:w-auto h-full items-end relative space-x-1 overflow-x-auto sm:overflow-x-hidden">
              {filteredTabs.map(({ tab, label, icon: Icon, link }) => (
                <div
                  key={tab}
                  className={`flex items-center font-semibold cursor-pointer px-2 py-2 ${
                    activeTab === tab
                      ? "border-b-2 border-green-500 font-bold"
                      : "bg-transparent"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  <Link to={link || "#"}>
                    <div className="flex py-1.5 px-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
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
