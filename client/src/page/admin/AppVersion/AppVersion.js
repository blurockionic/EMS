import React from "react";
import Accordion from "./Accordion";

const AppVersion = () => {
  const accordionItems = [
    //  version 15
    {
      title: "V1.0.15",

      content: (
        <div className="p-8">
          <h1 className="text-2xl font-serif">Release Notes :- v1.0.15</h1>
          <div className="font-mono text-xl mt-6 mb-6">February 23,2024</div>
          <span className="font-mono text-xl ">Features:</span>
          <div className="bg-black w-full h-[0.1rem]"></div>

          <ul
            className=" font-serif mt-4 mb-8 p-4"
            style={{ listStyleType: "disc", color: "black" }}
          >
            <li>
              <span className="font-semibold">
                {" "}
                Add Team in Employee Dashboard :
              </span>
              Add the 'Team' tab to the employee dashboard, allowing employees
              to access relevant information about their team and teammates.
              This feature facilitates the review of updates, notifications, and
              details about ongoing projects. Employees can also check the
              status of their teammates, including who is on leave or absent.
            </li>

            {/* <li>
            <span className="font-semibold"> Enhanced Navigation:</span>
              Improve navigation within the "Info" tab by organizing information
            logically and providing easy access to key details.
          </li> */}
          </ul>

          <span className="font-mono text-xl  ">Fixes:</span>
          <div className="bg-black w-full h-[0.1rem]"></div>

          <ul
            className=" font-serif mt-4 p-4"
            style={{ listStyleType: "disc", color: "black" }}
          >
            {/* <li className="font-semibold">Data synchronization</li>
          <li className="font-semibold">User authentication</li> */}

            <li>
              <span className="font-semibold">Update button data</span>
              Fix the issue with preselected data when updating team
              information; this bug fixing is crucial. Additionally, resolve the
              problem of reloading the 'Our Team' data when an entry is added or
              removed.
            </li>
            <li>
              <span className="font-semibold">Deploy the code </span> 
            </li>
            <li>
              <span className="font-semibold">Cookie Error:</span> Fix the
              cookie error on current deployed software
            </li>
            <li>
              <span className="font-semibold">Team:</span> Fiexed team
              dscription input box.
            </li>
            <li>
              <span className="font-semibold">
                Handle Add training button bug:
              </span>
              Fix a bug in the 'Add Training' button. Currently, when the 'Add'
              button is clicked, there is no proof or confirmation to verify
              that a new training has been successfully added. Additionally,
              address the issue of empty fields persisting after creating a new
              training. Ensure that all fields are properly cleared after the
              training creation process.
            </li>
            {/* <li>
            <span className="font-semibold"></span>
          </li>

          <li>
            <span className="font-semibold">
              
            </span>{" "}
            
          </li> */}
          </ul>
        </div>
      ),
    },

    //  version 14
    {
      title: "V1.0.14",

      content: (
        <div className="p-8">
          <h1 className="text-2xl font-serif">Release Notes :- v1.0.14</h1>
          <div className="font-mono text-xl mt-6 mb-6">February 22,2024</div>
          <span className="font-mono text-xl ">Features:</span>
          <div className="bg-black w-full h-[0.1rem]"></div>

          <ul
            className=" font-serif mt-4 mb-8 p-4"
            style={{ listStyleType: "disc", color: "black" }}
          >
            <li>
              <span className="font-semibold"> Logout :</span>Implement a
              feature where, upon clicking the logout button, an additional
              modal will appear to confirm the logout process. This modal will
              provide an extra layer of confirmation.
            </li>
            <li>
              <span className="font-semibold">Team : </span>Previous team
              information automatic load on the input box when team update
              window is opened.
            </li>
            <li>
              <span className="font-semibold">Info Tab for All Users:</span>{" "}
              Grant access to the 'Info' tab button for all user types,
              including administrators, HR personnel, managers, and employees.
              Additionally, ensure that they can view the latest versions of all
              applications or software.
            </li>
            {/* <li>
              <span className="font-semibold"> Enhanced Navigation:</span>
                Improve navigation within the "Info" tab by organizing information
              logically and providing easy access to key details.
            </li> */}
          </ul>

          <span className="font-mono text-xl  ">Fixes:</span>
          <div className="bg-black w-full h-[0.1rem]"></div>

          <ul
            className=" font-serif mt-4 p-4"
            style={{ listStyleType: "disc", color: "black" }}
          >
            {/* <li className="font-semibold">Data synchronization</li>
            <li className="font-semibold">User authentication</li> */}

            <li>
              <span className="font-semibold">Employees UI:</span>
              Optimize the design of the Employees Dashboard, especially in
              personal data there are an error in ui an extra shadow in layout .
            </li>
            <li>
              <span className="font-semibold">Login UI: </span> Alteration on
              login page design
            </li>
            <li>
              <span className="font-semibold">Cookie Error:</span> Fix the
              cookie error on current deployed software
            </li>
            <li>
              <span className="font-semibold">Team:</span> Fiexed team
              dscription input box.
            </li>
            <li>
              <span className="font-semibold">
                Handle Add training button bug:
              </span>
              Fix a bug in the 'Add Training' button. Currently, when the 'Add'
              button is clicked, there is no proof or confirmation to verify
              that a new training has been successfully added. Additionally,
              address the issue of empty fields persisting after creating a new
              training. Ensure that all fields are properly cleared after the
              training creation process.
            </li>
            {/* <li>
              <span className="font-semibold"></span>
            </li>

            <li>
              <span className="font-semibold">
                
              </span>{" "}
              
            </li> */}
          </ul>
        </div>
      ),
    },
    //  version 13
    {
      title: "V1.0.13",
      content: (
        <div className="p-8">
          <h1 className="text-2xl font-serif">Release Notes :- v1.0.13</h1>
          <div className="font-mono text-xl mt-6 mb-6">February 21,2024</div>
          <span className="font-mono text-xl ">Features:</span>
          <div className="bg-black w-full h-[0.1rem]"></div>

          <ul
            className=" font-serif mt-4 mb-8 p-4"
            style={{ listStyleType: "disc", color: "black" }}
          >
            <li>
              <span className="font-semibold"> Training UI:</span> The Change
              the whole design of training module in the employee dashboard. it
              also give better experience to the user and easy to use
            </li>
            <li>
              <span className="font-semibold">User Interface Overhaul:</span>{" "}
              Implement a refreshed and modernized design for the "Info" tab to
              enhance the overall visual appeal and usability.
            </li>
            <li>
              <span>Enhanced Navigation:</span>
              Improve navigation within the "Info" tab by organizing information
              logically and providing easy access to key details.
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

            <li>
              <span className="font-semibold">Performance Optimization:</span>
              Optimize the performance of the Admin Dashboard, especially if
              there are any slowdowns or delays in loading data or rendering
              components.
            </li>
            <li>
              <span className="font-semibold">Error Handling:</span> Improve
              error handling mechanisms to provide informative error messages
              and guide administrators on how to resolve issues.
            </li>
            <li>
              <span className="font-semibold">Consistent Styling:</span> Ensure
              consistent styling and layout across different sections of the
              Admin Dashboard for a polished and professional appearance.
            </li>

            <li>
              <span className="font-semibold">
                ( Employee Dashboard)Security Fixes:
              </span>{" "}
              Address any security vulnerabilities to protect sensitive employee
              data and ensure the confidentiality of information.
            </li>
          </ul>
        </div>
      ),
    },

    //  version 9
    {
      title: "V1.0.09",
      content: (
        <div className="p-8">
          <h1 className="text-2xl font-serif">Release Notes :- v1.0.09</h1>
          <div className="font-mono text-xl mt-6 mb-6">February 15,2024</div>
          <span className="font-mono text-xl ">Features:</span>
          <div className="bg-black w-full h-[0.1rem]"></div>

          <ul
            className=" font-serif mt-4 mb-8 p-4"
            style={{ listStyleType: "disc", color: "black" }}
          >
            <li>
              <span className="font-semibold"> New User Interface:</span> The
              User Interface has been enhanced with advanced UI components.
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
    //  version 8
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
                    <li>
                      <span className="font-serif text-lg font-bold">
                        Redesigned Frontend :
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
