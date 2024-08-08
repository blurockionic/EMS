import React, { useEffect, useState } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";
import { createToDoList, fetchAllToDos, deleteToDo } from "../Redux/slices/toDoSlice";
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from "react-toastify";

const ToDo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const allToDos = useSelector((state) => state.toDo.allToDos);
  const status = useSelector((state) => state.toDo.status);

  useEffect(() => {
    dispatch(fetchAllToDos());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'deleted') {
      toast.success(' deleted successfully');
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    const addTodo = {
      title,
      description,
      completed: false
    };

    await dispatch(createToDoList(addTodo));
    setTitle('');
    setDescription('');
    dispatch(fetchAllToDos()); 
    toast.success('Add successfully');
  };

  const deleteTodo = (id) => {
    dispatch(deleteToDo(id));
    dispatch(fetchAllToDos()); 
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer/>
      <h1 className="text-4xl font-bold text-center text-black mb-4">My Todos</h1>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center mb-4">
        <input
          type="text"
          placeholder="What's the title of your To Do?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-2 m-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="What's the description of your To Do?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 p-2 m-2 border rounded-md"
        />
        <button type="submit" className="p-2 m-2 bg-green-500 text-white rounded-md">
          Add
        </button>
      </form>
      <div className="space-y-4">
        {allToDos.map((todo) => (
          <div key={todo.id} className={`flex justify-between items-center p-4 border rounded-md ${todo.completed ? 'line-through' : ''}`}>
            <div>
              <h3 className="text-xl">{todo.title}</h3>
              <p className="text-gray-400">{todo.description}</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-green-500">
                <FaCheck /> 
              </button>
              <button onClick={() => deleteTodo(todo._id)} className="text-red-500">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDo;
