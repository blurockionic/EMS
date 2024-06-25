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
