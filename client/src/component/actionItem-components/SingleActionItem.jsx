import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateActionItemDetails, fetchActionItems } from '../../Redux/slices/actionItemSlice';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { server } from "../../App";

const SingleActionItem = () => {
  const dispatch = useDispatch();
  const { actionItemId } = useParams();
  const navigate = useNavigate();

  // Select the action item data from Redux store
  const { data, loading, error } = useSelector((state) => state.actionItem);
  const { data: users } = useSelector((state) => state.user);

  const [isDataLoading, setIsDataLoading] = useState(false)

  // State to manage the form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    assignTo: [],
    assignDate: "",
    dueDate: "",
  });

  // Fetch action item data on mount and populate form
  useEffect(() => {
    if (actionItemId) {
      dispatch(fetchActionItems(actionItemId));
    }
  }, [dispatch, actionItemId]);

  useEffect(() => {
    if (data) {
      setIsDataLoading(false)
      setFormData({
        title: data.title || "",
        description: data.description || "",
        status: data.status || "",
        assignTo: data.assignTo || [],
        assignDate: data.assignDate || "",
        dueDate: data.dueDate || "",
      });
    }
  }, [data, isDataLoading]);

  const renderUserFullName = (userId) => {
    const user = users?.find((user) => user._id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "N/A";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedDetails = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      assignTo: formData.assignTo,
      assignDate: formData.assignDate,
      dueDate: formData.dueDate,
    };
    
    console.log("updated details", updatedDetails)
    try {
      // Dispatch update action and receive response
      const response = await dispatch(updateActionItemDetails({ id: actionItemId, ...updatedDetails }));
      
      if (response.payload && response.payload.message) {
        console.log("Update message:", response.payload.message); 
      }
      
      // Navigate after successful update
      navigate('/dashboard/actionItems');

    } catch (error) {
      console.error("Error updating action item details:", error);
    }
  };

  const handleDelete = async () => {
    const response = await axios.delete(`${server}/actionItem/${actionItemId}`, {
      withCredentials: true,
    });
    const { success, message } = response.data;
    if (success) {
      alert(message);
      setIsDataLoading(true)
      navigate('/dashboard/actionItems')
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div className="single-action-item p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">{data?.title || 'No title available'}</h2>
      <p><strong>Description:</strong> {data?.description || 'No description available'}</p>
      <p><strong>Project:</strong> {data?.project || 'No project available'}</p>
      <p><strong>Assigned By:</strong> {renderUserFullName(data?.assignBy)}</p>
      <p><strong>Assigned To:</strong> 
        {data?.assignTo?.map((assignToId) => (
          <span key={assignToId} className="block">
            {renderUserFullName(assignToId)}
          </span>
        ))}
      </p>
      <p><strong>Assign Date:</strong> {data?.assignDate ? new Date(data.assignDate).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Due Date:</strong> {data?.dueDate ? new Date(data.dueDate).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Status:</strong> {data?.status || 'No status available'}</p>

      <h3 className="text-xl font-semibold mt-6">Update Action Item</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium">Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Assign Date</label>
          <input 
            type="date" 
            name="assignDate" 
            value={formData.assignDate} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Due Date</label>
          <input 
            type="date" 
            name="dueDate" 
            value={formData.dueDate} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Status</label>
          <select 
            name="status" 
            value={formData.status} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Open">Open</option>
            <option value="Close">Closed</option>
            <option value="In Review">In Review</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Update Action Item
        </button>
      </form>
      <button 
        onClick={handleDelete} 
        className="w-full mt-4 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Delete Action Item
      </button>
    </div>
  );
};

export default SingleActionItem;
