import React from "react";
import { VscChromeClose } from "react-icons/vsc";

const NewToDoForm = ({ title, setTitle, description, setDescription, onSubmit, onCancel }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
        <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-semibold mb-4">New Todo</h2>
        <button type="button" onClick={onCancel}
        className="text-2xl top-[-2]"
        >
          <VscChromeClose/>
        </button>
        
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200">
            Title
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200">
            Description
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
          >
            Add Todo
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewToDoForm;
