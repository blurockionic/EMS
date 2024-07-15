// src/components/UserList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setUsers } from '../slices/chatSlice';

const UserList = ({ userId }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.chat.users);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/v1/users');
      dispatch(setUsers(response.data));
    };

    fetchUsers();
  }, [dispatch]);

  return (
    <div className="user-list p-4">
      <h2 className="text-xl mb-4">Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="mb-2">
            <Link to={`/chat/${userId}/${user._id}`} className="text-blue-500">
              {user.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
