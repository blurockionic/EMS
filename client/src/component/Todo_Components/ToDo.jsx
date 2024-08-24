import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllToDos, createToDoList, deleteToDo } from "../../Redux/slices/toDoSlice";
import { toast, ToastContainer } from "react-toastify";
import Tabs from "./Tab";
import ToDoList from "./ToDoList";
import NewToDoForm from "./NewToDoForm";
import { IoMdAdd } from "react-icons/io";

const ToDo = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("All");
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const allToDos = useSelector((state) => state.toDo.allToDos);
  const status = useSelector((state) => state.toDo.status);

  useEffect(() => {
    dispatch(fetchAllToDos());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'deleted') {
      toast.success('Deleted successfully');
    }
  }, [status]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // const handleNewClick = () => {
  //   setActive(true);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    const addTodo = { title, description, completed: false };
    await dispatch(createToDoList(addTodo));
    setTitle('');
    setDescription('');
    dispatch(fetchAllToDos()); 
    toast.success('Added successfully');
  };

  const deleteTodo = (id) => {
    dispatch(deleteToDo(id));
    dispatch(fetchAllToDos()); 
  };

  const getFilteredTodos = () => {
    if (activeTab === "Completed") {
      return allToDos.filter(todo => todo.completed);
    }
    return allToDos;
  };

  return (
    <div className="w-[80%] mx-auto mt-4">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-black mb-4">All Todos</h1>
     
      
      <Tabs activeTab={activeTab} onTabClick={handleTabClick} setActive={setActive} />
      <ToDoList todos={getFilteredTodos()} onDelete={deleteTodo} />
      {active && (
        <NewToDoForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          onSubmit={handleSubmit}
          onCancel={() => setActive(false)}
        />
      )}

 
        {/* <div className="flex items-center" onClick={handleNewClick}>
          <div className="flex items-center font-semibold text-white bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white px-2 py-1 rounded-md shadow-inner cursor-pointer transition-colors">
            <IoMdAdd className="text-lg mr-1" />
            <span>New Todo</span>
          </div>
        </div> */}
      </div>
      
    
  );
};

export default ToDo;
