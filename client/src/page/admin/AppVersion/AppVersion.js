import React from "react";
import Accordion from "./Accordion";

const AppVersion = () => {
  const accordionItems = [
    {
      title: "v1.0.08",
      content: (
        <div>
          <h1 className="text-xl p-2 font-serif font-bold">What's New</h1>
          <table>
            <thead className="bg-slate-300 min-w-full ">
              <tr className="">
                <th className=" px-4 border-r-2 border-white">Version</th>
                <th className=" px-4 border-r-2 border-white">Release Date</th>
                <th className=" px-4 border-r-2 border-white ">Overview</th>
                <th className=" px-4 border-r-2 border-white ">Features</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className=" px-4 border-r-2 border-white  text-center">
                  V1.0.08
                </td>
                <td className=" px-4 border-r-2 border-white  text-center">
                  February 20, 2024
                </td>
                <td className=" px-4 border-r-2 border-white  ">
                  In version 1.0.08, we are excited to introduce several
                  enhancements and improvements to the project. This release
                  focuses on refining the user interface, addressing reported
                  issues, and introducing new features to enhance the overall
                  user experience.
                </td>
                <td className=" px-4 border-r-2 border-white">
                  <ol className="mt-4 mb-4">
                    <li >
                      <span className="font-serif text-lg font-bold">
                        Redesigned Frontend  :
                      </span>
                      <div className="w-full h-[0.1rem] bg-black "></div>
                    </li>
                    <li className="mt-4">
                      <span className="font-mono font-bold text-lg ">
                        User Interface Overhaul:
                      </span>{" "}
                      The frontend has undergone a significant redesign,
                      featuring a modern and intuitive user interface.
                    </li>
                    <li>
                      <span className="font-mono font-bold text-lg ">
                        Improved Navigation:
                      </span>{" "}
                      span Streamlined navigation for a more user-friendly
                      experience. New layouts and visual elements have been
                      implemented to enhance usability.
                    </li>

                    <li className="mt-4">
                      <span className="font-serif text-lg font-semibold ">
                        Feature Enhancements :
                      </span>
                      <div className="w-full h-[0.1rem] bg-black "></div>
                      <ol className="mt-4">
                        <li>
                          <span className="font-mono font-bold text-lg ">
                            {" "}
                            Dashboard Widgets:{" "}
                          </span>{" "}
                          New widgets have been added to the dashboard,
                          providing at-a-glance insights into key metrics. Users
                          can now customize and rearrange widgets to suit their
                          preferences.
                        </li>
                        <li>
                          <span className="font-mono font-bold text-lg ">
                            {" "}
                            Advanced Search:{" "}
                          </span>{" "}
                          The search functionality has been enhanced with
                          advanced filtering options for more precise results.
                        </li>
                      </ol>
                    </li>
                  </ol>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "V1.0.07",
      content: (
        <div className="p-8">
          <h1 className="text-2xl font-serif">Release Notes :- v1.0.07</h1>
          <div className="font-mono text-xl mt-6 mb-6">February 09,2024</div>
          <span className="font-mono text-xl ">Features:</span>
          <div className="bg-black w-full h-[0.1rem]"></div>

          <ul
            className=" font-serif mt-4 mb-8 p-4"
            style={{ listStyleType: "disc", color: "black" }}
          >
            <li>
              <span className="font-semibold"> Advanced Search:</span> The
              search functionality has been enhanced with advanced filtering
              options for more precise results.
            </li>
            <li>
              <span className="font-semibold">Improved Navigation:</span>{" "}
              Streamlined navigation for a more user-friendly experience. New
              layouts and visual elements have been implemented to enhance
              usability.
            </li>
          </ul>

          <span className="font-mono text-xl  ">Fixes:</span>
          <div className="bg-black w-full h-[0.1rem]"></div>

          <ul
            className=" font-serif mt-4 p-4"
            style={{ listStyleType: "disc", color: "black" }}
          >
            <li className="font-semibold">Data synchronization</li>
            <li className="font-semibold">User authentication</li>
            <li className="font-semibold">Performance optimization</li>

            <li>
              <span className="font-semibold">Compatibility:</span> Ensure that
              your system meets the updated system requirements for optimal
              performance.
            </li>
            <li>
              <span className="font-semibold">User Guidance:</span> Span A new
              user guide has been provided to assist users in adapting to the
              changes and utilizing the new features effectively.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "V1.0.06",
      content: (
        <div>
          <h1>Release Notes - Project v1.0.06</h1>
          <h2>Overview</h2>
          <p>
            In version 1.0.06, we are excited to introduce several enhancements
            and improvements to the project. This release focuses on refining
            the user interface, addressing reported issues, and introducing new
            features to enhance the overall user experience.
          </p>
          <h2>New Features</h2>
          <ol>
            <li>
              Redesigned Frontend
              <ol>
                <li>
                  User Interface Overhaul: The frontend has undergone a
                  significant redesign, featuring a modern and intuitive user
                  interface.
                </li>
                <li>
                  Improved Navigation: Streamlined navigation for a more
                  user-friendly experience. New layouts and visual elements have
                  been implemented to enhance usability.
                </li>
              </ol>
            </li>
            <li>
              Feature Enhancements
              <ol>
                <li>
                  Dashboard Widgets: New widgets have been added to the
                  dashboard, providing at-a-glance insights into key metrics.
                  Users can now customize and rearrange widgets to suit their
                  preferences.
                </li>
                <li>
                  Advanced Search: The search functionality has been enhanced
                  with advanced filtering options for more precise results.
                </li>
              </ol>
            </li>
            <li>
              Bug Fixes
              <ol>
                <li>Data synchronization</li>
                <li>User authentication</li>
                <li>Performance optimization</li>
              </ol>
            </li>
            <li>
              Important Notes
              <ol>
                <li>
                  Compatibility: Ensure that your system meets the updated
                  system requirements for optimal performance.
                </li>
                <li>
                  User Guidance: A new user guide has been provided to assist
                  users in adapting to the changes and utilizing the new
                  features effectively.
                </li>
              </ol>
            </li>
          </ol>
        </div>
      ),
    },
    {
      title: "V1.0.05",
      content: (
        <div>
          <h1>Release Notes - Project v1.0.05</h1>
          <h2>Overview</h2>
          <p>
            In version 1.0.05, we are excited to introduce several enhancements
            and improvements to the project. This release focuses on refining
            the user interface, addressing reported issues, and introducing new
            features to enhance the overall user experience.
          </p>
          <h2>New Features</h2>
          <ol>
            <li>
              Redesigned Frontend
              <ol>
                <li>
                  User Interface Overhaul: The frontend has undergone a
                  significant redesign, featuring a modern and intuitive user
                  interface.
                </li>
                <li>
                  Improved Navigation: Streamlined navigation for a more
                  user-friendly experience. New layouts and visual elements have
                  been implemented to enhance usability.
                </li>
              </ol>
            </li>
            <li>
              Feature Enhancements
              <ol>
                <li>
                  Dashboard Widgets: New widgets have been added to the
                  dashboard, providing at-a-glance insights into key metrics.
                  Users can now customize and rearrange widgets to suit their
                  preferences.
                </li>
                <li>
                  Advanced Search: The search functionality has been enhanced
                  with advanced filtering options for more precise results.
                </li>
              </ol>
            </li>
            <li>
              Bug Fixes
              <ol>
                <li>Data synchronization</li>
                <li>User authentication</li>
                <li>Performance optimization</li>
              </ol>
            </li>
            <li>
              Important Notes
              <ol>
                <li>
                  Compatibility: Ensure that your system meets the updated
                  system requirements for optimal performance.
                </li>
                <li>
                  User Guidance: A new user guide has been provided to assist
                  users in adapting to the changes and utilizing the new
                  features effectively.
                </li>
              </ol>
            </li>
          </ol>
        </div>
      ),
    },
  ];
  return (
    <div>
      {" "}
      <div className="">
        <h1 className="font-serif font-extrabold text-2xl p-2 ">
          {" "}
          Release Information
        </h1>
        <Accordion items={accordionItems} />
      </div>
    </div>
  );
};

export default AppVersion;
