 <div>
            <label className="block    font-semibold ">
              Phases (comma-separated):
            </label>
            <input
              type="text"
              value={phases.join(", ")}
              onChange={handleArrayInput(setPhases)}
              className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
            />
          </div>

          <div>
            <label className="block    font-semibold ">
              Tools and Technologies (comma-separated):
            </label>
            <input
              type="text"
              value={toolsAndTechnologies.join(", ")}
              onChange={handleArrayInput(setToolsAndTechnologies)}
              className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
            />
          </div>

          <div>
            <label className="block    font-semibold ">
              Required Resources (comma-separated):
            </label>
            <input
              type="text"
              value={requiredResources.join(", ")}
              onChange={handleArrayInput(setRequiredResources)}
              className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
            />
          </div>



  {/* <div className="mt-4">
              <label className="block font-semibold ">Add payment terms</label>
              <input
                type="text"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold ">Add billing timing</label>
              <input
                type="text"
                value={billingFrequency}
                onChange={(e) => setBillingFrequency(e.target.value)}
                className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div> */}






    <div>
      <div>
        <h2>Milestones List</h2>
        {milestones.length === 0 ? (
          <p>No milestones found.</p>
        ) : (
          <ul>
            {milestones.map((milestone) => (
              <li key={milestone._id}>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
                <p>
                  Due Date: {new Date(milestone.dueDate).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className=" w-[80%] mx-auto mt-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row bg-slate-800 text-white font-bold py-1.5 px-4 rounded space-x-2">
            <span className="text-2xl">
              <LuMilestone />
            </span>
            <span className="">Milestones</span>
          </div>

          <div>
            <Link
              to={`../newMilestone/${projectId}`}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-4 rounded"
            >
              New milestone
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 dark:bg-slate-600">
            <h3 className="text-lg font-bold mb-2">{/* {title} */}</h3>
            <p className="text-gray-700 mb-2">{/* {description} */}</p>
            <p>
              <strong>Due Date:</strong>
              {/* {dueDate} */}
            </p>
            <p>
              <strong>Project:</strong>
              {/* {projectReference} */}
            </p>
          </div>
        </div>
      </div>
    </div>