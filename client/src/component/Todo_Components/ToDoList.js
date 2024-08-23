import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = ({ todos, onDelete }) => {
  return (
    <div className="mt-4">
      <div className="w-full">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100 dark:bg-gray-800 w-full flex justify-between">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.length > 0 ? (
              todos.map((todo, index) => (
                <ToDoItem
                  key={index}
                  todo={todo}
                  onDelete={() => onDelete(todo._id)}
                />
              ))
            ) : (
              <tr className="w-full">
                <td
                  colSpan="2"
                  className="px-4 py-4 text-center text-gray-600 dark:text-gray-400"
                >
                  No todos available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToDoList;
