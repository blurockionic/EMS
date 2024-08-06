import React, { useEffect, useState } from "react";
import {FaTrash, FaCheck} from "react-icons/fa";
import { createToDoList, fetchAllToDos } from "../Redux/slices/toDoSlice";
import {useSelector, useDispatch} from 'react-redux';

const ToDo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState([]);
    const dispatch = useDispatch();
    const allToDos = useSelector((state)=>state.toDo.allToDos);
    console.log("an am inside todo component",allToDos);

    useEffect(()=>{
      dispatch(fetchAllToDos());
    },[dispatch])
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      if (!title) return;
      const addTodo = {
        title,
        description,
        completed: false
      };

      dispatch(createToDoList(addTodo));
      console.log("after the dispatch has been called")
      console.log(addTodo)
      setTitle('');
      setDescription('');
    };

    
  
    const deleteTodo = (index) => {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
    };
  
    const toggleComplete = (index) => {
      const newTodos = todos.map((todo, i) => {
        if (i === index) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      setTodos(newTodos);
    };
    return (
        <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-white mb-4">My Todos</h1>
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
        {todos.map((todo, index) => (
          <div key={index} className={`flex justify-between items-center p-4 border rounded-md ${todo.completed ? 'line-through' : ''}`}>
            <div>
              <h3 className="text-xl">{todo.title}</h3>
              <p className="text-gray-400">{todo.description}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => toggleComplete(index)} className="text-green-500">
                <FaCheck />
              </button>
              <button onClick={() => deleteTodo(index)} className="text-red-500">
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
