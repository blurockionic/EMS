import React from "react"; // Import React to use JSX and create a component
import Card from "../../../component/utilities-components/Card"; // Import the Card component from the specified path

const AdminDashboard = () => {
  // Define the AdminDashboard functional component
  return (
    <>
      {/* Fragment to group multiple elements without adding extra nodes to the DOM */}
      <div className="w-full flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4 p-4">
        {/* Container div with responsive layout and padding */}
        <div className="mt-4">
          {/* Wrapper div with margin-top */}
          <Card />
          {/* Render the Card component */}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard; // Export the AdminDashboard component for use in other parts of the application
