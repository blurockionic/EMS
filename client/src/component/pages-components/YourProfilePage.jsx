import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../Redux/slices/profileSlice";
import { FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
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
          <div className="dark:bg-slate-950 bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center">
              <img
                className="w-20 h-20 rounded-full mr-6"
                src={
                  profile?.profilePicture ?? "https://via.placeholder.com/150"
                }
                alt="Profile"
              />
              <div>
                <h2 className="text-xl font-bold capitalize">{`${profile.firstName} ${profile?.lastName}`}</h2>
                <p>{profile?.position ?? ""}</p>
                <p className="capitalize">{profile.currentAddress}</p>
              </div>
            </div>
          </div>
          <div className="dark:bg-slate-950 bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <InfoField label="First Name" value={profile?.firstName} />
              <InfoField label="Last Name" value={profile?.lastName} />
              <InfoField
                label="Email address"
                value={profile?.email ?? "no mail"}
              />
              <InfoField label="Phone" value={profile?.phoneNumber} />
              <InfoField label="Gender" value={profile?.gender} />
              <InfoField
                label="Date of birth"
                value={
                  profile?.dateOfBirth
                    ? new Date(profile.dateOfBirth).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "2-digit", day: "2-digit" }
                      )
                    : ""
                }
              />
            </div>
          </div>
          <div className="dark:bg-slate-950 bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold">Departmental Information</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <InfoField label="Employee Id" value={profile?.employeeId} />
              <InfoField label="Role" value={profile?.role} />
              <InfoField
                label="Onboarding"
                value={
                  profile?.onboardingDate
                    ? new Date(profile.onboardingDate).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "2-digit", day: "2-digit" }
                      )
                    : ""
                }
              />
              <InfoField label="Department" value={profile?.department} />
              <InfoField label="Position" value={profile?.position} />
              <InfoField label="Nationality" value={profile?.nationality} />
            </div>
          </div>
          <EditableSection title="Bio" value={profile?.bio ?? "no bio"} />
          <EditableSection title="Address">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <InfoField
                label="Current Address"
                value={profile?.currentAddress}
              />
              <InfoField
                label="Permanent Address"
                value={profile?.permanentAddress}
              />
            </div>
          </EditableSection>
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
            <h2 className="text-xl font-bold">Change Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <PasswordField
                label="Current Password"
                value={currentPassword}
                setValue={setCurrentPassword}
                showPassword={showCurrentPassword}
                setShowPassword={setShowCurrentPassword}
              />
              <PasswordField
                label="New Password"
                value={newPassword}
                setValue={setNewPassword}
                showPassword={showNewPassword}
                setShowPassword={setShowNewPassword}
              />
              <PasswordField
                label="Confirm New Password"
                value={confirmPassword}
                setValue={setConfirmPassword}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
              />
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
      content: <Section title="Security Section" />,
    },
    {
      icon: AiOutlineProfile,
      label: "Teams",
      content: <Section title="Teams Section" />,
    },
    {
      icon: AiOutlineUsergroupAdd,
      label: "Team Member",
      content: <Section title="Team Member Section" />,
    },
    {
      icon: AiOutlineBell,
      label: "Notification",
      content: <Section title="Notification Section" />,
    },
    {
      icon: AiOutlineDollarCircle,
      label: "Billing",
      content: <Section title="Billing Section" />,
    },
  ];

  return (
    <div className="container mx-auto flex flex-col lg:flex-row min-h-screen">
      <div className="w-full lg:w-1/4 py-4 px-4 lg:px-6 bg-gray-100 dark:bg-slate-950">
        <nav>
          <ul className="space-y-2">
            {sections.map((section, index) => (
              <li
                key={index}
                className={`tab-btn flex items-center cursor-pointer transition duration-300 ease-in-out px-4 py-2 gap-2 rounded-md ${
                  activeTab === index
                    ? "bg-gray-200 dark:bg-gray-800 font-semibold"
                    : "hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
                onClick={() => handleTabClick(index)}
              >
                <section.icon className="text-xl" />
                {section?.label}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-6 bg-white dark:bg-gray-900">
        {sections[activeTab]?.content}
      </div>
    </div>
  );
};

const InfoField = ({ label, value }) => (
  <div>
    <p className="text-gray-600">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

const EditableSection = ({ title, value, children }) => (
  <div className="dark:bg-slate-950 bg-white rounded-lg shadow p-6 mb-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">{title}</h2>
      <button className="flex items-center ml-auto bg-blue-500 text-white px-4 py-1.5 rounded">
        <FaEdit className="text-lg mt-1 mx-1" />
        <span>Edit</span>
      </button>
    </div>
    {value ? <p className="font-semibold">{value}</p> : children}
  </div>
);

const PasswordField = ({
  label,
  value,
  setValue,
  showPassword,
  setShowPassword,
}) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        className="w-full px-3 py-1.5 pl-2 border dark:border-gray-700 text-lg font-normal rounded dark:bg-gray-800 dark:text-gray-400"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  </div>
);

const Section = ({ title }) => (
  <div key={title.toLowerCase().replace(" ", "-")}>
    <h1 className="text-2xl font-bold mb-6">{title}</h1>
  </div>
);

export default YourProfilePage;
