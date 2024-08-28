// src/components/Header.js

import React, { useEffect, useState, useCallback, useMemo } from "react";
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

const Header = () => {
  // State to manage the currently active tab
  const [activeTab, setActiveTab] = useState("overview");

  // Setting up dispatch to trigger actions in the Redux store
  const dispatch = useDispatch();
  // Getting profile data from the Redux store
  const profile = useSelector((state) => state.profile.data);

  // Fetch profile data when the component mounts
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Memoize tab data to prevent unnecessary re-renders. This list defines tab configurations for different user roles.
  const tabData = useMemo(
    () => [
      // Tabs for employee role
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
        link: null, // Null link indicates inactive or placeholder tab
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
        link: "./allIssue",
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
      // Tabs for admin role
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
        link: "./allIssue",
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
      // Tabs for manager role
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
        tab: "issue",
        label: "Issues",
        icon: GoIssueTrackedBy,
        link: "./allIssue",
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
    ],
    [] // Empty dependency array ensures this is only defined once
  );

  // Filter tabs based on the user's role. Uses memoization to avoid recalculation on each render.
  const filteredTabs = useMemo(
    () => tabData.filter((tab) => tab.type === profile?.role),
    [profile?.role, tabData] // Recalculate when profile role or tabData changes
  );

  // Callback to handle tab click. Memoized to prevent recreation on each render.
  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab); // Update active tab state
  }, []);

  return (
    <>
      {profile?.role && ( // Render only if profile and role are available
        <div className="w-full border-b">
          <div className="w-full flex flex-col sm:flex-row justify-between items-end px-4 h-16">
            <div className="flex w-full sm:w-auto h-full items-end relative space-x-1 overflow-x-auto sm:overflow-x-hidden">
              {filteredTabs.map(({ tab, label, icon: Icon, link }) => (
                <div
                  key={tab} // Unique key for each tab
                  className={`flex items-center font-semibold cursor-pointer px-2 py-2 ${
                    activeTab === tab
                      ? "border-b-2 border-green-500 font-bold" // Highlight active tab
                      : "bg-transparent"
                  }`}
                  onClick={() => handleTabClick(tab)} // Handle tab click
                >
                  <Link to={link || "#"}> {/* Link or placeholder for navigation */}
                    <div className="flex py-1.5 px-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                      <Icon className="mr-2 text-xl" /> {/* Tab icon */}
                      {label} {/* Tab label */}
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
