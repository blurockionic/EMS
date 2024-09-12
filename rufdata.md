   <div className="flex flex-col sm:flex-row justify-end mb-4">
              {task.status === "Open" && (
                <button
                  className="px-4 py-1.5 bg-slate-800 text-white rounded-lg focus:outline-none ml-2"
                  onClick={handleIssueClose}
                >
                  Close Task
                </button>
              )}
              {task.status === "Close" && (
                <button
                  className="px-4 py-1.5 bg-slate-800 text-white rounded-lg focus:outline-none ml-2"
                  onClick={handleTaskStatusChange}
                >
                  Open Task
                </button>
              )}
            </div>
            vdzvdxc