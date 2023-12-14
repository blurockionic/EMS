import React, { useState } from "react";
import Title_name from "../common_component/Title_name";
import Search_button from "../common_component/Search_button";
import Title_bar from "../common_component/Title_bar";
// import Data_bar from "../common_component/Data_bar";

// import ModelDialoge from "../common_component/ModelDialoge";
import ModelForm from "../common_component/ModelForm";

const Admin_Reports = () => {
  // it change the click button result and render on ui
  const [showModel, setShowModel] = useState(false);

  // send this function to the modelDialoge as props
  const closeModel = () => setShowModel(false);

  return (
    <div>
      {/* title and search btn  */}
      <div className="flex flex-row justify-between text-white text-lg pt-[0.125rem] h-[2.5rem] rounded-lg mt-8  mx-auto w-[95%]">
        <Title_name></Title_name>
        <Search_button />
      </div>
      <Title_bar />
      <div className="flex items-center">
        <div className="mx-auto">
          {showModel && <ModelForm closeModel={closeModel} />}
        </div>
      </div>
      <button onClick={() => setShowModel(true)}>
        {/* <Data_bar setShowModel /> */}
      </button>
    </div>
  );
};

export default Admin_Reports;
