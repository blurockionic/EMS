import React from "react";
import { FaTrash, FaCheck } from "react-icons/fa";

const ToDoItem = ({ todo, onDelete }) => {
  return (
    <tr className="border-b dark:border-gray-600 w-full flex justify-between hover:bg-slate-100 dark:hover:bg-slate-700">
      <td className="px-4 py-4">
        <div className="flex flex-col">
          <span
            className="font-bold text-xl hover:text-blue-700 dark:hover:text-blue-500 capitalize"
          >
            {todo.title}
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {todo.description}
          </p>
        </div>
      </td>
      <td className="px-4 py-4 flex justify-end space-x-2">
        <button onClick={onDelete} className="text-red-500">
          <FaTrash />
        </button>
        <button className="text-green-500">
          <FaCheck />
        </button>
      </td>
    </tr>
  );
};

export default ToDoItem;
