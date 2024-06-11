import React from "react";

const EmployeeDashboard = () => {
  return (
    <div>
      <div>
        <div className="p-2">
          <h2 className="text-lg font-bold mb-2"> Task Details</h2>
          <div className="container mx-auto  ">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-slate-400">
                <tr>
                  <th className="py-2 px-4 border-b">S.No</th>
                  <th className="py-2 px-4 border-b">Task Name</th>
                  <th className="py-2 px-4 border-b">Manager Name</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Request for Completion</th>
                  <th className="py-2 px-4 border-b">Feedback</th>
                </tr>
              </thead>
              <tbody>
    
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
