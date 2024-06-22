import React from "react";

const EmployeeTable = ({ employeeData }) => {
  return (
    <>
      {employeeData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className=" border-b border-2 dark:border-[#2B3037] shadow-sm">
              <tr>
                <th className="border-2 dark:border-[#2B3037] px-4 py-2">S.No</th>
                <th className="border-2 dark:border-[#2B3037] px-4 py-2">Name</th>
                <th className="border-2 dark:border-[#2B3037] px-4 py-2">Designation</th>
                <th className="border-2 dark:border-[#2B3037] px-4 py-2">Designation Type</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee, index) => (
                <tr key={employee._id} className={`text-center ${index % 2 ? "" : "" }`}>
                  <td className="border-2 dark:border-[#2B3037] px-4 py-2">{index + 1}</td>
                  <td className="border-2 dark:border-[#2B3037] px-4 py-2 capitalize">{employee.employeeName}</td>
                  <td className="border-2 dark:border-[#2B3037] px-4 py-2 capitalize">{employee.designation}</td>
                  <td className="border-2 dark:border-[#2B3037] px-4 py-2 capitalize">
                    {employee.designationType}
                  </td>
                  {/* Add more cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-5 p-4">
          <h1 className="uppercase font-bold">Sorry! Data not available!</h1>
        </div>
      )}
    </>
  );
};

export default EmployeeTable;
