import React, { useEffect, useState } from "react";
import Search_button from "../common_component/Search_button";
import Title_name from "../common_component/Title_name";
import Title_bar from "../common_component/Title_bar";
// import Data_bar from "../common_component/Data_bar";
import axios from "axios";

const Admin_Employees = () => {
  const [empdata, setEmpdata] = useState([]);

  useEffect(() => {
    const empInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/employee/all",
          { withCredentials: true }
        );

        setEmpdata(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors here
      }
    };

    empInfo();
  }, []);

  // console.log(empdata)

  return (
    <div>
      <div>
        <div className="flex flex-row justify-between text-white text-lg pt-[0.125rem] h-[2.5rem] rounded-lg mt-8  mx-auto w-[95%]">
          <Title_name />
          <Search_button />
        </div>

        <Title_bar />
        <div>
          <ul className="flex-col  w-[95%] mx-auto  h-auto">
            {
              // console.log(empdata)
              empdata.map((item) => (
                <li key={item.id} className="text-white bg-slate-500 mb-5 mt-4 p-2 flex justify-evenly rounded-lg">
                  <span>{item.employeeName} </span>
                  <span>{item.designation}</span>
                  {/* {console.log(item.employeeName)} */}
                </li>
              
              ))
            }
          </ul>

          {/* <Data_bar empdata= {empdata}/> */}
        </div>
      </div>
    </div>
  );
};

export default Admin_Employees;
