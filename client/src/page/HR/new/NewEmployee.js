import React, { useState } from "react";

const NewEmployee = () => {


  const [buttonActive, setButtonActive] = useState(false)
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    gender: "",
    employeeEmail: "",
    password: "",
    employeePhoneNumber: "",
    dateOfBirth: "",
    address: "",
    postOffice: "",
    policeStation: "",
    city: "",
    state: "",
    pinNumber: "",
    designation: "",
    designationType: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <div className=" w-[70rem]  container mx-auto flex flex-col">
        <form
          onSubmit={handleSubmit}
          className="w-[70rem] h-[37rem] bg-white p-2 rounded-lg shadow-md mt-2 overflow-x-hidden overflow-scroll"
        >
          <h2 className="text-2xl flex justify-center font-bold">Employee Information</h2>

          <div className="flex flex-col justify-evenly ">


          <div className="w-full bg-slate-800 text-white text-lg p-3 font-semibold rounded-lg ">
            Personal Information
          </div>
          {/* div 1 */}
          <div className="w-[80%] mx-auto">
          {/* employees Id  */}
          <div className="mb-4">
            <label
              className=" text-gray-700 text-sm font-bold mb-2 "
              htmlFor="employeeId"
            >
              ID
            </label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="border border-black rounded-lg p-2 w-full"
              required
            />
          </div>
            {/* EmployeeEmail */}
            <div className="mb-4">
              <label
                className=" text-gray-700 text-sm font-bold mb-2"
                htmlFor="employeeEmail"
              >
              Email
              </label>
              <input
                type="email"
                id="employeeEmail"
                name="employeeEmail"
                value={formData.employeeEmail}
                onChange={handleChange}
                className="border border-black rounded-lg p-2 w-full"
                required
              />
            </div>

            {/* gender */}
            <div className="mb-4">
              <label
                className=" text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
              Gender
              </label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border border-black rounded-lg p-2 w-full"
                required
              />
            </div>
              {/* employee name  */}
              <div className="mb-4">
                <label
                  className=" text-gray-700 text-sm font-bold mb-2"
                  htmlFor="employeeName"
                >
                    Name
                </label>
                <input
                  type="text"
                  id="employeeName"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                  className="border border-black rounded-lg p-2 w-full"
                  required
                />
              </div>
                 {/* password */}
                <div className="mb-4">
                <label
                  className=" text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                Password
                </label>
                <input
                  type="password "
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border border-black rounded-lg p-2 w-full"
                  required
                />
              </div>

               {/* employeesPhoneNumber  */}
            <div className="mb-4">
              <label
                className=" text-gray-700 text-sm font-bold mb-2"
                htmlFor="employeePhoneNumber"
              >
              Phone Number
              </label>
              <input
                type="text"
                id="employeePhoneNumber"
                name="employeePhoneNumber"
                value={formData.employeePhoneNumber}
                onChange={handleChange}
                className="border border-black rounded-lg p-2 w-full"
                required
              />
            </div>

                {/* Date of Birth */}
              <div className="mb-4">
                  <label
                    className=" text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dateOfBirth"
                  >
                  Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="border border-black rounded-lg p-2 w-full"
                    required
                  />
              </div>

              

         
          </div>
          <div className="w-full bg-slate-800 text-white text-lg p-3 font-semibold rounded-lg ">
            Personal Information
          </div>
          {/* div 2 */}

          <div className="w-[80%] mx-auto" >
             {/* Post office */}
          <div className="mb-4">
            <label
              className=" text-gray-700 text-sm font-bold mb-2"
              htmlFor="postOffice"
            >
            Post Office 
            </label>
            <input
              type="text"
              id="postOffice"
              name="postOffice"
              value={formData.postOffice}
              onChange={handleChange}
              className="border border-black rounded-lg p-2 w-full"
              required
            />
            </div>

            {/* state */}
            <div className="mb-4">
              <label
                className=" text-gray-700 text-sm font-bold mb-2"
                htmlFor="state"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="border border-black rounded-lg p-2 w-full"
                required
              />
            </div>

          {/* Address */}
          <div className="mb-4">
            <label
              className=" text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
            Address 
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-black rounded-lg p-2 w-full"
              required
            />
          </div>

          {/* pinNumber */}
          <div className="mb-4">
            <label
              className=" text-gray-700 text-sm font-bold mb-2"
              htmlFor="pinNumber"
            >
              Pin Code 
            </label>
            <input
              type="number"
              id="pinNumber"
              name="pinNumber"
              value={formData.pinNumber}
              onChange={handleChange}
              className="border border-black rounded-lg p-2 w-full"
              required
            />
          </div>
          


            {/* city */}
            <div className="mb-4">
            <label
              className=" text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
            City 
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border border-black rounded-lg p-2 w-full"
              required
            />
          </div>
          {/* policeStation */}
          <div className="mb-4">
          <label
            className=" text-gray-700 text-sm font-bold mb-2"
            htmlFor="policeStation"
          >
          Police Station
          </label>
          <input
            type="text"
            id="policeStation"
            name="policeStation"
            value={formData.policeStation}
            onChange={handleChange}
            className="border border-black rounded-lg p-2 w-full"
            required
          />
          </div>


          </div>
          <div className="w-full bg-slate-800 text-white text-lg p-3 font-semibold rounded-lg ">
            Departmental Information
          </div>


          {/* div 3 */}
          <div className="w-[80%] mx-auto">
             {/* department */}
             <div className="mb-4">
            <label
              className=" text-gray-700 text-sm font-bold mb-2"
              htmlFor="department"
              >
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="border border-black rounded-lg p-2 w-full"
              required
            />
            </div>
            {/* designation */}
            <div className="mb-4">
                <label
                  className=" text-gray-700 text-sm font-bold mb-2"
                  htmlFor="designation"
                >
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="border border-black rounded-lg p-2 w-full"
                  required
                />
            </div>
          {/* designationType */}
          <div className="mb-4">
            <label
              className=" text-gray-700 text-sm font-bold mb-2"
              htmlFor="designationType"
            >
              Designation Type 
            </label>
            <input
              type="text"
              id="designationType"
              name="designationType"
              value={formData.designationType}
              onChange={handleChange}
              className="border border-black rounded-lg p-2 w-full"
              required
            />
          </div>




          </div>

        {/* Add more fields as needed */}


          </div>


        


          <div className=" flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewEmployee;
