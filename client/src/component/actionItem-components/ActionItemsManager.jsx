import React from "react";

const ActionItemsManager = () => {
  return (
    <div className="w-[90%] mx-auto mt-2">
      <h1 className="text-4xl font-bold p-2">Action Items</h1>

      <nav className="flex flex-row justify-between">
        <div className="flex flex-row">
          <div className="flex w-full sm:w-auto h-full items-end space-x-3 overflow-x-auto sm:overflow-x-hidden">
            {tabsList}
          </div>
          <div className="relative flex items-center">
            <div
              className="cursor-pointer"
              onClick={() =>
                setUiState((prevState) => ({
                  ...prevState,
                  showMoreTabs: !prevState.showMoreTabs,
                }))
              }
            >
              <IoMdAdd className="text-xl mx-2" />
            </div>
            {uiState.showMoreTabs && (
              <div className="absolute top-full mt-2 w-full md:w-56 bg-white dark:bg-gray-700 border rounded-md shadow-lg z-10 p-1">
                <ul>
                  {["Table View", "Timeline"].map((tab) => (
                    <li
                      key={tab}
                      className="flex flex-row cursor-pointer mx-2 px-4 py-1 hover:bg-gray-200 hover:rounded-lg mt-2"
                      onClick={() => addTab(tab)}
                    >
                      {getTabIcon(tab)}
                      {tab}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between p-2 space-x-2">
          <div
            className={`flex items-center p-0.25 mr-1 rounded-md transition-colors cursor-pointer ${
              uiState.searchInputBox
                ? "bg-gray-200 dark:bg-slate-400"
                : "hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <span className="p-0.5">
              <BsThreeDots className="text-xl" />
            </span>
          </div>
          <div
            className={`flex items-center p-0.25 mr-1 rounded-md transition-colors cursor-pointer ${
              uiState.searchInputBox
                ? "hover:bg-gray-300 dark:hover:bg-gray-700"
                : "hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={handleSearchButton}
          >
            <span className="p-0.5">
              <IoSearchSharp className="text-xl" />
            </span>
          </div>
          {uiState.searchInputBox && (
            <input
              type="search"
              placeholder="Type to search......"
              className="bg-transparent p-1 outline-none"
            />
          )}
          <div className="flex items-center" onClick={handleNewClick}>
            <div className="flex items-center font-semibold text-white bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white px-2 py-1 rounded-md shadow-inner cursor-pointer transition-colors">
              <IoMdAdd className="text-lg mr-1" />
              <span>New</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-2">
        <div className="mb-4">
          <div className="text-2xl font-bold capitalize flex space-x-1">
            <FaRegSquareCheck className="mt-1" />
            <span>Meeting Notes</span>
          </div>
        </div>

        <div
          className={`flex flex-col space-y-4 mx-auto ${
            modelSize === "large" ? "w-[90%]" : "w-[90%]"
          }`}
        >
          <ul className="space-y-2">
            {notes.map((note, index) => (
              <li key={index} className="relative flex items-center p-1">
                <span className="text-3xl">
                  <BsDot />
                </span>
                <div className="flex-1 ml-2 relative">
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => handleNoteChange(index, e.target.value)}
                    onKeyUp={(e) => handleMention(index, e)}
                    className="w-full p-1 border rounded"
                    placeholder="Add a note with mentions..."
                  />
                  {showMentionList && currentNoteIndex === index && (
                    <ul
                      className="bg-white border rounded mt-2 shadow-lg absolute max-h-40 overflow-y-auto z-10"
                      style={{
                        top: `${mentionPosition.top}px`,
                        left: `${mentionPosition.left}px`,
                      }}
                    >
                      {filteredUsers.map((user) => (
                        <li
                          key={user._id}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                          onClick={() => handleUserSelect(user)}
                        >
                          {user.firstName} {user.lastName}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  className="absolute top-3 -right-3 text-red-500"
                  onClick={() => handleRemoveNote(index)}
                >
                  <IoMdTrash />
                </button>
              </li>
            ))}
          </ul>
          <div className="relative">
            <textarea
              ref={textareaRef}
              rows={2}
              value={newNoteContent}
              onKeyUp={(e) => handleMention(-1, e)} // Handle mentions in new note
              onChange={(e) => setNewNoteContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a note with mentions..."
              className="w-full h-12 p-2 border-0 outline-none"
            />
            {showMentionList && (
              <ul
                className="bg-white border rounded mt-2 shadow-lg absolute max-h-40 overflow-y-auto z-10"
                style={{
                  top: `${mentionPosition.top}px`,
                  left: `${mentionPosition.left}px`,
                }}
              >
                {filteredUsers.map((user) => (
                  <li
                    key={user._id}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                    onClick={() => handleUserSelect(user)}
                  >
                    {user.firstName} {user.lastName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="p-1" onClick={handleNoteSubmit}>
            <IoMdAdd /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionItemsManager;
