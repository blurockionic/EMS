import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../Redux/slices/allUserSlice";
import { TbBuildingEstate } from "react-icons/tb";
import { GoLocation } from "react-icons/go";
import Loader from "./Loader";

const EmployeeTable = ({ viewMode }) => {
  const dispatch = useDispatch();
  const { data: users, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === "loading") return <Loader />;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <>
      {status === "succeeded" &&
        (users.length > 0 ? (
          <>
            {viewMode === "gallery" && (
              <div className="grid grid-cols-3 flex-wrap gap-12 p-4 mx-auto">
                {users.map((user) => (
                  <div key={user?._id}>
                    <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg dark:bg-slate-950">
                      <div className="dark:bg-slate-950 p-6 mb-6">
                        <div className="flex items-center">
                          <img
                            className="w-20 h-20 rounded-full mr-6"
                            src={
                              user?.profilePicture ??
                              "https://via.placeholder.com/150"
                            }
                            alt="Profile"
                          />
                          <div>
                            <h2 className="text-xl font-bold">
                              <span className="capitalize">
                                {user?.firstName}
                              </span>
                              <span className="capitalize ml-1">
                                {user?.lastName}
                              </span>
                            </h2>
                            <p>{user?.position ?? ""}</p>
                          </div>
                        </div>
                        <div className="flex mt-2 p-3">
                          <p className="text-blue-500 text-base">
                            {user?.email}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex space-x-2">
                            <span>
                              <TbBuildingEstate className="text-2xl" />
                            </span>
                            <p>{user?.department}</p>
                          </div>
                          <div className="flex space-x-2">
                            <span>
                              <GoLocation className="text-xl" />
                            </span>
                            <p className="capitalize">{user?.currentAddress}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {viewMode === "table" && (
              <div className="overflow-x-auto w-full">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="pl-12 border dark:border-gray-600 px-4 py-2 text-left">
                        NAME
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2 text-left">
                        ROLE
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2 text-left">
                        DESIGNATION
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2 text-left">
                        MAIL
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2 text-left">
                        MOBILE
                      </th>
                      <th className="border dark:border-gray-600 px-4 py-2 text-left">
                        STATUS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className=" border-b dark:border-gray-600"
                      >
                        <td className="px-12 py-2">
                          <div className="flex items-center">
                            <img
                              className="w-12 h-12 rounded-full mr-4"
                              src={
                                user?.profilePicture ??
                                "https://via.placeholder.com/150"
                              }
                              alt="Profile"
                            />
                            <div>
                              <h2 className="font-semibold text-gray-900 dark:text-white">
                                <span className="capitalize">
                                  {user.firstName}
                                </span>
                                <span className="capitalize ml-1">
                                  {user.lastName}
                                </span>
                              </h2>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2 capitalize">{user.role}</td>
                        <td className="px-4 py-2 capitalize">
                          {user.position}
                        </td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">{user.phoneNumber}</td>
                        {/* <td className="px-4 py-2 flex items-center">
                          <span
                            className={`w-3 h-3 rounded-full ${
                              user.status === "Active"
                                ? "bg-green-500"
                                : user.status === "Away"
                                ? "bg-orange-500"
                                : "bg-red-500"
                            } mr-2`}
                          ></span>
                          {user.status}
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <div className="text-center mt-5 p-4">
            <h1 className="uppercase font-bold">Sorry! Data not available!</h1>
          </div>
        ))}
    </>
  );
};

export default EmployeeTable;
