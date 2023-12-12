import React from "react";
import Search_button from "../common_component/Search_button";
import Title_name from "../common_component/Title_name";
import Title_bar from "../common_component/Title_bar";
import Data_bar from "../common_component/Data_bar";

const Admin_Employees = () => {
  return (
    <div>
      <div>
        <div className="flex flex-row justify-between text-white text-lg pt-[0.125rem] h-[2.5rem] rounded-lg mt-8  mx-auto w-[95%]">
          <Title_name />
          <Search_button />
        </div>

        <Title_bar />
        <div>
          <Data_bar />
        </div>
      </div>
    </div>
  );
};

export default Admin_Employees;
