import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../Redux/slices/profileSlice";
import { FaEdit } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineTeam,
  AiOutlineUsergroupAdd,
  AiOutlineBell,
  AiOutlineDollarCircle,
  AiOutlineProfile,
} from "react-icons/ai";
import { MdOutlineSecurity } from "react-icons/md";

const YourProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  console.log("profile data ", profile);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
  };

  const sections = [
    {
      icon: AiOutlineUser,
      label: "My Profile",
      content: (
        <div key="profile">
          <h1 className="text-2xl font-bold mb-6">My Profile</h1>
          <div className="dark:bg-slate-950 rounded-lg shadow p-6 mb-6">
            <div className="flex items-center">
              <img
                className="w-20 h-20 rounded-full mr-6"
                src={
                  profile?.profilePicture ?? "https://via.placeholder.com/150"
                }
                alt="Profile"
              />
              <div>
                <h2 className="text-xl font-bold">
                  <span className="capitalize">{profile.firstName}</span>
                  <span className="capitalize ml-1">{profile?.lastName}</span>
                </h2>
                <p className="">{profile?.position ?? ""}</p>
                <p className="capitalize">{profile.currentAddress}</p>
              </div>
            </div>
          </div>
          <div className="dark:bg-slate-950 bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Personal Information</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-gray-600">First Name</p>
                <p className="font-semibold capitalize">{profile?.firstName}</p>
              </div>
              <div>
                <p className="text-gray-600">Last Name</p>
                <p className="font-semibold capitalize">{profile?.lastName}</p>
              </div>
              <div>
                <p className="text-gray-600">Email address</p>
                <p className="font-semibold">{profile?.email ?? "no mail"}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="font-semibold">{profile?.phoneNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Gender</p>
                <p className="font-semibold">{profile?.gender}</p>
              </div>
              <div>
                <p className="text-gray-600">Date of birth</p>
                <p className="font-semibold">
                  {profile?.dateOfBirth
                    ? new Date(profile.dateOfBirth).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )
                    : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="dark:bg-slate-950 bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Deparmental Information</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-gray-600">Employee Id </p>
                <p className="font-semibold capitalize">
                  {profile?.employeeId}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Role</p>
                <p className="font-semibold">{profile?.role}</p>
              </div>
              <div>
                <p className="text-gray-600">On boarding</p>
                <p className="font-semibold">
                  {profile?.dateOfBirth
                    ? new Date(profile.onboardingDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )
                    : ""}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Department</p>
                <p className="font-semibold">{profile?.department}</p>
              </div>
              <div>
                <p className="text-gray-600">Position </p>
                <p className="font-semibold">{profile?.position}</p>
              </div>

              <div>
                <p className="text-gray-600">Nationality</p>
                <p className="font-semibold capitalize">
                  {profile?.nationality}
                </p>
              </div>
            </div>
          </div>

          <div className="dark:bg-slate-950 bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Bio</h2>
              <button className="flex flex-row ml-auto bg-blue-500 text-white px-4 py-1.5 rounded">
                <span>
                  <FaEdit className="text-lg mt-1 mx-1" />
                </span>
                <span>Edit</span>
              </button>
            </div>
            <div>
              <p className="font-semibold">{profile?.bio ?? "no bio"}</p>
            </div>
          </div>
          <div className="dark:bg-slate-950 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Address</h2>
              <button className="flex flex-row ml-auto bg-blue-500 text-white px-4 py-1.5 rounded">
                <span>
                  <FaEdit className="text-lg mt-1 mx-1" />
                </span>
                <span>Edit</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-gray-600">Current Address</p>
                <p className="font-semibold">{profile?.currentAddress}</p>
              </div>
              <div>
                <p className="text-gray-600">Permanent Address</p>
                <p className="font-semibold">{profile?.permanentAddress}</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: AiOutlineSetting,
      label: "Account",
      content: (
        <div key="account">
          <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
          <div className="dark:bg-slate-950 bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Change Password</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      ),
    },

    {
      icon: MdOutlineSecurity,
      label: "Security",
      content: (
        <div key="security">
          <h1 className="text-2xl font-bold mb-6">Security Section</h1>
        </div>
      ),
    },

    {
      icon: AiOutlineProfile,
      label: "Teams",
      content: (
        <div key="teams">
          <h1 className="text-2xl font-bold mb-6">Teams Section</h1>
        </div>
      ),
    },
    {
      icon: AiOutlineUsergroupAdd,
      label: "Team Member",
      content: (
        <div key="team-member">
          <h1 className="text-2xl font-bold mb-6">Team Member Section</h1>
        </div>
      ),
    },

    {
      icon: AiOutlineBell,
      label: "Notification",
      content: (
        <div key="notification">
          <h1 className="text-2xl font-bold mb-6">Notification Section</h1>
        </div>
      ),
    },
    {
      icon: AiOutlineDollarCircle,
      label: "Billing",
      content: (
        <div key="billing">
          <h1 className="text-2xl font-bold mb-6">Billing Section</h1>
        </div>
      ),
    },
    ,
  ];

  return (
    <div className="w-[80%] mx-auto flex min-h-screen">
      <div className="w-1/4 py-1 px-4 m-1 dark:bg-slate-950 ">
        <nav>
          <ul className="space-y-2">
            {sections.map((section, index) => (
              <li
                key={index}
                className={`tab-btn flex cursor-pointer transition duration-300 ease-in-out px-4 py-1 gap-2 dark:border-[#30363D] rounded-md text-start ${
                  activeTab === index
                    ? "border-2 dark:bg-[#21262C] font-semibold bg-slate-200"
                    : "dark:hover:bg-[#21262C] hover:bg-slate-400"
                }`}
                onClick={() => handleTabClick(index)}
              >
                <section.icon className="mr-2 text-xl" />
                {section?.label}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex-1 px-6 border mt-1 rounded-md border-slate-900">
        {/* Render content based on active tab */}
        {sections[activeTab]?.content}
      </div>
    </div>
  );
};

export default YourProfilePage;
