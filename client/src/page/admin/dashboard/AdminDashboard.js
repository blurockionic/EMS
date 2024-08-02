import React from "react";


import MyEvents from "../../../component/utilities-components/MyEvents";

import Card from "../../../component/utilities-components/Card";

const AdminDashboard = () => {

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4 p-4">
        <div className="mt-4">
          <Card/>
        </div>

        <div className="flex justify-center lg:justify-start mt-4 lg:mt-0">
          <MyEvents />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
