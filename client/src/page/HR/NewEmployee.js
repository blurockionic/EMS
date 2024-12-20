import axios from "axios";
import React, { useState } from "react";
import { server } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewEmployee = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    department: "",
    role: "employee",
    position: "",
    currentAddress: "",
    permanentAddress: "",
    bio: "",
    nationality: "",
    dateOfBirth: "",
    phoneNumber: "",
    employeeId: "",
    onboardingDate: "",
    profilePicture: selectedFile,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFormData({ ...formData, profilePicture: file });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Log the FormData entries
    for (let pair of data.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    //

    try {
      const response = await axios.post(`${server}/users/signup`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log(response.data.message);
      toast.success("user created successfully");
      setFormData("");
      navigate("../employee");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-[80%] mx-auto p-8 shadow-lg rounded-lg">
        {/* <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Employee Information
      </h2> */}

        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Personal Information
        </h3>
        <div className="w-full flex flex-row justify-between border-b pb-8">
          <div className="mx-[5rem] justify-center text-center items-center ">
            <div className="mt-6 relative border border-gray-300 bg-white dark:border-[#30363D] dark:bg-[#161B22] rounded-3xl  flex justify-center items-center">
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                style={{ zIndex: 10 }} // Ensure the input covers the entire visible area
              />
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected"
                  className="w-[10rem] h-[10rem] object-cover rounded-3xl"
                />
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400 dark:text-gray-600 mb-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1V4zm2 4v1h4V8H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Drag & drop your photo here or click to browse
                  </p>
                </div>
              )}
            </div>
            <label className="block font-semibold" htmlFor="profilePicture">
              Profile Picture
            </label>
          </div>

          <div className="w-[60%] flex flex-col">
            <div className="flex flex-row space-x-4">
              <div className="flex-1">
                <label className="block font-semibold" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                  required
                />
              </div>
            </div>
            <div className="flex flex-row space-x-4 mt-4">
              <div className="flex-1">
                <label className="block font-semibold" htmlFor="gender">
                  Gender
                </label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold" htmlFor="dateOfBirth">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-row justify-evenly space-x-4 mt-8">
          <div className=" w-[50%]  flex flex-col space-y-4">
            <div className="flex flex-row justify-evenly space-x-4">
              <div className="flex-1">
                <label className="block font-semibold" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold" htmlFor="nationality">
                  Nationality
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                />
              </div>
            </div>

            <div className="flex flex-row justify-evenly space-x-4">
              <div className="flex-1">
                <label className="block font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                  required
                />
              </div>
            </div>
          </div>
          <div className=" w-[50%]  flex flex-col space-y-4">
            <div className="flex flex-row justify-evenly space-x-4">
              <div className="flex-1">
                <label className="block font-semibold" htmlFor="department">
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold" htmlFor="position">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                  required
                />
              </div>
            </div>

            <div className="flex flex-row justify-evenly space-x-4">
              <div className="flex-1">
                <label className="block font-semibold" htmlFor="onboardingDate">
                  Onboarding Date
                </label>
                <input
                  type="date"
                  id="onboardingDate"
                  name="onboardingDate"
                  value={formData.onboardingDate}
                  onChange={handleChange}
                  className="w-full px-3 py-1 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold" htmlFor="role">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-1 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between space-x-4 mt-8">
          <div className="flex-1 ">
            <label className="block font-semibold" htmlFor="currentAddress">
              Current Address
            </label>
            <input
              type="text"
              id="currentAddress"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
              className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold" htmlFor="permanentAddress">
              Permanent Address
            </label>
            <input
              type="text"
              id="permanentAddress"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
            />
          </div>
        </div>

        <div className="flex mt-8 justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2.5 px-6 rounded-lg hover:bg-blue-600 duration-200 focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default NewEmployee;
