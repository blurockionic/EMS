import React, { useEffect, useState } from "react";
import Btn from "../common_component/Btn";
import Title_name from "../common_component/Title_name";
import axios from "axios";

function Admin_NewProject() {
  // const [projectdata, setProjectData] = useState({
  //   projectName: "",
  //   projectStartingdate: "",
  //   projectEndingdate: "",
  //   ManagerName: "",
  //   projectRequirement: "",
  //   projectPrioroty: "",
  //   websiteUrls: "",
  // });

  const [projectName, setProjectName] = useState("");
  const [projectStartingdate, setPojectStartingDate] = useState("");
  const [projectEndingdate, setProjectEndingDate] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [ManagerName, setManegerName] = useState("");
  const [projectRequirement, setProjectRequirement] = useState("");
  const [projectPrioroty, setProjectPriority] = useState("");
  const [websiteUrls, setWebsiteUrls] = useState("");

  const [managerData, setManegerData] = useState([]);
  const mangerId = [];

  useEffect(() => {
    const mangerData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/employee/all",
          { withCredentials: true }
        );

        // console.log(response)
        setManegerData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors here
      }
    };

    mangerData();
  }, []);
  // traverse project
  for (let i = 0; i < managerData.length; i++) {
    if (managerData[i].designationType === "Manager") {
      mangerId.push(managerData[i]);
    }
    console.log("total data", managerData[i]);
  }

  console.log("it is ", mangerId);

  const sendProjectData = async () => {
    const request = await axios.post(
      "http://localhost:4000/api/v1/project/new",
      {
        projectName,
        ManagerName,
        projectDescription,
        projectEndingdate,
        projectPrioroty,
        projectRequirement,
        projectStartingdate,
        websiteUrls,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(request);
  };

  return (
    <>
      <div className=" flex flex-col ">
        <div className="mt-8">
          <Title_name></Title_name>
        </div>
        <div className="w-[95%] mx-auto mt-8 flex flex-row justify-around bg-[#D9D9D9] rounded-lg  ">
          {/* left side div  */}
          <div className="flex flex-col justify-between   mb-6">
            <div className="mt-6">
              <label className="ml-4 text-lg font-bold " htmlFor="">
                Project Name
              </label>
              <br />
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                name="projectName"
                className="bg-white h-[3rem]  w-[22rem]  mt-2 rounded-md border-black ml-4"
              ></input>
            </div>

            <div className="mt-6">
              <label className="ml-4 text-lg font-bold " htmlFor="">
                Project Strating Date
              </label>
              <br />
              <input
                value={projectStartingdate}
                onChange={(e) => setPojectStartingDate(e.target.value)}
                name="projectStartingdate"
                className="bg-white w-[22rem]  h-[3rem] mt-2 rounded-md border-black ml-4"
              ></input>
            </div>

            <div className="mt-6">
              <label className="ml-4 text-lg font-bold " htmlFor="">
                Project Ending date
              </label>
              <br />
              <input
                value={projectEndingdate}
                onChange={(e) => setProjectEndingDate(e.target.value)}
                name="projectEndingdate"
                className="bg-white w-[22rem]  h-[3rem] mt-2 rounded-md border-black ml-4"
              ></input>
            </div>

            <div className="mt-6">
              <label className="ml-4 text-lg font-bold " htmlFor="">
                Project Description
              </label>
              <br />
              <input
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                name="projectDescription"
                className="bg-white w-[22rem]  h-[3rem]  mt-2 rounded-md border-black ml-4"
              ></input>
            </div>
          </div>

          {/* right side div */}

          <div className="flex flex-col justify-between  mb-6">
            <div className="mt-6">
              <label className="ml-4 text-lg font-bold " htmlFor="">
                Manager To Assign
              </label>
              <br />
              <select
                value={ManagerName}
                onChange={(e) => setManegerName(e.target.value)}
                name="ManagerName"
               
              >
                {mangerId.map((item) => (
                  <option key={item.id}>{console.log(item.employeeName)}</option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <label className="ml-4 text-lg font-bold " htmlFor="">
                Project Requirements
              </label>
              <br />
              <input
                value={projectRequirement}
                onChange={(e) => setProjectRequirement(e.target.value)}
                name="projectRequirement"
                className="bg-white  w-[22rem]  h-[3rem]  mt-2 rounded-md border-black ml-4"
              ></input>
            </div>

            <div className="mt-6">
              <label className="ml-4 text-lg font-bold " htmlFor="">
                Project Priority
              </label>
              <br />
              <input
                value={projectPrioroty}
                onChange={(e) => setProjectPriority(e.target.value)}
                name="projectPrioroty"
                className="bg-white w-[22rem]  h-[3rem]  mt-2 rounded-md border-black ml-4"
              ></input>
            </div>

            <div className="mt-6">
              <label className="ml-4 text-lg font-bold " htmlFor="">
                Website URLs
              </label>
              <br />
              <input
                value={websiteUrls}
                onChange={(e) => setWebsiteUrls(e.target.value)}
                name="websiteUrls"
                className="bg-white w-[22rem]   h-[3rem] mt-2 rounded-md border-black ml-4"
              ></input>
            </div>
          </div>
        </div>

        <div onClick={sendProjectData} className="mt-10">
          <Btn></Btn>
        </div>
      </div>
    </>
  );
}

export default Admin_NewProject;
